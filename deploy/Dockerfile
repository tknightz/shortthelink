FROM node:16-alpine

ENV http_proxy="http://proxy.toshiba.co.jp:8080"
ENV https_proxy="http://proxy.toshiba.co.jp:8080"

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm config set https-proxy=http://proxy.toshiba.co.jp:8080
RUN npm config set http-proxy=http://proxy.toshiba.co.jp:8080
RUN npm install

CMD ["node", "app.js"]
