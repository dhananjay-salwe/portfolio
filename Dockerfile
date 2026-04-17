#
# Multi-stage build to produce a static bundle with Vite and serve via Nginx.
#
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runtime
WORKDIR /usr/share/nginx/html

# Clean default assets and add our build output
RUN rm -rf ./*
COPY --from=build /app/dist ./

# Nginx configuration for SPA routing and caching
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
