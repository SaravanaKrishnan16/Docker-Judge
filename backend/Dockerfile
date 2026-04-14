# Dockerfile for Node.js API server
FROM node:18-alpine

# Install Docker CLI
RUN apk update && apk add --no-cache docker-cli

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create temp directory for code execution
RUN mkdir -p /tmp/dockerjudge

# Verify Docker installation
RUN docker --version

EXPOSE 3000

CMD ["node", "server.js"]
