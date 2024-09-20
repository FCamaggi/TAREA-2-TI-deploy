# Nombre del Proyecto

## Descripción

Proyecto de template para aplicaciones web full-stack con React + Vite, Node.js y PostgreSQL. Incluye configuración de Docker Compose para orquestación de contenedores.

## Tecnologías Utilizadas

- Frontend: React con Vite
- Backend: Node.js con Express
- Base de Datos: PostgreSQL
- ORM: Sequelize
- Contenedores: Docker
- Servidor Web: Nginx
- Orquestación de Contenedores: Docker Compose

## Estructura del Proyecto

```any
proyecto/
│
├── react/
│   ├── src/
│   ├── public/
│   ├── ...
│   ├── package.json
│   └── Dockerfile
│
├── node/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
|   |   ├── controllers/
|   |   ├── middleware/
|   |   ├── migrations/
|   |   ├── seeders/
|   |   ├── util/
|   |   ├── app.js
│   │   └── index.js
│   ├── package.json
│   ├── entrypoint.sh
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

## Configuración y Ejecución

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_DIRECTORIO]
```

### 2. Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables:

```.env
DB_NAME=db_name
DB_USER=db_user
DB_PASSWORD=db_password
DB_HOST=db # Nombre del servicio de la base de datos en Docker Compose
```

### 3. Iniciar la Aplicación

```bash
docker-compose up --build -d
```

### 4. Acceder a la Aplicación

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:3000>
- Aplicación completa a través de Nginx: <http://localhost:8000>

## Desarrollo

### Frontend

El frontend está desarrollado con React y Vite. Para desarrollo local:

```bash
cd frontend
npm install
npm run dev
```

### Backend

El backend está desarrollado con Node.js y Express. Para desarrollo local:

```bash
cd backend
npm install
npm run dev
```

## Base de Datos

La base de datos PostgreSQL se inicializa automáticamente con Docker Compose. Para ejecutar migraciones:

```bash
docker-compose exec backend npx sequelize-cli db:migrate
```

## Pruebas

[Instrucciones para ejecutar pruebas, si las hay]

## Despliegue

La aplicación está configurada para ser desplegada usando Docker Compose. Para un despliegue en producción, asegúrate de modificar las configuraciones de seguridad y optimización según sea necesario.
