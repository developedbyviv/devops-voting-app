# ================================
# Stage 1: Development
# ================================

FROM node:20 AS development

# Set working directory
WORKDIR /app

# copy dependecy files
COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm install

# Copy application code
COPY . .

# Expose dev port
EXPOSE 3000

# Start with nodemon for hot reload
CMD [ "npm", "run", "dev" ]


# ================================
# Stage 2: Development
# ================================

FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# copy dependecy files
COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm install

# Copy application code
COPY . .

# Expose dev port
EXPOSE 3000

# Start with node directly (not nodemon)
CMD [ "node","index.js" ]
