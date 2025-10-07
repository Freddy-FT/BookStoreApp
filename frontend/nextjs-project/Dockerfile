FROM node:22-alpine

WORKDIR /nextjs

COPY nextjs/package*.json ./
RUN npm install

COPY nextjs/. ./

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "dev"]