FROM node:20.11.0 as node_cache
ADD ./ReactApp/package.json /ReactApp/package.json
WORKDIR /ReactApp
ENV PATH /ReactApp/node_modules/.bin:$PATH
RUN npm install --legacy-peer-dep

FROM node_cache
ADD  ./.env /app/
ADD ./submodules/React-Automation-Studio/ReactApp/src /app/React-Automation-Studio
ADD ./ReactApp/src /app/src
ADD ./ReactApp/vite.config.js /app/vite.config.js
ADD ./ReactApp/.storybook /app/.storybook
COPY ./submodules/React-Automation-Studio/ReactApp/img /app/img
RUN npm run build-storybook
ADD ./ReactApp/img /app/storybook-static/img
VOLUME /build
CMD cp -R /app/storybook-static/* /build
