FROM node:18.16.1
ADD ./ReactApp/package.json /frontendserverAppDev/package.json
ADD ./ReactApp/jsconfig.json /frontendserverAppDev/jsconfig.json
WORKDIR /frontendserverAppDev
ENV PATH /frontendserverAppDev/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep
ADD .env /frontendserverAppDev/
WORKDIR /
WORKDIR /frontendserverAppDev
RUN mkdir src
WORKDIR /frontendserverAppDev/src
RUN mkdir React-Automation-Studio
WORKDIR /frontendserverAppDev/
CMD npm start


EXPOSE 3001 3000
