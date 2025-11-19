FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

COPY ado_app.conf /etc/nginx/conf.d/ado_app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
