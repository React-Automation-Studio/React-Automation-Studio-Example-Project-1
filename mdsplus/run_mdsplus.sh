#!/bin/bash

#---------------------------------------------------------------------#
# Call this Script to load
#TODO make this a proper menu with 'case ... esac'
#---------------------------------------------------------------------#
# xhost +${HOST}
tag=$1

dev_home=/home/joshuafiddler/controls/React-Automation-Studio-Fuse

# With tutorial tree setup
# docker container run --rm --hostname qrn -it -p 8001:8001 \
#     -v /tmp/.X11-unix:/tmp/.X11-unix:rw \
#     -v ${dev_home}/QRN/docker/config/envsyms:/usr/local/mdsplus/local/envsyms:rw \
#     -v ${dev_home}/MDSplusTutorial:/mdsplus/tutorial:rw \
#     qrn:${tag} bash

# To add 'hostuser'

# with envsyms and /trees accessible to non-root users
docker container run --rm --hostname qrn -it -p 8080:8080 \
    -e DISPLAY=${DISPLAY} \
    -e XAUTHORITY=/.Xauthority \
    -v /tmp/.X11-unix:/tmp/.X11-unix:rw \
    -v ${dev_home}/docker/config/envsyms:/usr/local/mdsplus/local/envsyms:rw \
    -v ${dev_home}/docker/trees:/trees:rw \
    -v ${dev_home}/MDSplusTutorial:/mdsplus/tutorial:rw \
    ${tag} bash
