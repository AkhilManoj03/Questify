FROM mysql:latest

ARG PASSWORD

ENV MYSQL_ROOT_PASSWORD=$PASSWORD

ADD ./database/dumpfile.sql /docker-entrypoint-initdb.d/
COPY .env /app/.env

WORKDIR /app

EXPOSE 3306