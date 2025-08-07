const express = require('express');
const router = express.Router();

router.get('/locations', (req, res) => {
  res.json({
    message: 'Get all travel locations',
    locations: [
      { id: 1, name: 'Paris', country: 'France' },
      { id: 2, name: 'Tokyo', country: 'Japan' },
      { id: 3, name: 'New York', country: 'USA' }
    ]
  });
});

module.exports = router;
