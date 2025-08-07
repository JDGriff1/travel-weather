const express = require('express');
const router = express.Router();

router.get('/forecast/:location', (req, res) => {
  const { location } = req.params;
  const { days = 5 } = req.query;
  
  res.json({
    message: `${days}-day weather forecast for ${location}`,
    location,
    forecast: Array.from({ length: parseInt(days) }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      temperature: `${20 + Math.floor(Math.random() * 10)}°C`,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
    }))
  });
});

module.exports = router;
