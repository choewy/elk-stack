# ELK Stack

## ELK

```bash
docker-compose up setup
docker-compose up -d
```

- `kibana` : http://localhost:5601
- `logstash(profile)` : http://localhost:9600
- `logstash(http)` : http://localhost:5045

## Example

### MariaDB

```bash
cd example/mariadb

docker-compose up -d
```

### NestJS

```bash
cd example/nestjs

npm ci
npm run start
```

## Reference

- https://github.com/deviantony/docker-elk
- https://www.elastic.co/guide/index.html
