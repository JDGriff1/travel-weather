const express = require('express');
const { getForecastData } = require('../services/weatherService');
const router = express.Router();

router.get('/forecast', async (req, res) => {
    const { longitude, latitude } = req.query;
    if (!longitude || !latitude) {
        return res.status(400).json({ error: 'Longitude and latitude are required' });
    }

    try {
        const weatherResult = await getForecastData({ lat: latitude, lng: longitude });
        if (!weatherResult) {
            return res.status(404).json({ error: 'Weather data not found' });
        }

        return res.status(200).json({
            message: 'Weather data retrieved successfully',
            forecast: weatherResult
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
