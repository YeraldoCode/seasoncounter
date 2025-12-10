# 🚀 Backend Deployment Guide - Netlify

## 📋 Pre-requisitos

1. ✅ Cuenta en MongoDB Atlas (gratis): https://www.mongodb.com/cloud/atlas/register
2. ✅ Cuenta en Netlify (ya la tienes)
3. ✅ Frontend ya desplegado en Netlify

---

## 🗄️ PASO 1: Configurar MongoDB Atlas (Base de Datos en la Nube)

### A. Crear Cluster Gratuito

1. Ve a https://cloud.mongodb.com
2. Click en **"Build a Database"**
3. Selecciona **"M0 Free"** (gratis para siempre)
4. Elige región más cercana (ej: AWS us-east-1)
5. Click **"Create Cluster"**

### B. Crear Usuario de Base de Datos

1. En el menú izquierdo: **Security** → **Database Access**
2. Click **"Add New Database User"**
3. Crea usuario:
   - Username: `seasoncounter_user`
   - Password: Genera una segura (guárdala)
   - Privileges: **"Read and write to any database"**
4. Click **"Add User"**

### C. Configurar Network Access

1. En el menú izquierdo: **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Esto es necesario para Netlify Functions
4. Click **"Confirm"**

### D. Obtener Connection String

1. En el menú izquierdo: **Deployment** → **Database**
2. Click **"Connect"** en tu cluster
3. Click **"Connect your application"**
4. Copia el connection string (se ve así):
   ```
   mongodb+srv://seasoncounter_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Reemplaza `<password>`** con la contraseña del usuario
6. **Agrega el nombre de la database** después de `.net/`:
   ```
   mongodb+srv://seasoncounter_user:tu-password@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
   ```

---

## 🚀 PASO 2: Deploy Backend en Netlify

### A. Crear Nuevo Sitio para el Backend

1. Ve a https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub**
4. Busca el repositorio `YeraldoCode/seasoncounter`
5. Configura:
   - **Branch to deploy:** `production`
   - **Base directory:** `backend`
   - **Build command:** `npm install`
   - **Publish directory:** `.` (punto)
   - **Functions directory:** `netlify/functions`

### B. Configurar Variables de Entorno

**IMPORTANTE:** Agrega estas variables ANTES de deployar:

1. En Netlify: **Site configuration** → **Environment variables**
2. Agrega las siguientes:

```env
MONGODB_URI
mongodb+srv://seasoncounter_user:TU-PASSWORD@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority

JWT_SECRET
tu-super-secreto-jwt-cambio-esto-por-algo-random

FRONTEND_URL
https://seasoncounter.netlify.app

NODE_ENV
production
```

⚠️ **IMPORTANTE**: Reemplaza los valores de ejemplo con tus valores reales.

### C. Deploy

1. Click **"Deploy site"**
2. Espera ~3-5 minutos
3. Netlify te dará una URL como: `https://seasoncounter-api.netlify.app`

### D. Verificar Deployment

Una vez completado, prueba el health check:
```
https://tu-backend.netlify.app/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "timestamp": "2025-12-10T...",
  "uptime": 0.123,
  "environment": "Netlify Functions"
}
```

---

## 🔗 PASO 3: Conectar Frontend con Backend

### A. Obtener URL del Backend

Tu backend estará en: `https://[nombre-random].netlify.app`

Copia esta URL completa.

### B. Actualizar Frontend

1. Ve al sitio del **Frontend** en Netlify
2. **Site configuration** → **Environment variables**
3. Edita `VITE_API_URL`:
   ```
   VITE_API_URL = https://tu-backend.netlify.app
   ```
4. **Trigger deploy** (Re-desplegar el frontend):
   - Ve a **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### C. Verificar Conexión

1. Abre tu frontend: `https://seasoncounter.netlify.app`
2. Abre DevTools (F12) → Console
3. Deberías ver los eventos cargándose
4. NO deberías ver errores de CORS

---

## 🌱 PASO 4: Seedear la Base de Datos

Para agregar los 12 eventos iniciales:

### Opción A: Usar MongoDB Compass (GUI)

1. Descarga MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Conecta con tu connection string
3. Navega a la database `seasoncounter`
4. Crea la colección `events`
5. Importa manualmente los datos del archivo `seedEvents.js`

### Opción B: Script Local (Más fácil)

1. En tu máquina local, actualiza `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://seasoncounter_user:TU-PASSWORD@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
   ```

2. Ejecuta el seed:
   ```bash
   cd /home/alexander/Desarrollo/seasoncounter/backend
   npm install
   node seedEvents.js
   ```

3. Deberías ver:
   ```
   Connected to MongoDB
   Cleared existing events
   Successfully seeded events: 12
   ```

---

## ✅ Verificación Final

### Prueba estos endpoints:

1. **Health Check:**
   ```
   GET https://tu-backend.netlify.app/api/health
   ```

2. **Listar Eventos:**
   ```
   GET https://tu-backend.netlify.app/api/events
   ```

3. **Frontend funcionando:**
   - Abre `https://seasoncounter.netlify.app`
   - Deberías ver todos los eventos
   - Los colores dinámicos deben funcionar
   - El countdown debe actualizar

---

## 🎯 Configuración Opcional

### Dominio Personalizado para Backend

Si quieres una URL más limpia para el backend:

1. En Netlify (sitio del backend): **Site configuration** → **Domain management**
2. Agrega un subdominio: `api.tudominio.com`
3. Actualiza `VITE_API_URL` en el frontend con el nuevo dominio

### Mejorar Performance

Netlify Functions tienen cold start (~500ms). Para mejorar:

1. Considera usar **Railway** o **Render** para el backend (siempre activo)
2. O mantén Netlify pero acepta el cold start inicial

---

## 🆘 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que el connection string sea correcto
- Verifica que la password no tenga caracteres especiales sin encodear
- Verifica que Network Access permita 0.0.0.0/0

### Error: CORS
- Verifica que `FRONTEND_URL` esté configurada correctamente
- Verifica que ambos sitios usen HTTPS

### Error: "Function timeout"
- Netlify Functions timeout después de 10 segundos
- Asegúrate de que MongoDB Atlas esté en la región más cercana

---

## 💰 Costos

- **MongoDB Atlas M0 (Free):** ✅ Gratis
  - 512MB storage
  - Shared CPU
  - Suficiente para ~5000 usuarios

- **Netlify Functions (Free):** ✅ Gratis
  - 125k requests/mes
  - 100 horas de runtime/mes
  - Más que suficiente para empezar

---

## 📊 Próximos Pasos

1. ✅ Backend deployed
2. ✅ Database en la nube
3. ✅ Frontend conectado al backend
4. → Configurar dominio personalizado (opcional)
5. → Aplicar a Google AdSense (cuando tengas tráfico)

---

¡Tu aplicación está completamente en la nube! 🎉
