const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const { validateScoreInput } = require('../middleware/validation');

// Calculate and save observability score
router.post('/calculate', validateScoreInput, async (req, res) => {
  try {
    const { projectName, environment, pillars } = req.body;

    // Calculate weighted overall score
    let totalWeight = 0;
    let weightedSum = 0;
    const recommendations = [];

    const processedPillars = pillars.map(pillar => {
      // Calculate pillar score from criteria
      const totalPoints = pillar.criteria.reduce((sum, c) => sum + c.points, 0);
      const earnedPoints = pillar.criteria
        .filter(c => c.value)
        .reduce((sum, c) => sum + c.points, 0);
      const pillarScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

      weightedSum += pillarScore * pillar.weight;
      totalWeight += pillar.weight;

      // Generate recommendations for low-scoring pillars
      if (pillarScore < 60) {
        const missing = pillar.criteria.filter(c => !c.value).map(c => c.label);
        recommendations.push(`Improve ${pillar.name}: Consider adding ${missing.slice(0, 2).join(', ')}`);
      }

      return { ...pillar, score: pillarScore };
    });

    const overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

    if (overallScore >= 90) recommendations.push('Excellent! Maintain current observability practices.');
    else if (overallScore >= 75) recommendations.push('Good observability coverage. Focus on tracing improvements.');
    else if (overallScore < 40) recommendations.push('Critical: Implement structured logging and basic metrics immediately.');

    const scoreDoc = new Score({
      projectName,
      environment,
      pillars: processedPillars,
      overallScore,
      recommendations
    });

    await scoreDoc.save();
    res.status(201).json({ success: true, data: scoreDoc });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get a single score by ID
router.get('/:id', async (req, res) => {
  try {
    const score = await Score.findById(req.params.id);
    if (!score) return res.status(404).json({ success: false, error: 'Score not found' });
    res.json({ success: true, data: score });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a score
router.delete('/:id', async (req, res) => {
  try {
    const score = await Score.findByIdAndDelete(req.params.id);
    if (!score) return res.status(404).json({ success: false, error: 'Score not found' });
    res.json({ success: true, message: 'Score deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
