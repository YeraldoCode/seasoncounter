# 🚀 Guía de Deployment en Render

## 📋 Pre-requisitos

1. ✅ Cuenta en MongoDB Atlas (gratis): https://www.mongodb.com/cloud/atlas/register
2. ✅ Cuenta en Render (gratis): https://render.com
3. ✅ Código en GitHub

---

## 🗄️ PASO 1: Configurar MongoDB Atlas

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
   - Username: `seasonuser`
   - Password: Genera una contraseña segura y **guárdala**
   - Privileges: **"Read and write to any database"**
4. Click **"Add User"**

### C. Configurar Network Access

1. En el menú izquierdo: **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Esto es necesario para que Render pueda conectarse
4. Click **"Confirm"**

### D. Obtener Connection String

1. En el menú izquierdo: **Deployment** → **Database**
2. Click **"Connect"** en tu cluster
3. Click **"Connect your application"**
4. Copia el connection string:
   ```
   mongodb+srv://seasonuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANTE**: Reemplaza `<password>` con la contraseña real del usuario
6. Agrega el nombre de la base de datos después de `.net/`:
   ```
   mongodb+srv://seasonuser:TU_PASSWORD@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
   ```

---

## 🚀 PASO 2: Deploy Backend en Render

### Opción A: Deploy Automático con Blueprint (Recomendado)

1. Ve a https://render.com y haz login
2. Click en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio de GitHub: `YeraldoCode/seasoncounter`
4. Render detectará automáticamente el archivo `render.yaml`
5. Click **"Apply"**

### Opción B: Deploy Manual

1. Ve a https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Conecta tu repositorio: `YeraldoCode/seasoncounter`
4. Configura:
   - **Name**: `seasoncounter-api`
   - **Region**: Oregon (US West)
   - **Branch**: `production`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### Configurar Variables de Entorno

En la sección **"Environment"**, agrega estas variables:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://seasonuser:TU_PASSWORD@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
JWT_SECRET=genera-una-clave-secreta-segura-aqui-cambiar-en-produccion-2025
FRONTEND_URL=https://seasoncounter.netlify.app
```

**IMPORTANTE**: 
- Reemplaza `MONGODB_URI` con tu connection string real de MongoDB Atlas
- Cambia `JWT_SECRET` por una cadena aleatoria y segura

### Deploy

1. Click **"Create Web Service"**
2. Render comenzará a construir y desplegar tu backend
3. Espera a que el deploy termine (5-10 minutos la primera vez)
4. Tu backend estará disponible en: `https://seasoncounter-api.onrender.com`

---

## ✅ PASO 3: Verificar el Backend

### Probar el Health Check

Abre en tu navegador:
```
https://seasoncounter-api.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "timestamp": "2025-12-10T...",
  "uptime": 123.45
}
```

### Probar la API de Events

```
https://seasoncounter-api.onrender.com/api/events
```

Si la base de datos está vacía, verás `[]`. Si ya tienes datos, verás la lista de eventos.

---

## 🔗 PASO 4: Actualizar Frontend

Actualiza el archivo `.env.production` del frontend con la URL de Render:

```bash
# frontend/.env.production
VITE_API_URL=https://seasoncounter-api.onrender.com
```

Después, haz commit y push:

```bash
git add frontend/.env.production
git commit -m "chore: Actualizar URL del backend a Render"
git push origin production
```

Netlify detectará el cambio y redesplegarán automáticamente el frontend.

---

## 📝 PASO 5: Poblar la Base de Datos (Opcional)

Si necesitas datos iniciales, puedes ejecutar los seeders localmente apuntando a MongoDB Atlas:

1. En tu máquina local, crea un archivo `backend/.env`:
   ```bash
   MONGODB_URI=mongodb+srv://seasonuser:TU_PASSWORD@cluster0.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
   JWT_SECRET=la-misma-que-usaste-en-render
   ```

2. Ejecuta el seeder:
   ```bash
   cd backend
   node seedEvents.js
   ```

3. Crea un usuario admin:
   ```bash
   node createAdmin.js
   ```

---

## 🎉 ¡Listo!

Tu aplicación completa debería estar funcionando:

- **Frontend**: https://seasoncounter.netlify.app
- **Backend**: https://seasoncounter-api.onrender.com
- **Database**: MongoDB Atlas

---

## 🔧 Troubleshooting

### El backend no se conecta a MongoDB

1. Verifica que el `MONGODB_URI` en Render tenga la contraseña correcta
2. Verifica que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0)
3. Verifica que el nombre de usuario y contraseña sean correctos

### Error de CORS

1. Verifica que `FRONTEND_URL` en Render sea: `https://seasoncounter.netlify.app`
2. Los cambios de CORS ya están en el código y se aplicarán automáticamente

### El backend se duerme (free tier)

Render free tier pone los servicios a dormir después de 15 minutos de inactividad. La primera petición después de dormirse puede tardar 30-50 segundos en responder.

**Solución**: 
- Usa un servicio de ping como https://uptimerobot.com (gratis) para mantener el servicio despierto
- O simplemente espera unos segundos en la primera carga

---

## 📚 Recursos

- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Node.js en Render](https://render.com/docs/deploy-node-express-app)

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo.
