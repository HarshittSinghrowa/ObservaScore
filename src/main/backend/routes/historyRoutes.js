const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Get all scores (history)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, environment, sort = '-createdAt' } = req.query;
    const filter = {};
    if (environment) filter.environment = environment;

    const scores = await Score.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('projectName environment overallScore grade maturityLevel createdAt');

    const total = await Score.countDocuments(filter);

    res.json({
      success: true,
      data: scores,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Score.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$overallScore' },
          maxScore: { $max: '$overallScore' },
          minScore: { $min: '$overallScore' },
          totalAssessments: { $sum: 1 }
        }
      }
    ]);

    const gradeDistribution = await Score.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } }
    ]);

    const maturityDistribution = await Score.aggregate([
      { $group: { _id: '$maturityLevel', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        summary: stats[0] || { avgScore: 0, maxScore: 0, minScore: 0, totalAssessments: 0 },
        gradeDistribution,
        maturityDistribution
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
