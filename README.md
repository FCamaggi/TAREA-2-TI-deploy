# Tarea 2: Sistema de Seguimiento de Vuelos en Tiempo Real

## Descripción

Este proyecto es parte de la Tarea 2 para el curso IIC3103 - Taller de Integración. Implementa un sistema de seguimiento de vuelos en tiempo real utilizando WebSockets para la comunicación de eventos y un mapa interactivo para la visualización de aeropuertos, rutas y aviones.

## Características

- Conexión en tiempo real con WebSocket
- Mapa interactivo mostrando aeropuertos, rutas y aviones
- Tabla de vuelos con información actualizada
- Sistema de chat en tiempo real
- Visualización de eventos especiales (despegue, aterrizaje, accidente)

## Tecnologías Utilizadas

- Frontend:
  - React con Vite
  - Material-UI para componentes de interfaz
  - react-leaflet para mapas interactivos
  - WebSocket nativo para comunicación en tiempo real
- Desarrollo Local:
  - Docker y Docker Compose
  - Nginx como servidor web

## Acceso a la Aplicación

La aplicación está desplegada y accesible en el siguiente enlace:

[https://lambent-blini-e2552c.netlify.app/](https://lambent-blini-e2552c.netlify.app/)

## Desarrollo Local

Para el desarrollo local, se utiliza Docker Compose con Nginx como servidor web. Para iniciar la aplicación:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
2. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

3. Una vez que los contenedores estén en funcionamiento, accede a la aplicación en tu navegador:

```bash
http://localhost:8000
```

Nota: La aplicación se sirve en el puerto 8000 cuando se ejecuta localmente con Docker.

## Autor

Nombre: Fabrizio Camaggi
Número de Alumno: 18625193

## Notas Adicionales

- La aplicación utiliza el WebSocket proporcionado por el curso para la comunicación en tiempo real.
- Asegúrese de tener una conexión a Internet estable al probar la aplicación, ya que depende de servicios externos para los datos de vuelos.
- El despliegue en Netlify no utiliza Docker ni Nginx, esto es solo para el desarrollo local.
- Si experimenta problemas al ejecutar localmente, asegúrese de que el puerto 8000 no esté siendo utilizado por otra aplicación.
