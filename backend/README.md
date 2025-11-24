# Season Counter Backend

API backend para el contador de temporadas de videojuegos.

## Tecnologías
- Node.js
- Express
- MongoDB
- Mongoose

## Instalación

```bash
npm install
```

## Configuración

1. Asegúrate de tener MongoDB instalado y corriendo localmente
2. Copia `.env.example` a `.env` y ajusta las variables si es necesario

## Uso

### Iniciar el servidor de desarrollo
```bash
npm run dev
```

### Poblar la base de datos con datos iniciales
```bash
npm run seed
```

### Iniciar el servidor en producción
```bash
npm start
```

## Endpoints API

### GET /api/seasons
Obtiene todas las temporadas

### GET /api/seasons/:game
Obtiene la temporada de un juego específico

### POST /api/seasons
Crea o actualiza una temporada

**Body:**
```json
{
  "game": "Fortnite",
  "seasonName": "Chapter 7 Season 1",
  "seasonNumber": 7,
  "startDate": "2025-09-06",
  "endDate": "2025-11-29",
  "targetDate": "2025-11-29T00:30:00",
  "displayStartDate": "September 6, 2025",
  "displayEndDate": "Saturday, November 29, 2025 at 12:30 AM CST"
}
```

## Modelo de Datos

### Season
- `game`: String (único) - Nombre del juego
- `seasonName`: String - Nombre de la temporada
- `seasonNumber`: Number - Número de temporada
- `startDate`: Date - Fecha de inicio
- `endDate`: Date - Fecha de fin
- `targetDate`: Date - Fecha objetivo para el countdown
- `displayStartDate`: String - Fecha de inicio formateada
- `displayEndDate`: String - Fecha de fin formateada
