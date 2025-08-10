export async function getTravelDataAsync(origin, destination) {
    const apiBaseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiBaseUrl}/travel/route?start=${origin}&end=${destination}`);
    if (!response.ok) {
        console.error('Failed to fetch route details:', response.statusText);
        return null;
    }

    return response.json();
}