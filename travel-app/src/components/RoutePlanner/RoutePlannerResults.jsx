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
        return <div className="loading">{t('routePlanner.results.loading')}</div>;
    }

    return (
        <div className="route-planner-results">
            <h2>{t('routePlanner.results.title')}</h2>
            <div className="route-details">
                <div>{summaryCard}</div>
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex-grow-1">{startWeather}</div>
                    <div className="flex-grow-1">{endWeather}</div>
                </div>
            </div>
            <div className="results-actions">
                <button className="search-again-button" onClick={onSearchAgain}>{t('routePlanner.results.searchAgainButton')}</button>
            </div>
        </div>
    );
}