# Use a stable Node.js version
FROM node:20-bullseye-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all your project files
COPY . .

# Expose the port your app runs on (matches your .env or index.js)
EXPOSE 8000

# Start the bot directly (Bypassing PM2 to prevent Docker errors)
CMD ["node", "index.js"]
