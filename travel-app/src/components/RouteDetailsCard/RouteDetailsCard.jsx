import "./RouteDetailsCard.css";

export const RouteDetailsCard = ({ route }) => {
    if (!route) {
        return <div className="route-details-card">No route details available.</div>;
    }

    return (
        <div className="details-card">
            <h2 className="route-details-title">Route Summary</h2>
            <div className="route-details-content">
                <div className="route-details-info">
                    <p><strong>Start:</strong> {route.start.address}</p>
                    <p><strong>End:</strong> {route.end.address}</p>
                </div>
                <div className="route-details-info">
                    <p><strong>Distance:</strong> {route.distance}</p>
                    <p><strong>Duration:</strong> {route.duration}</p>
                </div>
            </div>
        </div>
    );
}