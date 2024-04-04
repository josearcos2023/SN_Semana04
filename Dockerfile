# Usa una imagen base de Node.js
FROM node

    # Establece el directorio de trabajo dentro del contenedor
    WORKDIR /usr/src/app

    # Clona el repositorio de GitHub
    # RUN git clone https://github.com/josearcos2023/SN_Semana04.git .

    # Copia el archivo package.json y package-lock.json (o tu archivo de dependencias) al directorio de trabajo
    COPY package*.json ./

    # Instala las dependencias
    RUN npm install > /dev/null

    COPY . .

    # Expone el puerto en el que se ejecuta tu aplicación Express
    EXPOSE 9000

    # Comando para ejecutar tu aplicación cuando se inicie el contenedor
    CMD ["node", "/index.js"]