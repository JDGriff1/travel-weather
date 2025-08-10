const { summariseRoute } = require('../helpers/routeHelper');

describe('routeHelper', () => {
    describe('summariseRoute', () => {
        test('should return null when route has no routes array', () => {
            const route = { routes: [] };
            const result = summariseRoute(route);
            expect(result).toBeNull();
        });

        test('should return null when route is undefined', () => {
            const route = undefined;
            const result = summariseRoute(route);
            expect(result).toBeNull();
        });

        test('should return null when route is null', () => {
            const route = null;
            const result = summariseRoute(route);
            expect(result).toBeNull();
        });

        test('should return null when journey has no legs', () => {
            const route = {
                routes: [
                    {
                        legs: []
                    }
                ]
            };
            const result = summariseRoute(route);
            expect(result).toBeNull();
        });

        test('should return null when journey legs is undefined', () => {
            const route = {
                routes: [
                    {
                        // no legs property
                    }
                ]
            };
            const result = summariseRoute(route);
            expect(result).toBeNull();
        });

        test('should return route summary with valid route data', () => {
            const route = {
                routes: [
                    {
                        legs: [
                            {
                                start_address: "123 Main St, City, State",
                                end_address: "456 Oak Ave, City, State",
                                start_location: { lat: 40.7128, lng: -74.0060 },
                                end_location: { lat: 40.7589, lng: -73.9851 },
                                distance: { text: "5.2 km" },
                                duration: { text: "12 mins" }
                            }
                        ]
                    }
                ]
            };

            const result = summariseRoute(route);

            expect(result).toEqual({
                summary: {
                    start: {
                        address: "123 Main St, City, State",
                        location: { lat: 40.7128, lng: -74.0060 }
                    },
                    end: {
                        address: "456 Oak Ave, City, State",
                        location: { lat: 40.7589, lng: -73.9851 }
                    },
                    distance: "5.2 km",
                    duration: "12 mins"
                }
            });
        });

        test('should handle route with multiple legs (uses only first leg)', () => {
            const route = {
                routes: [
                    {
                        legs: [
                            {
                                start_address: "First Start",
                                end_address: "First End",
                                start_location: { lat: 1, lng: 1 },
                                end_location: { lat: 2, lng: 2 },
                                distance: { text: "1 km" },
                                duration: { text: "5 mins" }
                            },
                            {
                                start_address: "Second Start",
                                end_address: "Second End",
                                start_location: { lat: 3, lng: 3 },
                                end_location: { lat: 4, lng: 4 },
                                distance: { text: "2 km" },
                                duration: { text: "10 mins" }
                            }
                        ]
                    }
                ]
            };

            const result = summariseRoute(route);
            expect(result).not.toBeNull();
            // Should only use the first leg
            expect(result.summary.start.address).toBe("First Start");
            expect(result.summary.end.address).toBe("First End");
            expect(result.summary.distance).toBe("1 km");
            expect(result.summary.duration).toBe("5 mins");
        });

        test('should handle missing distance or duration properties gracefully', () => {
            const route = {
                routes: [
                    {
                        legs: [
                            {
                                start_address: "Start Address",
                                end_address: "End Address",
                                start_location: { lat: 1, lng: 1 },
                                end_location: { lat: 2, lng: 2 },
                                distance: { text: "1 km" },
                                duration: { text: "5 mins" }
                            }
                        ]
                    }
                ]
            };

            const result = summariseRoute(route);
            expect(result).not.toBeNull();
            expect(result.summary).toBeDefined();
        });

        test('should handle route with invalid leg structure', () => {
            const route = {
                routes: [
                    {
                        legs: [
                            {
                                start_address: "Start",
                                end_address: "End",
                                start_location: { lat: 1, lng: 1 },
                                end_location: { lat: 2, lng: 2 }
                                // Missing distance and duration properties
                            }
                        ]
                    }
                ]
            };

            const result = summariseRoute(route);
            expect(result).not.toBeNull();
            expect(result.summary.start.address).toBe("Start");
            expect(result.summary.end.address).toBe("End");
            expect(result.summary.distance).toBe("Unknown");
            expect(result.summary.duration).toBe("Unknown");
        });
    });
});
