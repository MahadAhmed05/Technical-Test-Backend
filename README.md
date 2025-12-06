Weather Decision App - Backend
A Node.js backend service that fetches weather data from the Meteonomiqs API and determines if weather conditions are "good" or "bad" based on predefined criteria.
Features

Fetches real-time weather data using Meteonomiqs Forecast API
Implements decision logic based on weather conditions and temperature
RESTful API endpoint for weather decisions
Monthly temperature threshold logic

Prerequisites

Node.js (v14 or higher)
npm or yarn

Installation

Clone the repository:

bashgit clone <your-backend-repo-url>
cd weather-decision-backend

Install dependencies:

bashnpm install

Create a .env file in the root directory:

bashcp .env.example .env
```

4. Add your Meteonomiqs API key to `.env`:
```
METEONOMIQS_API_KEY=your_api_key_here
PORT=4000
Running the Application
Development mode:
bashnpm run dev
Production mode:
bashnpm start
```

The server will start on `http://localhost:5000`

## API Endpoint

### Get Weather Decision
```
GET /api/weather-decision?lat={latitude}&lon={longitude}
Parameters:

lat (required): Latitude coordinate
lon (required): Longitude coordinate

Example Request:
bashcurl "http://localhost:5000/api/weather-decision?lat=48.1663&lon=11.5683"
Example Response:
json{
  "weatherCondition": "Sunny",
  "temperature": 17.5,
  "monthThreshold": 12,
  "decision": "good"
}
```

## Decision Logic

The app evaluates weather conditions based on:
- Weather condition (Sunny, Cloudy, Rainy, etc.)
- Current temperature
- Monthly temperature thresholds
- Specific rules for different weather patterns

**Basic Rules:**
- Sunny/Clear: Good if temperature ≥ monthly threshold
- Cloudy: Good if temperature ≥ 15°C
- Rain: Generally bad
- Snow: Good in winter if temperature ≤ threshold
- Fog/Storm: Always bad

## Project Structure
```
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── utils/          # Helper functions
│   └── routes/         # API routes
├── .env.example        # Environment variables template
├── package.json
└── README.md
Environment Variables

METEONOMIQS_API_KEY: Your Meteonomiqs API key
PORT: Server port (default: 4000)

Technologies Used

Node.js
Express.js
Axios (for API calls)
dotenv (for environment variables)
