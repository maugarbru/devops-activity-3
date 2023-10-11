# Base image
FROM node:18

# Create app directory
WORKDIR /

COPY . /
RUN ls -l /

RUN npm run azure 

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]