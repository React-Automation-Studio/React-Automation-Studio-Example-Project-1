FROM epicsbase

ADD ./alarmHandlerDbInit /alarmHandlerDbInit
WORKDIR /alarmHandlerDbInit

ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/opt/uv-cache/uv \
    uv sync

CMD ["uv","run","main.py"]