describe('weatherHelper', () => {
    const { summariseForecast } = require('../helpers/forecastHelper');

    describe('summariseForecast', () => {
        test("should return null when forecast is undefined", () => {
            const forecast = undefined;
            const result = summariseForecast(forecast);
            expect(result).toBeNull();
        });

        test("should return null when forecastHours is empty", () => {
            const forecast = { forecastHours: [] };
            const result = summariseForecast(forecast);
            expect(result).toBeNull();
        });

        test('should return a summary with correct structure', () => {
            const forecast = {
                forecastHours: [
                    { interval: { startTime: '2023-10-01T12:00:00Z', endTime: '2023-10-01T13:00:00Z' }, temperature: 20, condition: 'Sunny' },
                    { interval: { startTime: '2023-10-01T13:00:00Z', endTime: '2023-10-01T14:00:00Z' }, temperature: 22, condition: 'Cloudy' }
                ]
            };
            const result = summariseForecast(forecast);
            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('time');
            expect(result[0]).toHaveProperty('temperature');
            expect(result[0]).toHaveProperty('condition');
        });
    });
})