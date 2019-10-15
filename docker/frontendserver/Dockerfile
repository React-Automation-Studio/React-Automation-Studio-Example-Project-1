FROM node:10.16.3



ADD ./ReactApp/package.json /frontendserverApp/package.json
ADD ./ReactApp/jsconfig.json /frontendserverApp/jsconfig.json
WORKDIR /frontendserverApp
ENV PATH /frontendserverApp/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /frontendserverApp/public
ADD ./ReactApp/src /frontendserverApp/src
COPY ./submodules/React-Automation-Studio/src /frontendserverApp/src/React-Automation-Studio

ADD .env /frontendserverApp/

RUN npm run build
RUN cp -R /frontendserverApp/build/ /build/
ADD ./submodules/React-Automation-Studio/frontendServer/ /frontendServer
WORKDIR /frontendServer
ENV PATH /frontendServer/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install


WORKDIR /frontendServer


CMD node frontendServer.js

EXPOSE $REACT_APP_FrontendServerPORT $REACT_APP_PyEpicsServerPORT
