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
        distance: leg.distance?.text ?? 'Unknown',
        distanceMetres: leg.distance?.value ?? 0,
        duration: leg.duration?.text ?? 'Unknown',
        steps: leg.steps ?? []
    };
}

function getStepsSample(journeyLength, steps) {
    const sampledSteps = [];
    const stepDistanceMetres = journeyLength / 4;
    let currentDistance = 0;
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        currentDistance += step.distance.value;
        if (currentDistance >= stepDistanceMetres) {
            sampledSteps.push({
                location: step.start_location,
            });
            currentDistance = 0;
        }
    }

    return sampledSteps;
}

module.exports = {
    summariseRoute,
    getStepsSample
};