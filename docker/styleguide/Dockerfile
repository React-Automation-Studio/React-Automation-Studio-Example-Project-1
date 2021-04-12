FROM node:14.15.3

ADD ./ReactApp/package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /app/public

ADD  ./.env /app/
ADD ./submodules/React-Automation-Studio/ReactApp/src /app/src/React-Automation-Studio
ADD ./ReactApp/styleguide.config.js /app/styleguide.config.js
ADD ./ReactApp/src/components /app/src/components
ADD ./ReactApp/src/docs /app/src/docs
ADD ./submodules/React-Automation-Studio/ReactApp/img /app/img
RUN npm run styleguidebuild
ADD ./ReactApp/img /app/styleguide/img
VOLUME /build
CMD cp -R /app/styleguide/* /build
