# Travel App

This repository contains the client for a travel weather app built with React.js. The app allows users to search for weather information based on their travel plans.

## Features
- Search by origin and destination city
- View current weather conditions for chosen locations
- Localisation support for multiple languages (English by default)

## Improvements
- [ ] - Responsive design to work on various devices

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/travel-weather.git
   ```
2. Navigate to the project directory:
   ```bash
   cd travel-weather/travel-app
   ```
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
   REACT_APP_GOOGLE_API_KEY=your_google_maps_api_key_here
   ```
6. Start the development server:
   ```bash
   npm start
   ```