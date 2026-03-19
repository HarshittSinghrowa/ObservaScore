const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbState[mongoose.connection.readyState],
    memoryUsage: process.memoryUsage(),
    version: '1.0.0',
    author: 'Harshitt Singhrowa',
    regNo: '23FE10CSE00838'
  });
});

module.exports = router;
