import { useTranslation } from "react-i18next";
import "./LocationInput.css";

export const LocationInput = ({ label, value, onChange }) => {
    const { t } = useTranslation();
    
    const getPlaceholder = () => {
        if (label === t('routePlanner.search.originLabel')) {
            return t('routePlanner.search.originPlaceholder');
        } else if (label === t('routePlanner.search.destinationLabel')) {
            return t('routePlanner.search.destinationPlaceholder');
        }
        return `Enter ${label.toLowerCase()}`;
    };

    return (
        <div className="location-input">
            <label>{label}</label>
            <input
                className="location-input-field"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={getPlaceholder()}
            />
        </div>
    );
}