FROM ubuntu:18.04

# Install Python3 and set it to default 
RUN apt-get update && apt-get install -y python3 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3 1 && \
    apt-get install -y python3-distutils

# Add EPICS
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
    curl \
    gnupg \
    git \
    locales

# Set the locale
RUN sed -i 's/# \(en_US\.UTF-8 .*\)/\1/' /etc/locale.gen && \
	touch /usr/share/locale/locale.alias && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8 
 
# Add EPICS BASE
# ADD ./epics/config /epics/config
RUN git clone --recursive -b 7.0 https://git.launchpad.net/epics-base base-7.0
RUN ln -s /epics/base-7.0 /epics/base
WORKDIR /epics/base
RUN make clean && make
WORKDIR /epics

# ADD MDSPLUS
# Install MDSplus pre-requisites
RUN curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | apt-key add -

# Install MDSplus repo and packages
# 18, alpha release
RUN sh -c "echo 'deb [arch=amd64] http://www.mdsplus.org/dist/Ubuntu18/repo MDSplus alpha' > /etc/apt/sources.list.d/mdsplus.list"
RUN apt update && apt install -y mdsplus-alpha wget

#todo put the ENV calls into appropriate .env file
# Post Install Configuration
# Environment Variables Required - 
ENV MDS_ROOT /usr/local/mdsplus
ENV LD_LIBRARY_PATH ${MDS_ROOT}/lib:$LD_LIBRARY_PATH
ENV PATH ${MDS_ROOT}/bin:${PATH}
ENV MDS_PATH ${MDS_ROOT}/tdi

ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV MDS_JARS ${MDS_ROOT}/java/classes
ENV CLASSPATH ${MDS_JARS}/jScope.jar:${MDS_JARS}/jTraverser.jar:${MDS_JARS}/jTraverser2.jar:${MDS_JARS}/jDevices.jar:${MDS_JARS}/mdsobjects.jar:${MDS_JARS}/jDispatcher.jar

# Additional JARs for compiling the ChannelArchiver Class
ENV CLASSPATH ${CLASSPATH}:/mdsplus/epics/archiver/caj-1.1.5b.jar:/mdsplus/epics/archiver/jca-2.3.2.jar
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:/epics/base/bin/linux-x86_64/:${PATH}"

# epicsCoreJava
WORKDIR /epics
RUN apt-get install -y default-jdk maven
RUN git clone https://github.com/epics-base/epicsCoreJava.git
WORKDIR /epics/epicsCoreJava
RUN mvn install

RUN . ${MDS_ROOT}/setup.sh
RUN ln -s ${MDS_ROOT} /mdsplus

EXPOSE 5000 5064 5065 8001

