# FROM oven/bun
FROM node:18-alpine

WORKDIR /app
COPY ./ .
RUN npm install

HEALTHCHECK --interval=5m --start-period=5s CMD curl -f http://localhost:${APP_PORT}/_/healthcheck

EXPOSE 3010

RUN npm run build

CMD ["npm", "run" ,"prod"]