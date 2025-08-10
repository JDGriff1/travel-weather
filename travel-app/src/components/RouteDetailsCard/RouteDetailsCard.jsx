import { useTranslation } from "react-i18next";
import "./RouteDetailsCard.css";

export const RouteDetailsCard = ({ route }) => {
    const { t } = useTranslation();
    
    if (!route) {
        return <div className="route-details-card">{t('routeDetails.noDataAvailable')}</div>;
    }

    return (
        <div className="details-card">
            <h2 className="route-details-title">{t('routeDetails.title')}</h2>
            <div className="route-details-content">
                <div className="route-details-info">
                    <p><strong>{t('routeDetails.start')}:</strong> {route.start.address}</p>
                    <p><strong>{t('routeDetails.end')}:</strong> {route.end.address}</p>
                </div>
                <div className="route-details-info">
                    <p><strong>{t('routeDetails.distance')}:</strong> {route.distance}</p>
                    <p><strong>{t('routeDetails.duration')}:</strong> {route.duration}</p>
                </div>
            </div>
        </div>
    );
}