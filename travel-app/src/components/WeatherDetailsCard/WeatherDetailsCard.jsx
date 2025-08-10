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
        <div className="details-card">
            <h2 className="weather-details-title">{title}</h2>
            {weather.map((entry, index) => (
                <div key={index} className="weather-row">
                    <p>
                        <strong>{new Date(entry.time.start).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}</strong>
                    </p>
                    <p>{entry.temperature.degrees} °C</p>
                    {getWeatherIcon(entry.condition.iconSrc, entry.condition.type)}
                    <p className="weather-description">{entry.condition.description.text}</p>

                </div>
            ))}
        </div>
    );
}