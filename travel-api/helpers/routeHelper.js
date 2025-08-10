function summariseRoute(route) {
    if (!route || !route.routes || route.routes.length === 0) {
        return null;
    }

    const journey = route.routes[0];
    if (!journey) {
        return null;
    }

    if (!journey.legs || journey.legs.length === 0) {
        return null;
    }

    const legSummary = getLegSummary(journey.legs[0]);
    if (!legSummary) {
        return null;
    }

    return {
        summary: legSummary
    }
}

function getLegSummary(leg) {
    return {
        start: { address: leg.start_address, location: leg.start_location },
        end: { address: leg.end_address, location: leg.end_location },
        distance: leg.distance?.text || 'Unknown',
        duration: leg.duration?.text || 'Unknown'
        // steps: leg.steps.map(step => ({
        //     instruction: step.html_instructions,
        //     distance: step.distance.text,
        //     duration: step.duration.text
        // }))
    };
}

module.exports = {
    summariseRoute
};