FROM node:15.12.0-alpine3.10
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 3333
CMD [ "npm","start" ]