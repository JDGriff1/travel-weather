import { useTranslation } from "react-i18next";
import "./WeatherDetailsCard.css";

export const WeatherDetailsCard = ({ weather, title }) => {
    const { t } = useTranslation();
    
    if (!weather) {
        return <div className="details-card">{t('weatherDetails.noDataAvailable')}</div>;
    }

    const getWeatherIcon = (iconSrc, alt) => {
        if (!iconSrc) return null;
        return <img className="weather-icon" src={iconSrc} alt={alt} />;
    }

    return (
        <div className="details-card weather-card">
            <h2 className="weather-details-title">{title}</h2>
            {weather.map((entry, index) => (
                <div key={index} className="grid weather-row">
                    <div className="col-4">
                        <span>
                            <strong>{new Date(entry.time.start).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                                })}
                            </strong>
                        </span>
                    </div>
                    <div className="col-8 flex flex-column align-items-center">
                        <div className="flex flex-row align-items-center gap-2">
                            <span>{entry.temperature.degrees} °C</span>
                            {getWeatherIcon(entry.condition.iconSrc, entry.condition.type)}
                        </div>
                        <span className="weather-description">{entry.condition.description.text}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}