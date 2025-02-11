
# Use Node.js as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose NestJS default dev port
EXPOSE 5000

# Start the NestJS server in development mode with live reload
CMD ["npm", "run", "start:dev"]

