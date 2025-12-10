# 🚀 Quick Deploy - Netlify

## Pasos Rápidos (5 minutos)

### 1️⃣ Actualiza la URL del Backend

Edita `.env.production`:
```env
VITE_API_URL=https://tu-backend.railway.app
```

### 2️⃣ Sube a GitHub

```bash
git add .
git commit -m "Ready for production"
git push origin production
```

### 3️⃣ Conecta con Netlify

1. Ve a https://app.netlify.com
2. "Add new site" → "Import from Git"
3. Selecciona tu repo
4. Configura:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. En "Environment variables" agrega:
   - `VITE_API_URL` = tu URL del backend
6. Click "Deploy"

### 4️⃣ ¡Listo! 🎉

Tu app estará live en: `https://random-name.netlify.app`

---

## Para AdSense (Futuro)

1. Consigue un dominio personalizado
2. Aplica a Google AdSense
3. Una vez aprobado, actualiza `index.html` con tu código
4. Usa el componente `<AdSenseAd />` donde quieras mostrar ads

---

## Troubleshooting

**No carga la app:**
- Revisa que `VITE_API_URL` esté correcta
- Verifica que el backend esté funcionando

**404 al refrescar:**
- Ya está configurado en `netlify.toml`, debería funcionar automáticamente

**Errores de CORS:**
- En tu backend, agrega el dominio de Netlify a los CORS permitidos

---

## Updates Automáticos

Cada `git push` hará deploy automático. No necesitas hacer nada más! 🚀
