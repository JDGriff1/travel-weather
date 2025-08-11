const { GOOGLE_MAPS_API_DIRECTIONS_URL, DIRECTIONS_STATUS_NOT_FOUND, DIRECTIONS_STATUS_OK, GOOGLE_MAPS_API_NEARBY_SEARCH_URL } = require("../constants/api");
const { summariseRoute } = require("../helpers/routeHelper");

async function findRoute(start, end) {
    const response = await fetch(`${GOOGLE_MAPS_API_DIRECTIONS_URL}?origin=${start}&destination=${end}&key=${process.env.GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Error fetching route: ${data.error_message || 'Unknown error'}`);
    }

    const data = await response.json();
    if (data.status === DIRECTIONS_STATUS_NOT_FOUND || data.status !== DIRECTIONS_STATUS_OK) {
        return null;
    }

    return data;
}

async function getSummarisedRoute(start, end) {
    const route = await findRoute(start, end);
    return summariseRoute(route);
}

async function findNearby(location, radius = 5000) {
    const response = await fetch(`${GOOGLE_MAPS_API_NEARBY_SEARCH_URL}?location=${location.lat},${location.lng}&radius=${radius}&type=locality&key=${process.env.GOOGLE_API_KEY}`);

    if (!response.ok) {
        throw new Error(`Error fetching nearby locations: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status !== DIRECTIONS_STATUS_OK) {
        return [];
    }

    return data.results;
}

module.exports = {
    findRoute,
    findNearby,
    getSummarisedRoute
};