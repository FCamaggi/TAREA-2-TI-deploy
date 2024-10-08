# Proyecto Tarea 2: Sistema de Seguimiento de Vuelos en Tiempo Real

## Descripción

Este proyecto implementa un sistema de seguimiento de vuelos en tiempo real utilizando WebSockets para la comunicación de eventos y un mapa interactivo para la visualización de aeropuertos, rutas y aviones. Además, incluye un sistema de chat en tiempo real.

## Tecnologías Utilizadas

- Frontend:
  - React con Vite
  - Leaflet para mapas interactivos
  - Material-UI para componentes de interfaz
  - WebSocket nativo para comunicación en tiempo real
- Contenedores: Docker
- Servidor Web: Nginx
- Orquestación de Contenedores: Docker Compose

## Estructura del Proyecto

```any
proyecto-tarea2/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── middlewares/
│   │   │   ├── acceptedMiddleware.js
│   │   │   ├── chatMiddleware.js
│   │   │   ├── flightMiddleware.js
│   │   │   ├── crashedMiddleware.js
│   │   │   ├── landingMiddleware.js
│   │   │   ├── takeOffMiddleware.js
│   │   │   ├── planeMiddleware.js
│   │   │   ├── utils.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── websocket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
└── README.md
```
