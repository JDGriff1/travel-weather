import { useTranslation } from "react-i18next";
import { RouteDetailsCard } from "../RouteDetailsCard/RouteDetailsCard";
import { WeatherDetailsCard } from "../WeatherDetailsCard/WeatherDetailsCard";
import "./RoutePlannerResults.css";

export const RoutePlannerResults = ({ results, loading, onSearchAgain }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return <div className="loading">{t('routePlanner.results.loading')}</div>;
    }

    if (!results || Object.keys(results).length === 0) {
        return <div className="no-results">{t('routePlanner.results.noResults')}</div>;
    }

    if (loading) {
        return <div className="loading">{t('routePlanner.results.loading')}</div>;
    }

    const detailedResults = results?.summary?.sampleStepsWeather?.length > 0;
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

    const detailedWeather = detailedResults
        ? results?.summary?.sampleStepsWeather.map((step, index) => (
            <WeatherDetailsCard
                key={step.location + index}
                title={step.address}
                weather={step.weather} />
        ))
        : [];

    const weather = [startWeather];
    if (detailedResults) {
        weather.push(...detailedWeather);
    }
    weather.push(endWeather);

    return (
        <div className="route-planner-results">
            <div className="route-details">
                <div>{summaryCard}</div>
                <div className="flex flex-row align-items-center gap-2">
                    {weather.map((w, index) => (
                        <div key={index} className="flex-grow-1">
                            {w}
                        </div>
                    ))}
                </div>
            </div>
            <div className="results-actions">
                <button className="search-again-button" onClick={onSearchAgain}>{t('routePlanner.results.searchAgainButton')}</button>
            </div>
        </div>
    );
}