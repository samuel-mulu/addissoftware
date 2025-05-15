# Use the official Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Your app runs on port 5000
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
