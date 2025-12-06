# Weather Decision API Backend

A Node.js/Express backend service that fetches weather data and makes decisions based on temperature thresholds and weather conditions.

## Features

- 🌤️ Fetches real-time weather data from external API
- 📊 Makes decisions based on monthly temperature thresholds
- 🌍 Supports German and English weather condition mapping
- 🔒 Secure API key handling via environment variables or headers
- ⚡ Built with Express.js and ES modules

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository and navigate to the Backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the Backend directory:

```env
WEATHER_API_KEY=your_api_key_here
PORT=4000
```

## Running the Server

Start the development server:

```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check

```
GET /
```

Returns: `Server working ✔`

### Get Weather Decision

```
GET /api/v1/weather/get-weather?lat={latitude}&lon={longitude}
```

**Query Parameters:**

- `lat` (required): Latitude coordinate
- `lon` (required): Longitude coordinate

**Headers (optional):**

- `x-api-key`: Weather API key (if not set in .env)

**Example Request:**

```bash
GET http://localhost:4000/api/v1/weather/get-weather?lat=48.1663&lon=11.5683
```

**Example Response:**

```json
{
  "temperature": 7,
  "rawCondition": "Stark bewölkt",
  "simplifiedCondition": "cloudy",
  "month": 12,
  "threshold": 16,
  "decision": "bad"
}
```

**Response Fields:**

- `temperature`: Current temperature in °C
- `rawCondition`: Original weather condition text from API
- `simplifiedCondition`: Mapped condition (sunny, cloudy, rainy, stormy, unknown)
- `month`: Current month (1-12)
- `threshold`: Temperature threshold for the current month
- `decision`: "good" or "bad" based on temperature and weather conditions

## Decision Logic

The API returns "good" if:

- Temperature is above or equal to the monthly threshold
- Weather condition is NOT rainy or stormy

Otherwise, it returns "bad".

## Project Structure

```
Backend/
├── config/          # Configuration files (database, etc.)
├── controllers/     # Request handlers
├── data/            # Data files (thresholds, etc.)
├── routes/          # API route definitions
├── utils/           # Utility functions
├── index.js         # Main server file
└── package.json     # Dependencies
```

## Environment Variables

| Variable          | Description                 | Required |
| ----------------- | --------------------------- | -------- |
| `WEATHER_API_KEY` | API key for weather service | Yes      |
| `PORT`            | Server port (default: 3000) | No       |

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management
- **node-fetch**: HTTP client for API requests

## Error Handling

The API includes comprehensive error handling:

- Missing or invalid coordinates (400)
- API key not set (500)
- External API errors (500)
- Request timeouts (15 seconds)

## Development

The server uses ES modules (`type: "module"` in package.json) and includes:

- Request logging with Morgan
- CORS enabled for cross-origin requests
- Graceful error handling
- Request timeout protection

## License

ISC
