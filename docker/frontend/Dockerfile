FROM node:14.15.3
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
ADD ./ReactApp/package.json /frontend/package.json
ADD ./ReactApp/jsconfig.json /frontend/jsconfig.json
ENV PATH /frontend/node_modules/.bin:$PATH
RUN npm set registry http://registry.npmjs.org/
RUN npm install
ADD ./ReactApp/public /frontend/public
ADD ./ReactApp/src /frontend/src
COPY ./submodules/React-Automation-Studio/ReactApp/src /frontend/src/React-Automation-Studio
ADD .env /frontend/
RUN npm run build
VOLUME /build
CMD cp -R /frontend/build/* /build/

