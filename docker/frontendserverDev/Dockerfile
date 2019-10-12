FROM node:10.16.3



ADD ./package.json /frontendserverAppDev/package.json
ADD ./jsconfig.json /frontendserverAppDev/jsconfig.json
WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install
#ADD ./public /frontendserverAppDev/public
#ADD ./src /frontendserverAppDev/src
ADD version ./.env* /frontendserverAppDev/

#RUN test

WORKDIR /






ADD version ./server.key* /
ADD version ./server.cer* /


WORKDIR /frontendserverAppDev
RUN mkdir src
WORKDIR /frontendserverAppDev/src
RUN mkdir React-Automation-Studio
WORKDIR /frontendserverAppDev/
CMD npm start
#CMD ls /frontendserverAppDev/src/React-Automation-Studio

EXPOSE 3001 3000
