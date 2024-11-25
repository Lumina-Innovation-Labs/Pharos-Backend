FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent && npm install -g @nestjs/cli

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]