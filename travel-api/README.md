# Travel API
This API provides endpoints for travel and weather information.

## Implementation Notes
- The API is built with Express.js.
- The health check endpoint is used to verify the API's operational status.

## Features
- [x] - Travel route searching
- [x] - Weather data retrieval based on travel plans
- [x] - Integration with Google Maps API for maps services
- [x] - Unit tests covering API with Jest
- [x] - Documentation for API endpoints using Swagger
- [x] - Weather fetching and combined with travel data

## Future Improvements 
- [ ] - Improve CORS handling for allowing cross-origin requests
- [ ] - Error handling and logging for better debugging
- [ ] - Add more detailed weather information
- [ ] - Implement rate limiting to prevent abuse of the API

## Health Check
- **GET** `/health`: Returns the health status of the API.
- **GET** `/health/detailed`: Returns detailed health information about the API.

## Travel Endpoints
## Weather Endpoints

# Installation
1. Clone the repository.
2. Navigate to the `travel-api` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on the `.env.template`:
   ```bash
   cp .env.template .env
   ```
5. Add your Google Maps API key to the `.env` file:
   ```plaintext
   GOOGLE_API_KEY=your_google_api_key_here
   ```
6. Start the server:
   ```bash
   npm start
   ```
7. Access the API at `http://localhost:3001` where the port is defined in the `.env` file.