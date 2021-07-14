# Built following: https://www.mdsplus.org/index.php/Latest_Ubuntu/Debian_Packages
# FROM dorowu/ubuntu-desktop-lxde-vnc:focal
FROM ubuntu:bionic

ARG DEBIAN_FRONTEND=noninteractive

# Install MDSplus pre-requisites
RUN apt update && \
    apt install -y curl gnupg nano wget && \
    curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | apt-key add -

# 18, alpha release
RUN sh -c "echo 'deb [arch=amd64] http://www.mdsplus.org/dist/Ubuntu18/repo MDSplus alpha' > /etc/apt/sources.list.d/mdsplus.list"

# Install Python3 and set it to default 
RUN apt install -y apt-utils \
    python3 && \
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

# RUN apt install -y openjdk-8-jdk 
RUN apt install -y default-jdk
# RUN update-alternatives --install \
#     /usr/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 1611
# Alternatively build with all
RUN apt update && apt install -y mdsplus-alpha

#todo put the ENV calls into appropriate .env file
# Post Install Configuration
# Environment Variables Required - 
ENV MDS_ROOT /usr/local/mdsplus
ENV LD_LIBRARY_PATH ${MDS_ROOT}/lib:$LD_LIBRARY_PATH
ENV PATH ${MDS_ROOT}/bin:${PATH}
ENV MDS_PATH ${MDS_ROOT}/tdi

# X11 forwarding from Container to host
# ENV DISPLAY ${HOST}:0
# ENV QT_X11_NO_MITSHM 1
# ENV XAUTHORITY /.Xauthority
# Add the bind mount in the docker container run --rm -it  -v /tmp/.X11-unix:/tmp/.X11-unix image:tag
# VOLUME /tmp/.X11-unix

# Add MDSplus java classes to CLASSPATH: don't overwrite if already exists
ENV MDS_JAVA_CLASSES ${MDS_ROOT}/java/classes
ENV CLASSPATH ${MDS_JAVA_CLASSES}/jScope.jar:${MDS_JAVA_CLASSES}/jTraverser.jar:${MDS_JAVA_CLASSES}/jTraverser2.jar:${MDS_JAVA_CLASSES}/jDevices.jar:${MDS_JAVA_CLASSES}/mdsobjects.jar:${MDS_JAVA_CLASSES}/jDispatcher.jar
# Add Archiver JARs to CLASSPATH
WORKDIR $MDS_ROOT/epics/archiver
RUN rm *.jar && \
    wget https://repo1.maven.org/maven2/org/epics/caj/1.1.15/caj-1.1.15.jar && \
    wget https://repo1.maven.org/maven2/org/epics/jca/2.4.6/jca-2.4.6.jar && \
    chmod +x *.jar && chown 987:981 *.jar
 
ENV CLASSPATH ${CLASSPATH}:${MDS_ROOT}/epics/archiver/caj-1.1.15.jar:${MDS_ROOT}/epics/archiver/jca-2.4.6.jar

ENV default_tree_path /trees/~t

# Adds a file to set variables and configure MDSplus 
# ADD docker/mdsplus/entrypoint.sh /entrypoint.sh
RUN . ${MDS_ROOT}/setup.sh

# This is for easy reading
RUN ln -s ${MDS_ROOT} /mdsplus

# Enable a non-root user
# RUN groupadd -g 1000 operator
# RUN useradd -m -u 1000 -g operator -s /bin/bash operator

# Expose this port for use by MDSplus for use with Get Started and Tutorial materials
# EXPOSE 8001

EXPOSE 8001

# Start the Archiver but only override PV BUF_SIZE as "1" since no data items defined in Tree.
# CMD ["java", "${MDS_ROOT}/epics/archiver/ChannelArchiver", "/trees/sdp", "1"]

# ENTRYPOINT ["/entrypoint.sh"]
# Done Dockerfile for creating MDSplus image from Ubuntu Bionic (18.04) base image to conincide with RAS 2.2.0

