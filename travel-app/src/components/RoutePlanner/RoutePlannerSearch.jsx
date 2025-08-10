import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./RoutePlannerSearch.css";
import { LocationInput } from "../LocationInput/LocationInput";

export const RoutePlannerSearch = ({ onPlanRoute, origin, destination, handleOriginChange, handleDestinationChange }) => {
    const { t } = useTranslation();
    
    return (
        <div className="route-planner details-card">
            <div className="app-header">
                <h1>{t('app.title')}</h1>
            </div>
            <div className="route-planner-controls">
                <div className="location-inputs">
                    <LocationInput label={t('routePlanner.search.originLabel')} value={origin} onChange={handleOriginChange} />
                    <LocationInput label={t('routePlanner.search.destinationLabel')} value={destination} onChange={handleDestinationChange} />
                </div>
                <div className="route-planner-actions">
                    <button className="plan-route-button" onClick={onPlanRoute}>{t('routePlanner.search.planRouteButton')}</button>
                </div>
            </div>
        </div>
    );
}