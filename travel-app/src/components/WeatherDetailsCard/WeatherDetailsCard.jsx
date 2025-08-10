import "./WeatherDetailsCard.css";

export const WeatherDetailsCard = ({ weather, title }) => {
    if (!weather) {
        return <div className="details-card">No weather details available.</div>;
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