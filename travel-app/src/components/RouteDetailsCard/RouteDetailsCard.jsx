import { useTranslation } from "react-i18next";
import "./RouteDetailsCard.css";

export const RouteDetailsCard = ({ route }) => {
    const { t } = useTranslation();
    
    if (!route) {
        return <div className="route-details-card">{t('routeDetails.noDataAvailable')}</div>;
    }

    return (
        <div className="details-card grid">
            <div className="col-12">
                <h2 className="route-details-title">{t('routeDetails.title')}</h2>
            </div>
            <div className="grid col-12 align-items-center">
                <div className="col-12 md:col-6 flex flex-column align-items-start justify-content-center">
                    <span><strong>{t('routeDetails.start')}:</strong> {route.start.address}</span>
                    <span><strong>{t('routeDetails.end')}:</strong> {route.end.address}</span>
                </div>
                <div className="col-12 md:col-6 flex flex-column align-items-start justify-content-center">
                    <span><strong>{t('routeDetails.distance')}:</strong> {route.distance}</span>
                    <span><strong>{t('routeDetails.duration')}:</strong> {route.duration}</span>
                </div>
            </div>
        </div>
    );
}