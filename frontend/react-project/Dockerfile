FROM node:22-alpine

WORKDIR /react

COPY react/package*.json ./
RUN npm install

COPY react/. ./

RUN npm install -g vite

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]