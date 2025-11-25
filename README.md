# Season Counter - Full Stack Application

Sistema completo de contador de temporadas de videojuegos con frontend, backend API y panel de administración.

## 📁 Estructura del Proyecto

```
contador/
├── frontend/          # Aplicación principal (React)
├── admin/            # Panel de administración (React)
└── backend/          # API REST (Node.js + MongoDB)
```

## 🚀 Inicio Rápido

### 1. Backend

```bash
cd backend
npm install
npm run seed          # Poblar base de datos
node createAdmin.js   # Crear admin por defecto
npm run dev          # Puerto 5000
```

**Credenciales por defecto:**
- Username: `admin`
- Password: `admin123`

### 2. Frontend Principal

```bash
cd frontend
npm install
npm run dev          # Puerto 5173
```

### 3. Panel de Administración

```bash
cd admin
npm install
npm run dev          # Puerto 5174
```

## 📡 Endpoints API

### Públicos
- `GET /api/seasons` - Obtener todas las temporadas
- `GET /api/seasons/:game` - Obtener temporada específica

### Autenticación
- `POST /api/auth/login` - Login de administrador

### Protegidos (requieren token)
- `POST /api/seasons` - Crear/actualizar temporada
- `GET /api/auth/profile` - Perfil del admin
- `POST /api/auth/register` - Crear nuevo admin

## 🎮 Características

### Frontend Principal
- ✅ Contador regresivo en tiempo real
- ✅ Barra de progreso dinámica
- ✅ Selección de juegos
- ✅ Toggle de anuncios
- ✅ SEO optimizado para Google AdSense
- ✅ Responsive design

### Panel de Administración
- ✅ Autenticación JWT
- ✅ Gestión de temporadas
- ✅ Interfaz separada del frontend
- ✅ Edición en tiempo real

### Backend
- ✅ API REST con Express
- ✅ Base de datos MongoDB
- ✅ Autenticación con JWT
- ✅ Rutas protegidas
- ✅ Validación de datos

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Rutas de administración protegidas
- Variables de entorno para secrets

## 📊 SEO y Monetización

El frontend incluye:
- Meta tags completos
- Open Graph para redes sociales
- Twitter Cards
- Structured Data (Schema.org)
- Preparado para Google AdSense
- Espacios para ads responsivos

## 🛠️ Tecnologías

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **Styling**: CSS moderno con variables

## 📝 Notas

- Cambiar `JWT_SECRET` en production
- Actualizar URLs en meta tags SEO
- Configurar Google AdSense ID
- Cambiar contraseña de admin por defecto
