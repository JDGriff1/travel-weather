const { GOOGLE_MAPS_API_WEATHER_LOOKUP_URL } = require("../constants/api");
const { summariseForecast } = require("../helpers/forecastHelper");

async function getForecastData(location, hours = 5) {
    if (!location || !location.lat || !location.lng) {
        throw new Error('Invalid location provided');
    }

    const response = await fetch(`${GOOGLE_MAPS_API_WEATHER_LOOKUP_URL}?location.latitude=${location.lat}&location.longitude=${location.lng}&hours=${hours}&key=${process.env.GOOGLE_API_KEY}`);

    if (!response.ok) {
        throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.forecastHours) {
        throw new Error('Invalid weather data received');
    }

    return data;
}

async function getForecastForRoute(routeStart, routeEnd) {
    if (!routeStart || !routeEnd) {
        throw new Error('Both start and end locations are required for route forecast');
    }

    if (!routeStart.lat || !routeStart.lng || !routeEnd.lat || !routeEnd.lng) {
        throw new Error('Invalid start or end location provided');
    }

    const [startForecast, endForecast] = await Promise.all([
        getForecastData(routeStart),
        getForecastData(routeEnd)
    ]);

    return {
        start: summariseForecast(startForecast),
        end: summariseForecast(endForecast)
    };
}

module.exports = {
    getForecastData,
    getForecastForRoute
};