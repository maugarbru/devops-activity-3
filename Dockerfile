# Base image
FROM node:18

# Create app directory
WORKDIR /app

RUN npm run azure

COPY . .

# Start the server using the production build
CMD [ "node", "dist/main.js" ]