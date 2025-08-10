import "./LocationInput.css";

export const LocationInput = ({ label, value, onChange }) => {
    return (
        <div className="location-input">
            <label>{label}</label>
            <input
                className="location-input-field"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </div>
    );
}