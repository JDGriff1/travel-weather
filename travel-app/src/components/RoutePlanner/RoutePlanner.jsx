import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RoutePlannerResults } from "./RoutePlannerResults";
import { RoutePlannerSearch } from "./RoutePlannerSearch";
import { getDetailedTravelDataAsync, getTravelDataAsync } from "../../services/TravelServices";

export const RoutePlanner = () => {
    const { t } = useTranslation();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);

    const handleOriginChange = (value) => {
        setOrigin(value);
    };

    const handleDestinationChange = (value) => {
        setDestination(value);
    };

    const clickPlanRoute = async (detailed = false) => {
        if (!origin || !destination) {
            alert(t('routePlanner.search.validationError'));
            return;
        }
        setLoading(true);
        await getRouteDetails(detailed);
    }

    const clickOnSearchAgain = () => {
        setOrigin("");
        setDestination("");
        setResults({});
        setLoading(false);
    }

    const getRouteDetails = async (detailed) => {
        let response;
        if (detailed) {
            response = await getDetailedTravelDataAsync(origin, destination);
        } else {
            response = await getTravelDataAsync(origin, destination);
        }

        setLoading(false);
        if (response && response.route) {
            setResults(response.route);
            return;
        }

        alert(t('routePlanner.search.fetchError'));
        setResults({});
    }

    if (!Object.keys(results).length && !loading) {
        return (
            <div className="route-planner">
                <RoutePlannerSearch 
                    onPlanRoute={() => clickPlanRoute(false)}
                    onPlanDetailedRoute={() => clickPlanRoute(true)}
                    origin={origin}
                    destination={destination}
                    handleOriginChange={handleOriginChange}
                    handleDestinationChange={handleDestinationChange} />
            </div>
        );
    }

    return (
        <RoutePlannerResults results={results} loading={loading} onSearchAgain={clickOnSearchAgain} />
    )
}