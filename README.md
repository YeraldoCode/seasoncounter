# 🎮 Season Counter

<div align="center">

![Season Counter](https://img.shields.io/badge/Season-Counter-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

**Aplicación Full-Stack para rastrear temporadas de videojuegos con contadores en tiempo real**

[Quick Start](#-quick-start) • [Características](#-características) • [Documentación](#-documentación) • [Tecnologías](#-tecnologías)

</div>

---

## 📸 Preview

```
╔════════════════════════════════════════════════╗
║              SEASON COUNTER                    ║
╠════════════════════════════════════════════════╣
║                                                ║
║            TEMPORADA 7                         ║
║                                                ║
║     [45] días  [12] horas  [30] min  [15] s   ║
║                                                ║
║     ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  65%                ║
║                                                ║
║     Game: Fortnite                            ║
║     Season: Chapter 7 Season 1                ║
║     Started: September 6, 2025                ║
║     Ends: November 29, 2025                   ║
║                                                ║
╚════════════════════════════════════════════════╝
```

---

## ✨ Características

- ⏱️ **Contador en Tiempo Real** - Actualización cada segundo
- 📊 **Barra de Progreso** - Visualiza el avance de la temporada
- 🎮 **Multi-Juego** - Soporta múltiples videojuegos
- 🔄 **API RESTful** - Backend completo con CRUD
- 📱 **Responsive Design** - Funciona en todos los dispositivos
- 🎨 **UI Moderna** - Interfaz limpia y atractiva
- 🔍 **Búsqueda Inteligente** - Case-insensitive search
- 📝 **Documentación Completa** - API y código documentados

---

## 🚀 Quick Start

### Requisitos Previos
- Node.js v14+
- MongoDB
- npm o yarn

### Instalación en 3 Pasos

```bash
# 1. Iniciar MongoDB
mongod

# 2. Configurar y arrancar Backend
cd backend
npm install
npm run seed
npm run dev

# 3. Configurar y arrancar Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

🌐 Abre tu navegador en **http://localhost:5173**

📖 [Guía Detallada de Instalación →](QUICK_START.md)

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                     React + Vite                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Counter  │  │ Progress │  │ Details  │  │  Menu    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         │ axios
┌────────────────────────▼────────────────────────────────────┐
│                        BACKEND                              │
│                   Express + Node.js                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Routes  │→ │Controller│→ │  Model   │→ │ MongoDB  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
seasoncounter/
│
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/         # 8 React components
│   │   ├── services/           # API service layer
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Node.js API
│   ├── controllers/            # Business logic
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Validation & error handling
│   ├── server.js              # Express server
│   ├── seed.js                # Database seeder
│   └── package.json
│
├── QUICK_START.md              # Guía rápida de inicio
├── ANALISIS_COMPLETO.md        # Análisis técnico detallado
└── README.md                   # Este archivo
```

---

## 🛠️ Tecnologías

### Frontend
- **React 19.2** - UI Library
- **Vite 7.2** - Build Tool
- **Axios** - HTTP Client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express 5.1** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose 9.0** - ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Variables

---

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

| Método | Endpoint              | Descripción                    |
|--------|-----------------------|--------------------------------|
| GET    | `/health`            | Health check del servidor      |
| GET    | `/seasons`           | Obtener todas las temporadas   |
| GET    | `/seasons/active/all`| Obtener temporadas activas     |
| GET    | `/seasons/:game`     | Obtener temporada por juego    |
| POST   | `/seasons`           | Crear o actualizar temporada   |
| PUT    | `/seasons/:game`     | Actualizar temporada específica|
| DELETE | `/seasons/:game`     | Eliminar temporada             |

📖 [Documentación Completa de la API →](backend/API_DOCUMENTATION.md)

---

## 💡 Ejemplos de Uso

### Obtener todas las temporadas
```bash
curl http://localhost:5000/api/seasons
```

### Obtener temporada de Fortnite
```bash
curl http://localhost:5000/api/seasons/Fortnite
```

### Agregar nueva temporada
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

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [QUICK_START.md](QUICK_START.md) | Guía de instalación rápida (5 minutos) |
| [ANALISIS_COMPLETO.md](ANALISIS_COMPLETO.md) | Análisis técnico profundo del proyecto |
| [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) | Documentación completa de la API REST |
| [Backend README](backend/README.md) | Documentación específica del backend |
| [Frontend README](frontend/README.md) | Documentación específica del frontend |

---

## 🎯 Características por Implementar

### Próximas Mejoras
- [ ] Panel de administración
- [ ] Autenticación de usuarios
- [ ] Notificaciones push
- [ ] Tema oscuro/claro
- [ ] Exportar datos (JSON/CSV)
- [ ] Gráficos históricos
- [ ] API de terceros (integración con APIs oficiales de juegos)

### Testing
- [ ] Tests unitarios (Jest)
- [ ] Tests de integración (Supertest)
- [ ] Tests E2E (Cypress)
- [ ] Coverage reports

### DevOps
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Deploy automático
- [ ] Monitoring y logging

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Código de Conducta
- Escribe código limpio y documentado
- Sigue las convenciones de estilo existentes
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario

---

## 🐛 Reportar Bugs

Si encuentras un bug:
1. Verifica que no haya sido reportado antes
2. Abre un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del sistema (OS, Node version, etc.)

---

## 📊 Estado del Proyecto

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

### Versión Actual: 1.0.0

✅ **Completado:**
- Backend API completo
- Frontend funcional
- Integración completa
- Documentación
- Scripts de seed

⚙️ **En Desarrollo:**
- Tests automatizados
- Panel de administración
- Docker setup

---

## 📝 Changelog

### [1.0.0] - 2025-12-05
#### Agregado
- Sistema completo de contadores de temporada
- API RESTful con 7 endpoints
- Frontend con 8 componentes React
- Middleware de validación y manejo de errores
- Documentación completa
- Script de seed para datos iniciales
- Soporte para múltiples juegos

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

---

## 👤 Autor

**YeraldoCode**

- GitHub: [@YeraldoCode](https://github.com/YeraldoCode)
- Proyecto: [seasoncounter](https://github.com/YeraldoCode/seasoncounter)

---

## 🙏 Agradecimientos

- Comunidad de React
- Comunidad de Node.js
- MongoDB University
- Todos los contribuidores

---

## 📞 Soporte

¿Necesitas ayuda?

- 📖 Lee la [documentación](ANALISIS_COMPLETO.md)
- 🐛 Reporta un [bug](https://github.com/YeraldoCode/seasoncounter/issues)
- 💬 Inicia una [discusión](https://github.com/YeraldoCode/seasoncounter/discussions)
- 📧 Contacta al autor

---

## ⭐ Star History

Si este proyecto te fue útil, considera darle una ⭐ en GitHub!

---

<div align="center">

**Hecho con ❤️ por YeraldoCode**

[⬆ Volver arriba](#-season-counter)

</div>

---

_Última actualización: Diciembre 5, 2025_
