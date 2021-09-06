FROM node:14.15.3

ADD ./ReactApp/package.json /app/package.json

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


RUN npm install
ADD ./ReactApp/public /app/public

ADD .env /app/
ADD ./submodules/React-Automation-Studio/ReactApp/src /app/src/React-Automation-Studio
ADD ./ReactApp/styleguide.config.js /app/styleguide.config.js
ADD ./submodules/React-Automation-Studio/ReactApp/img /app/img







WORKDIR /app
#ADD ./ReactApp/img /app/img
ENV REACT_APP_StyleguideServerPORT=6060
ENV REACT_APP_StyleguideServerURL=http://127.0.0.1
CMD npm run styleguide

EXPOSE 6060
