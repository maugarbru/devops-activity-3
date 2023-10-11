# Base image
FROM node:18

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY dist/. .

RUN yarn azure

# Start the server using the production build
CMD [ "node", "main.js" ]