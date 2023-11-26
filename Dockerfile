# Use Node 16 alpine as parent image
FROM node:18-alpine AS build

# Change the working directory on the Docker image to /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD npm run start:prod
