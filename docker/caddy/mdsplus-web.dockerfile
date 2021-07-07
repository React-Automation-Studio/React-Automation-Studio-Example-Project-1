FROM golang:1.14-buster AS caddy-build
WORKDIR /src
RUN echo 'module caddy' > go.mod && \
    echo 'require github.com/caddyserver/caddy/v2 v2.1.1' >> go.mod && \
    echo 'require github.com/mholt/caddy-webdav v0.0.0-20200523051447-bc5d19941ac3' >> go.mod
RUN echo 'package main' > caddy.go && \
    echo 'import caddycmd "github.com/caddyserver/caddy/v2/cmd"' >> caddy.go && \
    echo 'import _ "github.com/caddyserver/caddy/v2/modules/standard"' >> caddy.go && \
    echo 'import _ "github.com/mholt/caddy-webdav"' >> caddy.go && \
    echo 'func main() { caddycmd.Main() }' >> caddy.go
RUN go build -o /bin/caddy .

FROM debian:buster
# FROM ubuntu:bionic
# ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends gosu && \
    rm -rf /var/lib/apt/lists

COPY --from=caddy-build /bin/caddy /usr/local/bin/
COPY docker/caddy/Caddyfile /etc/
# COPY Caddyfile /etc/
EXPOSE 8080

RUN groupadd --gid 1000 app && \
    useradd --home-dir /data --shell /bin/bash --uid 1000 --gid 1000 app && \
    mkdir -p /data

WORKDIR /data
CMD ["sh", "-c", "chown app:app /data && exec gosu app /usr/local/bin/caddy run -adapter caddyfile -config /etc/Caddyfile"]


# PW_HASH=JDJhJDEwJEI1OVUxeDl3TXBxaUh5c1l2UEpCYi5tOHJrZnI1MUNrMmwwMm0xZzVCS09LZE1DWjJHbVNT && \
# docker run --detach --restart=always --volume=thunderbird-data:/data --net=thunderbird-net --name=thunderbird-web --env=APP_USERNAME=$(whoami) --env=APP_PASSWORD_HASH=${PW_HASH} --publish=8080:8080 thunderbird-caddy
