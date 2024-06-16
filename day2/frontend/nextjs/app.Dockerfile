# FROM oven/bun
FROM node:18-alpine

WORKDIR /app
COPY ./ .
RUN mkdir /app/public/media
RUN npm install

# HEALTHCHECK --interval=5m --start-period=5s CMD curl -f http://localhost:${APP_PORT}/healthcheck

RUN npm run build

CMD ["npm", "run" ,"start"]