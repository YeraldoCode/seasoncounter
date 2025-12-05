# Season Counter API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check
Check if the API is running.

**GET** `/api/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "uptime": 1234.567
}
```

---

### 2. Get All Seasons
Retrieve all seasons from the database.

**GET** `/api/seasons`

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "game": "Fortnite",
    "seasonName": "Chapter 7 Season 1",
    "seasonNumber": 7,
    "startDate": "2025-09-06T00:00:00.000Z",
    "endDate": "2025-11-29T00:00:00.000Z",
    "targetDate": "2025-11-29T00:30:00.000Z",
    "displayStartDate": "September 6, 2025",
    "displayEndDate": "Saturday, November 29, 2025 at 12:30 AM CST",
    "createdAt": "2025-12-05T10:00:00.000Z",
    "updatedAt": "2025-12-05T10:00:00.000Z"
  }
]
```

---

### 3. Get Active Seasons
Retrieve only seasons that haven't ended yet.

**GET** `/api/seasons/active/all`

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "game": "Fortnite",
    "seasonName": "Chapter 7 Season 1",
    "seasonNumber": 7,
    "startDate": "2025-09-06T00:00:00.000Z",
    "endDate": "2025-12-29T00:00:00.000Z",
    "targetDate": "2025-12-29T00:30:00.000Z",
    "displayStartDate": "September 6, 2025",
    "displayEndDate": "Saturday, December 29, 2025 at 12:30 AM CST"
  }
]
```

---

### 4. Get Season by Game
Retrieve a specific season by game name (case-insensitive).

**GET** `/api/seasons/:game`

**Parameters:**
- `game` (string) - Name of the game (e.g., "Fortnite", "COD: Warzone")

**Example:**
```
GET /api/seasons/Fortnite
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "game": "Fortnite",
  "seasonName": "Chapter 7 Season 1",
  "seasonNumber": 7,
  "startDate": "2025-09-06T00:00:00.000Z",
  "endDate": "2025-11-29T00:00:00.000Z",
  "targetDate": "2025-11-29T00:30:00.000Z",
  "displayStartDate": "September 6, 2025",
  "displayEndDate": "Saturday, November 29, 2025 at 12:30 AM CST"
}
```

**Error Response (404):**
```json
{
  "message": "Season not found for game: InvalidGame"
}
```

---

### 5. Create or Update Season
Create a new season or update an existing one.

**POST** `/api/seasons`

**Request Body:**
```json
{
  "game": "Apex Legends",
  "seasonName": "Season 20: Breakout",
  "seasonNumber": 20,
  "startDate": "2025-12-01T00:00:00.000Z",
  "endDate": "2026-02-15T00:00:00.000Z",
  "targetDate": "2026-02-15T10:00:00.000Z",
  "displayStartDate": "December 1, 2025",
  "displayEndDate": "February 15, 2026"
}
```

**Required Fields:**
- `game` (string)
- `seasonName` (string)
- `seasonNumber` (number)
- `startDate` (ISO date string)
- `endDate` (ISO date string)

**Optional Fields:**
- `targetDate` (ISO date string) - defaults to `endDate` if not provided
- `displayStartDate` (string)
- `displayEndDate` (string)

**Response:**
```json
{
  "message": "Season updated successfully",
  "season": {
    "_id": "507f1f77bcf86cd799439012",
    "game": "Apex Legends",
    "seasonName": "Season 20: Breakout",
    "seasonNumber": 20,
    "startDate": "2025-12-01T00:00:00.000Z",
    "endDate": "2026-02-15T00:00:00.000Z",
    "targetDate": "2026-02-15T10:00:00.000Z",
    "displayStartDate": "December 1, 2025",
    "displayEndDate": "February 15, 2026",
    "createdAt": "2025-12-05T11:00:00.000Z",
    "updatedAt": "2025-12-05T11:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Missing required fields",
  "required": ["game", "seasonName", "seasonNumber", "startDate", "endDate"]
}
```

---

### 6. Update Specific Season
Update a specific season by game name.

**PUT** `/api/seasons/:game`

**Parameters:**
- `game` (string) - Name of the game to update

**Request Body:** Same as POST `/api/seasons`

---

### 7. Delete Season
Delete a season by game name.

**DELETE** `/api/seasons/:game`

**Parameters:**
- `game` (string) - Name of the game to delete

**Example:**
```
DELETE /api/seasons/Fortnite
```

**Response:**
```json
{
  "message": "Season deleted successfully",
  "deletedSeason": {
    "_id": "507f1f77bcf86cd799439011",
    "game": "Fortnite",
    "seasonName": "Chapter 7 Season 1",
    "seasonNumber": 7
  }
}
```

**Error Response (404):**
```json
{
  "message": "Season not found for game: InvalidGame"
}
```

---

## Error Codes

- **200** - Success
- **400** - Bad Request (validation error, missing fields)
- **404** - Not Found (season doesn't exist)
- **500** - Internal Server Error

---

## Data Model

### Season Schema
```javascript
{
  game: String (required, unique),
  seasonName: String (required),
  seasonNumber: Number (required),
  startDate: Date (required),
  endDate: Date (required),
  targetDate: Date (required),
  displayStartDate: String (required),
  displayEndDate: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/seasoncounter
FRONTEND_URL=http://localhost:5173
```

### Installation
```bash
cd backend
npm install
```

### Seed Database
```bash
npm run seed
```

### Run Development Server
```bash
npm run dev
```

### Run Production Server
```bash
npm start
```

---

## Testing with cURL

### Get all seasons:
```bash
curl http://localhost:5000/api/seasons
```

### Get season by game:
```bash
curl http://localhost:5000/api/seasons/Fortnite
```

### Create/Update season:
```bash
curl -X POST http://localhost:5000/api/seasons \
  -H "Content-Type: application/json" \
  -d '{
    "game": "Valorant",
    "seasonName": "Episode 8 Act 1",
    "seasonNumber": 8,
    "startDate": "2025-12-01",
    "endDate": "2026-02-15",
    "displayStartDate": "December 1, 2025",
    "displayEndDate": "February 15, 2026"
  }'
```

### Delete season:
```bash
curl -X DELETE http://localhost:5000/api/seasons/Valorant
```
