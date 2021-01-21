FROM node:14.15.3

ADD ./ReactApp/package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /app/public

ADD .env /app/
ADD ./submodules/React-Automation-Studio/ReactApp/src /app/src/React-Automation-Studio
ADD ./ReactApp/styleguide.config.js /app/styleguide.config.js
ADD ./ReactApp/src/components /app/src/components
ADD ./ReactApp/src/docs /app/src/docs
ADD ./submodules/React-Automation-Studio/ReactApp/img /app/img
RUN npm run styleguidebuild
RUN cp -R /app/styleguide/ /styleguide/
ADD ./ReactApp/img /styleguide/img
ADD ./submodules/React-Automation-Studio/styleguideServer/ /styleguideServer
WORKDIR /styleguideServer
ENV PATH /styleguideServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install



WORKDIR /




WORKDIR /styleguideServer


CMD node styleguideServer.js

EXPOSE 6060
