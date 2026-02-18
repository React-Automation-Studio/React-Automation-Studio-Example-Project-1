FROM epicsbase

ADD ./loadSaveDbInit /loadSaveDbInit
WORKDIR /loadSaveDbInit

ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/opt/uv-cache/uv \
    uv sync

CMD ["uv","run","initDB.py"]

EXPOSE 27017
