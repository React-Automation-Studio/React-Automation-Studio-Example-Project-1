# Built following: https://www.mdsplus.org/index.php/Latest_Ubuntu/Debian_Packages
FROM ubuntu:focal


# Install MDSplus pre-requisites
RUN apt update && apt -y install curl gnupg && curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | apt-key add -

# 18, alpha release
RUN sh -c "echo 'deb [arch=amd64] http://www.mdsplus.org/dist/Ubuntu20/repo MDSplus alpha' > /etc/apt/sources.list.d/mdsplus.list"

# Install Python3 and set it to default 
RUN apt install -y python3 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3 1 && \
    apt install -y python3-distutils


# Install MDSplus packages
RUN apt update && apt install -y \
    mdsplus-alpha-devel \
    mdsplus-alpha-epics \
    mdsplus-alpha-gsi \
    mdsplus-alpha-hdf5 \
    mdsplus-alpha-idl \
    mdsplus-alpha-java \
    mdsplus-alpha-kernel \
    mdsplus-alpha-matlab \
    mdsplus-alpha-mssql \
    mdsplus-alpha-python

# Alternatively build with all
# RUN apt update && apt install -y mdsplus-alpha

# Install jre and nano
RUN apt install -y default-jre default-jdk nano

# install Cinnamon and tightvnc for remote desktop


#todo put the ENV calls into appropriate .env file
# Post Install Configuration
# Environment Variables Required - 
ENV MDS_ROOT /usr/local/mdsplus
ENV LD_LIBRARY_PATH ${MDS_ROOT}/lib:$LD_LIBRARY_PATH
ENV PATH ${MDS_ROOT}/bin:${PATH}
ENV MDS_PATH ${MDS_ROOT}/tdi

# X11 forwarding from Container to host
ENV DISPLAY DISPLAY
ENV QT_X11_NO_MITSHM 1
ENV XAUTHORITY /.Xauthority
# Add the bind mount in the docker container run --rm -it  -v /tmp/.X11-unix:/tmp/.X11-unix image:tag
# VOLUME /tmp/.X11-unix

# Add MDSplus java classes to CLASSPATH: don't overwrite if already exists
ENV CLASSPATH ${MDS_ROOT}/java/classes/jScope.jar:${MDS_ROOT}/java/classes/jTraverser.jar:${MDS_ROOT}/java/classes/jTraverser2.jar:${MDS_ROOT}/java/classes/jDevices.jar:${MDS_ROOT}/java/classes/mdsobjects.jar:${MDS_ROOT}/java/classes/jDispatcher.jar


# Adds a file to set variables and configure MDSplus 
ADD mdsplus/entrypoint.sh /entrypoint.sh
# ADD entrypoint.sh /entrypoint.sh

# This is for easy reading
RUN ln -s ${MDS_ROOT} mdsplus

# Enable a non-root user
RUN groupadd -g 1000 hostgroup
RUN useradd -m -u 1000 -g hostgroup -s /bin/bash hostuser

# Expose this port for use by MDSplus for use with Get Started and Tutorial materials
EXPOSE 8001

ENTRYPOINT ["/entrypoint.sh"] 

CMD bash
# Done Dockerfile for creating MDSplus image from Ubuntu Bionic (18.04) base image to conincide with RAS 2.2.0
