# Proyecto Tarea 2: Sistema de Seguimiento de Vuelos en Tiempo Real

## Descripción

Este proyecto implementa un sistema de seguimiento de vuelos en tiempo real utilizando WebSockets para la comunicación de eventos y un mapa interactivo para la visualización de aeropuertos, rutas y aviones. Además, incluye un sistema de chat en tiempo real.

## Tecnologías Utilizadas

- Frontend:
  - React con Vite
  - Leaflet para mapas interactivos
  - Material-UI para componentes de interfaz
  - WebSocket para comunicación en tiempo real
- Backend:
  - Node.js con Express
  - WebSocket para manejo de eventos en tiempo real
- Base de Datos: PostgreSQL (para almacenar mensajes de chat si es necesario)
- ORM: Sequelize
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
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── websocket/
│   │   ├── app.js
│   │   └── index.js
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

## Requisitos Previos

- Docker
- Docker Compose
- Node.js (para desarrollo local)

## Configuración y Ejecución

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd proyecto-tarea2
```

### 2. Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables:

```env
WEBSOCKET_URL=wss://tarea-2.2024-2.tallerdeintegracion.cl/connect
DB_NAME=vuelos_db
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=db
```

### 3. Iniciar la Aplicación

```bash
docker-compose up --build -d
```

### 4. Acceder a la Aplicación

- Aplicación web: <http://localhost:8000>

## Desarrollo

### Frontend

Para desarrollo local del frontend:

```bash
cd frontend
npm install
npm run dev
```

### Backend

Para desarrollo local del backend:

```bash
cd backend
npm install
npm run dev
```

## Características Principales

1. Mapa interactivo con:
   - Marcadores de aeropuertos
   - Rutas de vuelos
   - Posiciones de aviones en tiempo real
2. Tabla informativa de vuelos
3. Sistema de chat en tiempo real
4. Actualizaciones en tiempo real de eventos de vuelo (despegues, aterrizajes, accidentes)

## Pruebas

[Instrucciones para ejecutar pruebas unitarias y de integración]

## Despliegue

La aplicación está configurada para ser desplegada usando Docker Compose. Para un despliegue en producción:

1. Asegúrate de modificar las configuraciones de seguridad en `nginx.conf`
2. Actualiza las variables de entorno para producción
3. Ejecuta:

```bash
docker-compose -f docker-compose.prod.yml up -d
```
