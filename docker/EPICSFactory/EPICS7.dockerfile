FROM ubuntu:18.04
ENV EPICS_BASE=/epics/base/

WORKDIR /epics

RUN apt-get update && \
    apt-get install -y \
    wget \
    autoconf \
    libtool \
    check \
    patch \
    build-essential \
    libreadline-gplv2-dev \
    re2c \
    libxml2-dev \
    tmux \
    nano \
    locales

# Add Maven - Maybe not correct...
RUN apt-get update && \
    apt-get install -y \
    openjdk-8-jdk \
    maven

# Set the locale
RUN sed -i 's/# \(en_US\.UTF-8 .*\)/\1/' /etc/locale.gen && \
	touch /usr/share/locale/locale.alias && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8   


# Add EPICS BASE
RUN wget https://epics.anl.gov/download/base/base-7.0.5.tar.gz
RUN tar -xvf base-7.0.5.tar.gz
RUN ln -s /epics/base-7.0.5 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics

RUN wget https://epics.anl.gov/bcda/synApps/tar/synApps_6_0.tar.gz
RUN tar -xvf synApps_6_0.tar.gz
RUN ln -s /epics/synApps/support /epics/support

ADD ./epics/config /epics/config

WORKDIR /epics/

RUN cp config/synApps_6_0/configure/RELEASE support/configure/RELEASE
RUN cp config/synApps_6_0/busy-R1-7/configure/RELEASE support/busy-R1-7/configure/RELEASE
RUN cp config/synApps_6_0/ipac-2-15/configure/RELEASE support/ipac-2-15/configure/RELEASE
WORKDIR /epics/support

RUN make release
RUN make

ADD mdsplus/include /usr/local/mdsplus/include
# Add MDSplus-EPICS Interface: records
# ADD ./epics/support/mdsplusSup /epics/support/mdsplusSup/
# WORKDIR /epics/support/mdsplusSup

# RUN make clean
# RUN make

ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV PATH="/epics/base/bin/linux-x86_64/:${PATH}"

RUN apt-get install -y nano

RUN echo "export LANGUAGE=en_US.UTF-8 \
    export LANG=en_US.UTF-8 \
    export LC_ALL=en_US.UTF-8">>~/.bash_profile

#RUN ls /epics/base/lib/linux-x86_64/


# WORKDIR /epics/stagingTestIOC/iocBoot/iocstagingTestIOC/

# CMD ./st.cmd

EXPOSE 5000 5064 5065 8001

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
    apt install -y python3-distutils git


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

# Alternatively build with all
RUN apt update && apt install -y mdsplus-alpha

RUN apt install -y default-jdk
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64

# RUN update-alternatives --install \
#     /usr/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 1611


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
# WORKDIR $MDS_ROOT/epics/archiver
# RUN rm *.jar && \
#     wget https://repo1.maven.org/maven2/org/epics/caj/1.1.15/caj-1.1.15.jar && \
#     wget https://repo1.maven.org/maven2/org/epics/jca/2.4.6/jca-2.4.6.jar && \
#     chmod +x *.jar && chown 987:981 *.jar
 
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

