import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./RoutePlannerSearch.css";
import { LocationInput } from "../LocationInput/LocationInput";

export const RoutePlannerSearch = ({ onPlanRoute, origin, destination, handleOriginChange, handleDestinationChange }) => {
    const { t } = useTranslation();
    
    return (
        <div className="route-planner details-card grid">
            <div className="app-header col-12">
                <h1>{t('app.title')}</h1>
            </div>
            <div className="col-12 flex justify-content-between align-items-center flex-column route-planner-controls">
                <div className="flex flex-column md:flex-row">
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