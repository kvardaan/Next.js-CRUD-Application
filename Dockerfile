FROM node:20-alpine3.19

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy remaining files
COPY . .

# Generate Prisma client
RUN npm run db:generate

# Build the Next.js application
RUN npm run build

CMD ["npm", "run", "start"]