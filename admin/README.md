# Admin Panel - Season Counter

Panel de administración para gestionar las temporadas de juegos.

## Puerto de Desarrollo

El panel admin corre por defecto en **puerto 5174** (diferente del frontend principal).

## Credenciales por Defecto

Después de ejecutar `node createAdmin.js` en el backend:

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANTE**: Cambiar estas credenciales en producción.

## Uso

1. Login con las credenciales
2. Ver todas las temporadas activas
3. Editar cualquier temporada
4. Los cambios se reflejan automáticamente en el frontend

## Características

- Autenticación JWT
- Gestión CRUD de temporadas
- Interfaz responsive
- Logout seguro
