function summariseForecast(forecast) {
    if (!forecast || !forecast.forecastHours?.length) {
        return null;
    }

    const forecastSummary = forecast.forecastHours.map(hour => ({
        time: {
            start: hour.interval.startTime,
            end: hour.interval.endTime
        },
        temperature: hour.temperature,
        condition: {
            description: hour.weatherCondition?.description,
            type: hour.weatherCondition?.type,
            iconSrc: hour.weatherCondition?.iconBaseUri + ".svg"
        }
    }));

    return forecastSummary;
}

module.exports = {
    summariseForecast
};