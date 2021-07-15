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
    maven \
    git

# Set the locale
RUN sed -i 's/# \(en_US\.UTF-8 .*\)/\1/' /etc/locale.gen && \
	touch /usr/share/locale/locale.alias && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8   


# Add EPICS BASE
RUN git clone -b 7.0 https://git.launchpad.net/epics-base base-7.0
RUN ln -s /epics/base-7.0 /epics/base
WORKDIR /epics/base
RUN make
WORKDIR /epics

# RUN wget https://epics.anl.gov/bcda/synApps/tar/synApps_6_0.tar.gz
# RUN tar -xvf synApps_6_0.tar.gz
# RUN ln -s /epics/synApps/support /epics/support

ADD ./epics/config /epics/config
RUN apt install -y default-jdk
# WORKDIR /epics/

# RUN cp config/synApps_6_0/configure/RELEASE support/configure/RELEASE
# RUN cp config/synApps_6_0/busy-R1-7/configure/RELEASE support/busy-R1-7/configure/RELEASE
# RUN cp config/synApps_6_0/ipac-2-15/configure/RELEASE support/ipac-2-15/configure/RELEASE
# WORKDIR /epics/support

# RUN make release
# RUN make

ADD mdsplus/include /usr/local/mdsplus/include
# Add MDSplus-EPICS Interface: records
# ADD ./epics/support/mdsplusSup /epics/support/mdsplusSup/
# WORKDIR /epics/support/mdsplusSup

# RUN make clean
# RUN make

ENV EPICS_CA_ADDR_LIST="0.0.0.0:8001"
ENV PYEPICS_LIBCA=/epics/base/lib/linux-x86_64/libca.so

ENV MDS_JARS /mdsplus/java/classes
ENV CLASSPATH ${MDS_JARS}/jScope.jar:${MDS_JARS}/jTraverser.jar:${MDS_JARS}/jTraverser2.jar:${MDS_JARS}/jDevices.jar:${MDS_JARS}/mdsobjects.jar:${MDS_JARS}/jDispatcher.jar

# epicsCoreJava
WORKDIR /epics
RUN git clone https://github.com/epics-base/epicsCoreJava.git
WORKDIR /epics/epicsCoreJava
RUN mvn install

# Additional JARs for compiling the ChannelArchiver Class
ENV CLASSPATH ${CLASSPATH}:/mdsplus/epics/archiver/caj-1.1.5b.jar:/mdsplus/epics/archiver/jca-2.3.2.jar
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:/epics/base/bin/linux-x86_64/:${PATH}"

RUN apt-get install -y nano

RUN echo "export LANGUAGE=en_US.UTF-8 \
    export LANG=en_US.UTF-8 \
    export LC_ALL=en_US.UTF-8">>~/.bash_profile

#RUN ls /epics/base/lib/linux-x86_64/


# WORKDIR /epics/stagingTestIOC/iocBoot/iocstagingTestIOC/

# CMD ./st.cmd

EXPOSE 5000 5064 5065 8001

