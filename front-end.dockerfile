FROM node:18

WORKDIR /app/front-end

COPY ./front-end/package*.json ./
RUN npm install

COPY ./front-end /app/front-end
COPY .env /app/.env

EXPOSE 3000

CMD npm run dev 