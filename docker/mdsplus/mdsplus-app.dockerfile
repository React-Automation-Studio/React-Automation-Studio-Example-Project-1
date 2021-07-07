# https://www.digitalocean.com/community/tutorials/how-to-remotely-access-gui-applications-using-docker-and-caddy-on-debian-9
FROM golang:1.14-buster AS easy-novnc-build
WORKDIR /src
RUN go mod init build && \
    go get github.com/geek1011/easy-novnc@v1.1.0 && \
    go build -o /bin/easy-novnc github.com/geek1011/easy-novnc

FROM debian:buster
# FROM ubuntu:bionic
# ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    openbox \
    tigervnc-standalone-server \
    supervisor \
    gosu && \
    rm -rf /var/lib/apt/lists && \
    mkdir -p /usr/share/desktop-directories

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    lxterminal \
    nano \
    wget \
    openssh-client \
    rsync \
    ca-certificates \
    xdg-utils \
    htop \
    rox-filer \
    tar \
    xzip \
    gzip \
    bzip2 \
    zip \
    unzip && \
    rm -rf /var/lib/apt/lists

# Now the MDSplus Application(s)
# Built following: https://www.mdsplus.org/index.php/Latest_Ubuntu/Debian_Packages

# Install MDSplus pre-requisites
RUN apt update && \
    apt -y install curl \
    gnupg && \
    curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | apt-key add -

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

#todo put the ENV calls into appropriate .env file
# Post Install Configuration
# Environment Variables Required - 
ENV MDS_ROOT /usr/local/mdsplus
ENV LD_LIBRARY_PATH ${MDS_ROOT}/lib:$LD_LIBRARY_PATH
ENV PATH ${MDS_ROOT}/bin:${PATH}
ENV MDS_PATH ${MDS_ROOT}/tdi

# Add MDSplus java classes to CLASSPATH: don't overwrite if already exists
ENV CLASSPATH ${MDS_ROOT}/java/classes/jScope.jar:${MDS_ROOT}/java/classes/jTraverser.jar:${MDS_ROOT}/java/classes/jTraverser2.jar:${MDS_ROOT}/java/classes/jDevices.jar:${MDS_ROOT}/java/classes/mdsobjects.jar:${MDS_ROOT}/java/classes/jDispatcher.jar


# Adds a file to set variables and configure MDSplus 
ADD docker/mdsplus/entrypoint.sh /entrypoint.sh

# This is for easy reading
RUN ln -s ${MDS_ROOT} mdsplus

# Continue to configure for remote
# Enable a non-root user
COPY --from=easy-novnc-build /bin/easy-novnc /usr/local/bin/
COPY docker/mdsplus/conf/menu.xml /etc/xdg/openbox/
COPY docker/mdsplus/conf/supervisord.conf /etc/

# Staging
EXPOSE 8080


RUN groupadd --gid 1000 app && \
    useradd --home-dir /data --shell /bin/bash --uid 1000 --gid 1000 app && \
    mkdir -p /data
VOLUME /data

CMD ["sh", "-c", "chown app:app /data /dev/stdout && exec gosu app supervisord"]

# docker run --detach --restart=always --volume=thunderbird-data:/data --net=thunderbird-net --name=thunderbird-app thunderbird

