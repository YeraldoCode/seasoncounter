# 🚀 Deployment Guide - Netlify

## 📋 Pre-requisitos

1. Cuenta en Netlify (gratis): https://netlify.com
2. Repositorio en GitHub con tu código
3. Backend desplegado (Railway/Render) - **Importante: necesitas la URL del backend**

---

## 🔧 Paso 1: Preparar Variables de Entorno

Antes de deployar, actualiza el archivo `.env.production`:

```env
VITE_API_URL=https://tu-backend-desplegado.railway.app
```

⚠️ **IMPORTANTE**: Reemplaza `tu-backend-desplegado.railway.app` con la URL real de tu backend.

---

## 🌐 Paso 2: Deploy en Netlify

### Opción A: Deploy desde GitHub (Recomendado)

1. **Conecta tu repositorio:**
   - Ve a https://app.netlify.com
   - Click en "Add new site" → "Import an existing project"
   - Selecciona "GitHub" y autoriza
   - Busca y selecciona tu repositorio `seasoncounter`

2. **Configuración del Build:**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Variables de Entorno en Netlify:**
   - En el dashboard de Netlify: Site settings → Environment variables
   - Agrega:
     - Key: `VITE_API_URL`
     - Value: `https://tu-backend.railway.app` (sin /api al final)

4. **Deploy:**
   - Click en "Deploy site"
   - Espera 2-3 minutos
   - ¡Listo! Tu app estará en: `https://random-name-123456.netlify.app`

### Opción B: Deploy con Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Ir a la carpeta frontend
cd frontend

# Build de producción
npm run build

# Deploy
netlify deploy --prod
```

---

## 🎨 Paso 3: Configurar Dominio Personalizado (Opcional)

1. En Netlify dashboard: Site settings → Domain management
2. Click "Add custom domain"
3. Sigue las instrucciones para configurar DNS

**Beneficios:**
- Mejor para SEO
- Necesario para AdSense
- Más profesional

---

## 📊 Paso 4: Preparar para Google AdSense

### A. Verificar el sitio con Google

1. Ve a https://adsense.google.com
2. Registra tu sitio
3. Agrega el código de verificación al `<head>` de tu `index.html`

### B. Agregar componente de Ads

Ya está preparado en `src/components/AdSenseAd.jsx`:

```jsx
import AdSenseAd from './components/AdSenseAd';

// En tu componente
<AdSenseAd 
    adSlot="1234567890"
    adFormat="auto"
    fullWidthResponsive={true}
/>
```

### C. Políticas requeridas

Crea estas páginas (obligatorio para AdSense):

- `/privacy-policy` - Política de privacidad
- `/terms-of-service` - Términos de servicio
- `/contact` - Página de contacto

---

## 🔍 Verificación Post-Deploy

### ✅ Checklist:

- [ ] El frontend carga correctamente
- [ ] Los eventos se muestran (conexión con backend)
- [ ] El admin panel funciona
- [ ] El login funciona
- [ ] Los colores dinámicos funcionan
- [ ] La versión móvil se ve bien
- [ ] SSL activo (https://)

### 🐛 Troubleshooting:

**Problema: "Failed to fetch"**
- Verifica que `VITE_API_URL` esté correctamente configurada
- Verifica que el backend esté desplegado y funcionando
- Revisa CORS en el backend (debe permitir tu dominio de Netlify)

**Problema: "404 on refresh"**
- El archivo `netlify.toml` debe estar en la raíz de frontend
- Verifica que tenga la regla de redirect a index.html

**Problema: Variables de entorno no funcionan**
- Las variables DEBEN empezar con `VITE_`
- Reinicia el build en Netlify después de agregar variables

---

## 📈 Optimizaciones Post-Deploy

### 1. Performance
```bash
# Analizar bundle size
npm run build -- --analyze
```

### 2. SEO
- Agrega meta tags en `index.html`
- Configura Open Graph tags
- Agrega sitemap.xml

### 3. Analytics
- Google Analytics
- Netlify Analytics (built-in)

### 4. Monitoring
- Netlify tiene monitoring incluido
- Revisa "Analytics" en el dashboard

---

## 🔄 Actualizar la App

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Update: descripción"
git push origin production
```

Netlify detectará el push y hará auto-deploy. ¡Simple!

---

## 💰 AdSense Setup (Cuando esté listo)

1. **Requisitos mínimos:**
   - Dominio personalizado
   - Contenido original (✅ ya tienes)
   - Tráfico consistente (espera a tener usuarios)
   - Políticas de privacidad

2. **Agregar AdSense:**
   - Solicitar cuenta en Google AdSense
   - Esperar aprobación (puede tomar días/semanas)
   - Una vez aprobado, obtendrás tu `ca-pub-XXXXXXXXXXXXXXXX`
   - Actualiza el código en `index.html`

3. **Mejores ubicaciones para ads:**
   - Sidebar (ya existe el componente)
   - Entre eventos en la lista
   - Banner superior
   - Footer

---

## 📞 Soporte

Si encuentras problemas:
- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com
- Revisa los logs en Netlify Dashboard → Deploys → Deploy log

---

## 🎉 ¡Listo!

Tu app ahora está en producción y lista para:
- ✅ Recibir usuarios
- ✅ Monetizar con AdSense (cuando esté aprobado)
- ✅ Escalar sin problemas
- ✅ Updates automáticos con Git

**URL de ejemplo:**
- Frontend: `https://event-countdown.netlify.app`
- Backend: `https://event-countdown-api.railway.app`

¡Felicidades! 🚀
