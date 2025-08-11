/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherCondition:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Description of the weather condition.
 *         languageCode:
 *           type: string
 *           description: Language code for the weather condition description.
 *     Temperature:
 *       type: object
 *       properties:
 *         unit:
 *           type: string
 *           enum: [CELSIUS, FAHRENHEIT]
 *           description: Unit of temperature measurement.
 *         degrees:
 *           type: number
 *           description: Temperature value in the specified unit.
 *     Weather:
 *       type: object
 *       properties:
 *         time:
 *           type: object
 *           properties:
 *             start:
 *               type: string
 *               format: date-time
 *               description: Start time of the weather forecast.
 *             end:
 *               type: string
 *               format: date-time
 *               description: End time of the weather forecast.
 *         temperature:
 *           $ref: '#/components/schemas/Temperature'
 *         condition:
 *           $ref: '#/components/schemas/WeatherCondition'
 *     Location:
 *       type: object
 *       properties:
 *         lat:
 *           type: number
 *           description: Latitude of the location.
 *         lng:
 *           type: number
 *           description: Longitude of the location.
 *     RouteSummary:
 *       type: object
 *       properties:
 *         start:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               description: Starting address of the route.
 *             location:
 *               $ref: '#/components/schemas/Location'
 *             weather:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 *         end:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               description: Ending address of the route.
 *             location:
 *               $ref: '#/components/schemas/Location'
 *             weather:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 *         distance:
 *           type: string
 *           description: Distance of the route.
 *         duration:
 *           type: string
 *           description: Duration of the route.
 *     RouteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message.
 *         route:
 *           $ref: '#/components/schemas/RouteSummary'
 * 
 */

const express = require('express');
const { findRoute, getSummarisedRoute, findNearby } = require('../services/travelService');
const { summariseRoute, getStepsSample } = require('../helpers/routeHelper');
const { getForecastForRoute, getForecastData } = require('../services/weatherService');
const { summariseForecast } = require('../helpers/forecastHelper');
const router = express.Router();

/**
 * @swagger
 * /route:
 *   get:
 *     tags:
 *       - Travel
 *     summary: Get route details including weather information.
 *     description: Returns the route details, including start and end locations, weather forecasts, distance, and duration.
 *     responses:
 *       200:
 *         description: Successfully retrieved route details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RouteResponse'
 */
router.get('/route', async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ error: 'Start and end locations are required' });
    }

    try {
        const routeSummary = await getSummarisedRoute(start, end);
        if (!routeSummary) {
            return res.status(500).json({ error: 'Failed to summarize route' });
        }

        const routeWeather = await getForecastForRoute(routeSummary.summary.start.location, routeSummary.summary.end.location);

        routeSummary.summary.start.weather = routeWeather.start;
        routeSummary.summary.end.weather = routeWeather.end;

        return res.status(200).json({
            message: 'Route found successfully',
            route: routeSummary
        });
    } catch (error) {
        console.error('Error finding route:', error);
        return res.status(500).json({ error: 'Failed to find route' });
    }
});

router.get('/route/detailed-weather', async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ error: 'Start and end locations are required' });
    }

    try {
        const routeResult = await findRoute(start, end);
        if (!routeResult) {
            return res.status(404).json({ error: 'Route not found' });
        }

        const routeSummary = summariseRoute(routeResult);
        const routeWeather = await getForecastForRoute(routeSummary.summary.start.location, routeSummary.summary.end.location);

        const sampleSteps = getStepsSample(routeSummary.summary.distanceMetres, routeSummary.summary.steps);
        if (!sampleSteps || sampleSteps.length === 0) {
            return res.status(500).json({ error: 'Failed to get route steps' });
        }

        const sampleStepsWeather = await Promise.all(sampleSteps.map(async (step) => {
            const nearbyLocations = await findNearby(step.location);
            const weather = await getForecastData(step.location);
            return {
                address: nearbyLocations[0].name,
                weather: summariseForecast(weather)
            };
        }));

        routeSummary.summary.start.weather = routeWeather.start;
        routeSummary.summary.end.weather = routeWeather.end;
        routeSummary.summary.sampleStepsWeather = sampleStepsWeather;

        return res.status(200).json({
            message: 'Detailed route found successfully',
            route: routeSummary
        });
    } catch (error) {
        console.error('Error finding detailed route:', error);
        return res.status(500).json({ error: 'Failed to find detailed route' });
    }
});

module.exports = router;
