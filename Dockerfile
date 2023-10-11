# Base image
FROM node:18

# Create app directory
WORKDIR /app

COPY . .

RUN npm run azure

# Start the server using the production build
CMD [ "node", "dist/main.js" ]