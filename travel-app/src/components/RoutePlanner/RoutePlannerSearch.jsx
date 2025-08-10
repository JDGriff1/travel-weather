import { useState } from "react";
import "./RoutePlannerSearch.css";
import { LocationInput } from "../LocationInput/LocationInput";

export const RoutePlannerSearch = ({ onPlanRoute, origin, destination, handleOriginChange, handleDestinationChange }) => {
    return (
        <div className="route-planner details-card">
            <div className="app-header">
                <h1>Travel Weather</h1>
            </div>
            <div className="route-planner-controls">
                <div className="location-inputs">
                    <LocationInput label="Origin" value={origin} onChange={handleOriginChange} />
                    <LocationInput label="Destination" value={destination} onChange={handleDestinationChange} />
                </div>
                <div className="route-planner-actions">
                    <button className="plan-route-button" onClick={onPlanRoute}>Plan Route</button>
                </div>
            </div>
        </div>
    );
}