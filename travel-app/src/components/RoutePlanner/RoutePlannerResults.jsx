import { RouteDetailsCard } from "../RouteDetailsCard/RouteDetailsCard";
import { WeatherDetailsCard } from "../WeatherDetailsCard/WeatherDetailsCard";
import "./RoutePlannerResults.css";

export const RoutePlannerResults = ({ results, loading, onSearchAgain }) => {
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!results || Object.keys(results).length === 0) {
        return <div className="no-results">No results found. Please try again.</div>;
    }

    const summaryCard = results.summary ? (
        <RouteDetailsCard
            route={results.summary}
        />
    ) : null;

    const startWeather = results.summary.start && results.summary.start.weather ? (
        <WeatherDetailsCard
            title={results.summary.start.address}
            weather={results.summary.start.weather} />
    ) : null;

    const endWeather = results.summary.end && results.summary.end.weather ? (
        <WeatherDetailsCard
            title={results.summary.end.address}
            weather={results.summary.end.weather} />
    ) : null;

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="route-planner-results">
            <h2>Route Results</h2>
            <div className="route-details">
                <div>{summaryCard}</div>
                <div className="route-weather-details">
                    <div>{startWeather}</div>
                    <div>{endWeather}</div>
                </div>
            </div>
            <button className="search-again-button" onClick={onSearchAgain}>Search Again</button>
        </div>
    );
}