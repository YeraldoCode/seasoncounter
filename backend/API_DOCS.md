# API Endpoints - Season Counter

## Base URL
```
http://localhost:5000/api
```

---

## 🔓 ENDPOINTS PÚBLICOS

### 1. Obtener Todas las Temporadas
**GET** `http://localhost:5000/api/seasons`

**Headers:** Ninguno requerido

**Response:**
```json
[
  {
    "_id": "...",
    "game": "Fortnite",
    "seasonName": "Chapter 7 Season 1",
    "seasonNumber": 7,
    "startDate": "2025-09-06T00:00:00.000Z",
    "endDate": "2025-11-29T00:00:00.000Z",
    "targetDate": "2025-11-29T00:30:00.000Z",
    "displayStartDate": "September 6, 2025",
    "displayEndDate": "Saturday, November 29, 2025 at 12:30 AM CST"
  }
]
```

---

### 2. Obtener Temporada por Juego
**GET** `http://localhost:5000/api/seasons/:game`

**Ejemplo:** `http://localhost:5000/api/seasons/Fortnite`

**Headers:** Ninguno requerido

---

## 🔐 AUTENTICACIÓN

### 3. Login (Obtener Token)
**POST** `http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@seasoncounter.com",
    "role": "superadmin"
  }
}
```

⚠️ **IMPORTANTE:** Guarda el token para usarlo en las siguientes peticiones

---

## 🔒 ENDPOINTS PROTEGIDOS (Requieren Token)

### 4. Crear/Actualizar Temporada
**POST** `http://localhost:5000/api/seasons`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUI
```

**Body (JSON) - Ejemplo Crear Nueva:**
```json
{
  "game": "Apex Legends",
  "seasonName": "Season 23",
  "seasonNumber": 23,
  "startDate": "2025-08-10",
  "endDate": "2025-11-10",
  "targetDate": "2025-11-10T13:00:00",
  "displayStartDate": "August 10, 2025",
  "displayEndDate": "November 10, 2025"
}
```

**Body (JSON) - Ejemplo Actualizar Existente:**
```json
{
  "game": "Fortnite",
  "seasonName": "Chapter 7 Season 2",
  "seasonNumber": 8,
  "startDate": "2025-12-01",
  "endDate": "2026-02-28",
  "targetDate": "2026-02-28T12:00:00",
  "displayStartDate": "December 1, 2025",
  "displayEndDate": "February 28, 2026"
}
```

---

### 5. Obtener Perfil del Admin
**GET** `http://localhost:5000/api/auth/profile`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

---

### 6. Crear Nuevo Admin (Solo SuperAdmin)
**POST** `http://localhost:5000/api/auth/register`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUI
```

**Body (JSON):**
```json
{
  "username": "nuevo_admin",
  "email": "nuevo@seasoncounter.com",
  "password": "password123",
  "role": "admin"
}
```

**Roles disponibles:** `"admin"` o `"superadmin"`

---

## 📝 NOTAS IMPORTANTES

1. **Token JWT**: Después del login, usa el token en el header `Authorization: Bearer TOKEN`
2. **Expiración**: Los tokens expiran en 7 días
3. **Actualización**: Si el `game` ya existe, se actualiza. Si no existe, se crea.
4. **Fechas**: 
   - `startDate` y `endDate`: Formato `YYYY-MM-DD`
   - `targetDate`: Formato `YYYY-MM-DDTHH:mm:ss`

---

## 🧪 Flujo de Prueba en Postman

1. **Login**: POST a `/api/auth/login` con username y password
2. **Copiar Token**: Del response, copia el valor de `token`
3. **Crear Variable**: En Postman, Environment > Add `auth_token` con el valor
4. **Usar Token**: En headers de requests protegidos: `Authorization: Bearer {{auth_token}}`
5. **Crear/Editar**: POST a `/api/seasons` con el JSON de temporada

---

## ✅ Credenciales por Defecto

```
Username: admin
Password: admin123
```

**⚠️ CAMBIAR EN PRODUCCIÓN**
