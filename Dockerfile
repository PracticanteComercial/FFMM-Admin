# Usa una imagen base con Node.js
FROM node:17

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /FFMM-Admin

# Copia los archivos del paquete de la aplicación e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

EXPOSE 3003

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
