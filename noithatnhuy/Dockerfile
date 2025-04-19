# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Run stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app .
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
