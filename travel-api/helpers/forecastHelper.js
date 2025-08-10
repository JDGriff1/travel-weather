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
        condition: hour.weatherCondition?.description
    }));

    return forecastSummary;
}

module.exports = {
    summariseForecast
};