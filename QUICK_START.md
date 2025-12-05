# 🚀 Quick Start Guide - Season Counter

Guía rápida para levantar el proyecto en 5 minutos.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** v14+ ([Descargar](https://nodejs.org/))
- ✅ **MongoDB** ([Descargar](https://www.mongodb.com/try/download/community))
- ✅ **Git** ([Descargar](https://git-scm.com/))
- ✅ Un editor de código (VS Code recomendado)

### Verificar instalaciones:
```bash
node --version    # Debe mostrar v14 o superior
npm --version     # Debe mostrar 6 o superior
mongod --version  # Debe mostrar la versión de MongoDB
```

---

## ⚡ Instalación Rápida (5 pasos)

### 1️⃣ Iniciar MongoDB

**Linux/Mac:**
```bash
# Terminal 1 - Mantener abierta
mongod
```

**Windows:**
```bash
# Como Administrador
net start MongoDB
```

### 2️⃣ Configurar Backend

```bash
# Terminal 2 - Backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# (Opcional) Editar .env si necesitas cambiar algo
# nano .env  # o usar tu editor favorito

# Poblar base de datos con datos de ejemplo
npm run seed

# Iniciar servidor backend
npm run dev
```

**Salida esperada:**
```
Connected to MongoDB
Cleared existing seasons
Seed data inserted successfully
Database connection closed

Server is running on port 5000
Connected to MongoDB
```

### 3️⃣ Configurar Frontend

```bash
# Terminal 3 - Frontend (nueva terminal)
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Salida esperada:**
```
VITE v7.2.4  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4️⃣ Abrir en el Navegador

Navega a: **http://localhost:5173/**

### 5️⃣ ¡Listo! 🎉

Deberías ver la aplicación funcionando con:
- Contador regresivo en tiempo real
- Barra de progreso de la temporada
- Detalles de la temporada actual
- Menú para cambiar entre juegos

---

## 🧪 Verificar que Todo Funciona

### Test 1: API Health Check
```bash
curl http://localhost:5000/api/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "timestamp": "2025-12-05T...",
  "uptime": 123.45
}
```

### Test 2: Obtener Temporadas
```bash
curl http://localhost:5000/api/seasons
```

**Respuesta esperada:** Array con 3 juegos (Fortnite, COD: Warzone, PUBG)

### Test 3: Frontend
Abre el navegador y verifica:
- ✅ El contador está corriendo
- ✅ La barra de progreso se muestra
- ✅ Puedes cambiar de juego en el menú

---

## 📁 Estructura de Puertos

| Servicio  | Puerto | URL                          |
|-----------|--------|------------------------------|
| Frontend  | 5173   | http://localhost:5173        |
| Backend   | 5000   | http://localhost:5000        |
| MongoDB   | 27017  | mongodb://localhost:27017    |

---

## 🐛 Troubleshooting Rápido

### ❌ Error: "MongoDB connection failed"
```bash
# Verificar que MongoDB esté corriendo
# Linux/Mac:
ps aux | grep mongod

# Windows:
tasklist | findstr mongod

# Si no está corriendo, inícialo:
mongod  # Linux/Mac
net start MongoDB  # Windows
```

### ❌ Error: "Port 5000 already in use"
```bash
# Linux/Mac: Liberar puerto
lsof -ti:5000 | xargs kill -9

# Windows: Liberar puerto
netstat -ano | findstr :5000
# Luego: taskkill /PID <PID_NUMBER> /F
```

### ❌ Error: "Port 5173 already in use"
```bash
# Cambiar puerto de Vite (en frontend/)
# Editar vite.config.js:
export default defineConfig({
  server: {
    port: 3000  // o cualquier otro puerto libre
  }
})
```

### ❌ Error: "npm ERR! code ENOENT"
```bash
# Estás en el directorio equivocado
# Asegúrate de estar en /backend o /frontend
pwd  # Ver directorio actual
```

### ❌ Frontend muestra "Loading..." indefinidamente
1. Verificar que el backend esté corriendo (Terminal 2)
2. Verificar que la API responda:
   ```bash
   curl http://localhost:5000/api/seasons
   ```
3. Revisar la consola del navegador (F12) por errores CORS
4. Verificar que `.env` tenga `FRONTEND_URL=http://localhost:5173`

---

## 🎯 Comandos Útiles

### Backend:
```bash
npm start          # Producción (sin auto-reload)
npm run dev        # Desarrollo (con nodemon)
npm run seed       # Re-poblar base de datos
```

### Frontend:
```bash
npm run dev        # Desarrollo
npm run build      # Build para producción
npm run preview    # Preview del build
npm run lint       # Linting
```

### MongoDB:
```bash
# Conectar a MongoDB shell
mongosh

# Usar base de datos
use seasoncounter

# Ver todas las temporadas
db.seasons.find().pretty()

# Eliminar todas las temporadas
db.seasons.deleteMany({})

# Contar documentos
db.seasons.countDocuments()
```

---

## 📚 Próximos Pasos

Ahora que tienes el proyecto funcionando:

1. 📖 Lee la [Documentación Completa de la API](backend/API_DOCUMENTATION.md)
2. 🔍 Explora el [Análisis Detallado del Proyecto](ANALISIS_COMPLETO.md)
3. 🎨 Personaliza los estilos CSS en `frontend/src/components/`
4. 🎮 Agrega más juegos ejecutando:
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

---

## 🆘 ¿Necesitas Ayuda?

- 📖 [API Documentation](backend/API_DOCUMENTATION.md)
- 📊 [Análisis Completo](ANALISIS_COMPLETO.md)
- 🔧 [Backend README](backend/README.md)
- 💬 Issues: GitHub YeraldoCode/seasoncounter

---

## 🎉 ¡Éxito!

Si has llegado hasta aquí, tu **Season Counter** está funcionando correctamente.

**Happy Coding! 🚀**

---

_Última actualización: Diciembre 5, 2025_
