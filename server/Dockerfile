FROM node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD [ "nodemon", "server.js" ]