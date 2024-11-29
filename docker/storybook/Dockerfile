FROM node_cache
ADD  ./.env /ReactApp/
ADD ./submodules/React-Automation-Studio/ReactApp/src /ReactApp/React-Automation-Studio
ADD ./ReactApp/src /ReactApp/src
ADD ./ReactApp/vite.config.js /ReactApp/vite.config.js
ADD ./ReactApp/.storybook /ReactApp/.storybook
COPY ./submodules/React-Automation-Studio/ReactApp/img /ReactApp/img
RUN pnpm run build-storybook
ADD ./ReactApp/img /ReactApp/storybook-static/img
VOLUME /build
CMD cp -R /ReactApp/storybook-static/* /build
