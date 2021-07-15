# Built following: https://www.mdsplus.org/index.php/Latest_Ubuntu/Debian_Packages
FROM dorowu/ubuntu-desktop-lxde-vnc:focal

ARG DEBIAN_FRONTEND=noninteractive

# Install MDSplus pre-requisites
RUN apt update && \
    apt install -y curl gnupg && \
    curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | apt-key add -

# 18, alpha release
RUN sh -c "echo 'deb [arch=amd64] http://www.mdsplus.org/dist/Ubuntu20/repo MDSplus alpha' > /etc/apt/sources.list.d/mdsplus.list"

# Install Python3 and set it to default 
RUN apt install -y apt-utils \
    # python3 && \
    # update-alternatives --install /usr/bin/python python /usr/bin/python3 1 && \
    && \
    apt install -y python3-distutils


# Install MDSplus packages
# RUN apt update && apt install -y \
#     mdsplus-alpha-devel \
#     mdsplus-alpha-epics \
#     mdsplus-alpha-gsi \
#     mdsplus-alpha-hdf5 \
#     mdsplus-alpha-idl \
#     mdsplus-alpha-java \
#     mdsplus-alpha-kernel \
#     mdsplus-alpha-matlab \
#     mdsplus-alpha-mssql \
#     mdsplus-alpha-python

RUN apt install -y default-jre default-jdk nano wget
# Alternatively build with all
RUN apt update && apt install -y mdsplus-alpha

#todo put the ENV calls into appropriate .env file
# Post Install Configuration
# Environment Variables Required - 
ENV MDS_ROOT /usr/local/mdsplus
ENV LD_LIBRARY_PATH ${MDS_ROOT}/lib:$LD_LIBRARY_PATH
ENV PATH ${MDS_ROOT}/bin:${PATH}
ENV MDS_PATH ${MDS_ROOT}/tdi

# This is for easy 
RUN ln -s ${MDS_ROOT} /mdsplus
# X11 forwarding from Container to host
# ENV DISPLAY ${HOST}:0
# ENV QT_X11_NO_MITSHM 1
# ENV XAUTHORITY /.Xauthority
# Add the bind mount in the docker container run --rm -it  -v /tmp/.X11-unix:/tmp/.X11-unix image:tag
# VOLUME /tmp/.X11-unix

# Add MDSplus java classes to CLASSPATH: don't overwrite if already exists
ENV MDS_JAVA_CLASSES ${MDS_ROOT}/java/classes
# ENV CLASSPATH ${MDS_ROOT}/java/classes/jScope.jar:${MDS_ROOT}/java/classes/jTraverser.jar:${MDS_ROOT}/java/classes/jTraverser2.jar:${MDS_ROOT}/java/classes/jDevices.jar:${MDS_ROOT}/java/classes/mdsobjects.jar:${MDS_ROOT}/java/classes/jDispatcher.jar
ENV CLASSPATH ${MDS_ROOT}/java/classes
# Additional JARs for compiling the ChannelArchiver Class
# ENV CLASSPATH ${CLASSPATH}:${MDS_ROOT}/epics/archiver/caj-1.1.15.jar:${MDS_ROOT}/epics/archiver/jca-2.4.6.jar

# ADD docker/mdsplus/entrypoint.sh /entrypoint.sh
# MDSplus treepath for trees
ENV default_tree_path /trees/~t

# Adds a file to set variables and configure MDSplus 
RUN . ${MDS_ROOT}/setup.sh


EXPOSE 80 8080

# Enable a non-root user
# RUN groupadd -g 1000 operator
# RUN useradd -m -u 1000 -g operator -s /bin/bash operator

# RUN groupadd --gid 1000 app && \
#     useradd --home-dir /data --shell /bin/bash --uid 1000 --gid 1000 app && \
#     mkdir -p /data

# WORKDIR /data
# CMD ["sh", "-c", "chown app:app /data && exec gosu app /usr/local/bin/caddy run -adapter caddyfile -config /etc/Caddyfile"]


# ENTRYPOINT ["/entrypoint.sh"]
# Done Dockerfile for creating MDSplus image from Ubuntu Bionic (18.04) base image to conincide with RAS 2.2.0

