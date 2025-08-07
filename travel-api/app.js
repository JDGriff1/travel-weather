require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const healthRoutes = require('./routes/health');
const travelRoutes = require('./routes/travel');
const weatherRoutes = require('./routes/weather');

app.use('/health', healthRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Travel API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      travel: '/api/travel',
      weather: '/api/weather'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Travel API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Travel endpoints: http://localhost:${PORT}/api/travel`);
  console.log(`Weather endpoints: http://localhost:${PORT}/api/weather`);
});

module.exports = app;
