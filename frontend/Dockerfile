FROM node:21 as builder

WORKDIR /app

COPY package*.json ./
COPY nginx.conf ./
COPY .env ./.env

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]