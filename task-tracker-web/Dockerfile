FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
# Same-origin by default: nginx proxies /api/* to the backend (see nginx.conf.template).
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Render (and most PaaS) route traffic to $PORT; nginx must listen there.
# envsubst expands $PORT and $TASK_API_URL into the final server config.
ENV PORT=80 \
    TASK_API_URL=localhost:8080
EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '${PORT} ${TASK_API_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
