# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app

# Instalamos dependencias primero para aprovechar el cache de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build --configuration=production

# Etapa de servidor
FROM nginx:stable-alpine

# Limpiamos para evitar basura de builds anteriores
RUN rm -rf /usr/share/nginx/html/*

# Copiamos tu nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# CAMBIO CLAVE: Copiamos el CONTENIDO de 'browser' a la raíz de nginx
COPY --from=build /app/dist/front/browser/. /usr/share/nginx/html/

# Aseguramos permisos de lectura
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]