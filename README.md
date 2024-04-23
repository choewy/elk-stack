# ELK Stack

## ELK

```bash
docker-compose up setup
docker-compose up -d
```

- `kibana` : http://localhost:5601
- `logstash(profile)` : http://localhost:9600
- `logstash(http)` : http://localhost:5045

> - id : `elastic`
> - password: `password`

## Example

### MariaDB

```bash
cd example/mariadb

docker-compose up -d
```

### NestJS

```bash
cd example/nestjs

docker-compose up -d
```

### PHP(apache)

```bash
cd example/php

docker-compose up -d
```

## Trouble Shooting

> failed to obtain node locks, tried [/usr/share/elasticsearch/data]; maybe these locations are not writable or multiple nodes were started on the same data path?

```bash
sudo chmod 777 -R ./elasticsearch/data
docker-compose up setup
```

## Reference

- https://github.com/deviantony/docker-elk
- https://www.elastic.co/guide/index.html
