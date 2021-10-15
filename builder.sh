#!/bin/bash

# Build the images for EPICS RAS for Stacks deployment

REGISTRY=registry.moonshot.fuse:5000
path=~/dev/React-Automation-Studio-Fuse
sm_path=${path}/submodules/React-Automation-Studio

# Frontend
cd ${path}/ &&
    docker build -f docker/frontend/Dockerfile --network host -t ${REGISTRY}/ras:frontend . &&
    docker push ${REGISTRY}/ras:frontend

# There are three in prod
cd ${path}/ &&
    docker build -f docker/pvserver/Dockerfile -t ${REGISTRY}/ras:pvserver . &&
    docker push ${REGISTRY}/ras:pvserver

# Building 'mongosetup' image
cd ${sm_path}/ &&
    docker build -f docker/mongoSetup/Dockerfile -t ${REGISTRY}/ras:mongosetup . &&
    docker push ${REGISTRY}/ras:mongosetup

cd ${path}/ &&
    docker build -f docker/loadSaveDbInit/Dockerfile -t ${REGISTRY}/ras:initializeloadsavedb . &&
    docker push ${REGISTRY}/ras:initializeloadsavedb

cd ${path}/ &&
    docker build -f docker/alarmHandlerDbInit/Dockerfile -t ${REGISTRY}/ras:initializealarmhandlerdb . &&
    docker push ${REGISTRY}/ras:initializealarmhandlerdb

# Building 'alarmhandlerserver' image
cd ${sm_path}/ &&
    docker build -f docker/alarmHandlerServer/Dockerfile -t ${REGISTRY}/ras:alarmhandlerserver . &&
    docker push ${REGISTRY}/ras:alarmhandlerserver

# Building 'initializeadmindb' image
cd ${path}/ &&
    docker build -f ${sm_path}/docker/adminDbInit/Dockerfile -t ${REGISTRY}/ras:initializeadmindb . &&
    docker push ${REGISTRY}/ras:initializeadmindb

# Building 'signalcli' image
cd ${sm_path}/ &&
    docker build -f docker/signalcli/Dockerfile -t ${REGISTRY}/ras:signalcli . &&
    docker push ${REGISTRY}/ras:signalcli

###
###
###
###

# Building mdsplus-actmon image
cd ${path}/ &&
    docker build -f docker/modbussdpIOC/Dockerfile -t ${REGISTRY}/ras:vacuum_ioc . &&
    docker push ${REGISTRY}/ras:vacuum_ioc

# Building mdsplus browser client image
cd ${path}/docker/ &&
    docker build -t ${REGISTRY}/ras:mdsplus-chromium . &&
    docker push ${REGISTRY}/ras:mdsplus-chromium

# Instantiating App
cd ${path}/demo &&
    uid=$(id -u) gid=$(id -g) docker-compose down &&
    registry=${REGISTRY} uid=$(id -u) gid=$(id -g) docker-compose -f "docker-compose.yml" up --build

# Just Rebuild and start, no DOWN
cd ${path}/demo &&
    HOST_IP="$(host $(hostname) | grep -oP '(\s)\d+(\.\d+){3}' | tail -1 | awk '{ print $NF }' | tr -d '\r')" \
    registry=${REGISTRY} uid=$(id -u) gid=$(id -g) docker-compose -f "docker-compose.yml" up --build
