#!/bin/sh

# Esperar a que la base de datos esté disponible
until npx sequelize-cli db:create || true; do
  echo "Esperando a que la base de datos esté lista..."
  sleep 3
done

# Correr las migraciones para asegurarse de que el esquema esté actualizado
npx sequelize-cli db:migrate

# Iniciar el servidor
exec npm start