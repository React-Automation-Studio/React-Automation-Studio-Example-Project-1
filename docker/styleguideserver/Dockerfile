FROM node:10.15.0

ADD ./package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./public /app/public

ADD version ./.env* /app/
ADD ./src/automation-studio/src /app/src
ADD ./src/automation-studio/styleguide.config.js /app/styleguide.config.js
ADD ./src/automation-studio/img /app/img
RUN npm run styleguidebuild
RUN cp -R /app/styleguide/ /styleguide/
ADD ./img /styleguide/img
ADD ./src/automation-studio/styleguideServer/ /styleguideServer
WORKDIR /styleguideServer
ENV PATH /styleguideServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install


#RUN test

WORKDIR /




COPY version ./.env* /

WORKDIR /styleguideServer


CMD node styleguideServer.js

EXPOSE 6060
