FROM node:20

WORKDIR /nestjs

COPY . .

RUN npm ci
RUN npm run build

EXPOSE $PORT

CMD ["node", "dist/main.js"]