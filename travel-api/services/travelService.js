const { GOOGLE_MAPS_API_DIRECTIONS_URL, DIRECTIONS_STATUS_NOT_FOUND, DIRECTIONS_STATUS_OK } = require("../constants/api");

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

module.exports = {
    findRoute
};