# Base image
FROM node:18

# Create app directory
WORKDIR /app

COPY dist/. .
COPY package*.json ./

RUN npm install

# Start the server using the production build
CMD [ "node", "main.js" ]