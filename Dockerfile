FROM node:8.4
# ENV NODE_ENV production
WORKDIR /usr/src/app
# USER root

COPY package.json ./
COPY ./ ./

RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm run start:dist
