# Base image
FROM node:18

# Create app directory
WORKDIR /app


COPY dist/. .

# Start the server using the production build
CMD [ "node", "main.js" ]