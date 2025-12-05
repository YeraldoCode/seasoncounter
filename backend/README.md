# Season Counter Backend API

Backend API para gestionar temporadas de videojuegos con contadores de tiempo y progreso.

## 🚀 Características

- ✅ CRUD completo para temporadas de juegos
- ✅ Búsqueda por nombre de juego (case-insensitive)
- ✅ Filtrado de temporadas activas
- ✅ Validación de datos
- ✅ Manejo de errores global
- ✅ Conexión a MongoDB
- ✅ CORS configurado
- ✅ Script de seed para datos iniciales

## 📋 Requisitos Previos

- Node.js v14 o superior
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## ⚙️ Instalación

1. **Clonar el repositorio e instalar dependencias:**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno:**

Crear archivo `.env` basado en `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/seasoncounter
FRONTEND_URL=http://localhost:5173
```

3. **Iniciar MongoDB:**

Si usas MongoDB local:
```bash
# Linux/Mac
mongod

# Windows
net start MongoDB
```

4. **Poblar la base de datos (opcional):**
```bash
npm run seed
```

## 🎮 Uso

### Modo Desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints de la API

### Health Check
```
GET /api/health
```

### Temporadas
```
GET    /api/seasons           # Obtener todas las temporadas
GET    /api/seasons/active/all # Obtener temporadas activas
GET    /api/seasons/:game     # Obtener temporada por juego
POST   /api/seasons           # Crear o actualizar temporada
PUT    /api/seasons/:game     # Actualizar temporada específica
DELETE /api/seasons/:game     # Eliminar temporada
```

📖 Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para documentación completa.

## 🗂️ Estructura del Proyecto

```
backend/
├── controllers/
│   └── seasonController.js    # Lógica de negocio
├── middleware/
│   ├── errorHandler.js        # Manejo de errores global
│   └── validateSeason.js      # Validación de datos
├── models/
│   └── Season.js              # Schema de MongoDB
├── routes/
│   └── seasonRoutes.js        # Definición de rutas
├── .env.example               # Ejemplo de variables de entorno
├── server.js                  # Punto de entrada
├── seed.js                    # Script para poblar BD
└── package.json
```

## 📦 Dependencias Principales

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **cors** - Middleware CORS
- **dotenv** - Variables de entorno

## 🧪 Testing

### Con cURL
```bash
# Obtener todas las temporadas
curl http://localhost:5000/api/seasons

# Obtener temporada específica
curl http://localhost:5000/api/seasons/Fortnite

# Crear nueva temporada
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

## 🔧 Scripts Disponibles

```bash
npm start        # Iniciar servidor en producción
npm run dev      # Iniciar servidor en desarrollo (nodemon)
npm run seed     # Poblar base de datos con datos de prueba
```

## 🐛 Troubleshooting

### Error: MongoDB connection failed
- Verificar que MongoDB esté corriendo
- Verificar la URI de conexión en `.env`
- Verificar permisos de acceso a la base de datos

### Error: Port already in use
- Cambiar el puerto en `.env` o
- Liberar el puerto 5000:
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Issues
- Verificar que `FRONTEND_URL` en `.env` coincida con la URL del frontend
- Verificar que el frontend esté corriendo en el puerto correcto

## 📝 Modelo de Datos

```javascript
{
  game: "Fortnite",                    // Nombre del juego (único)
  seasonName: "Chapter 7 Season 1",    // Nombre de la temporada
  seasonNumber: 7,                     // Número de temporada
  startDate: Date,                     // Fecha de inicio (ISO)
  endDate: Date,                       // Fecha de fin (ISO)
  targetDate: Date,                    // Fecha objetivo para countdown
  displayStartDate: "September 6",     // Fecha formateada
  displayEndDate: "November 29, 2025", // Fecha formateada
  createdAt: Date,                     // Auto-generado
  updatedAt: Date                      // Auto-generado
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto.

## 👤 Autor

YeraldoCode

## 🔗 Enlaces

- [Frontend Repository](../frontend)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)

