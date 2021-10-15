TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS BELOW HERE

# xxxRecord.h will be created from xxxRecord.dbd
DBDINC += xxxRecord

# Install xxxSupport.dbd into <top>/dbd
DBD += xxxSupport.dbd

# Build an IOC support library
LIBRARY_IOC += hvpsIOCSupport

# Compile and add the code to the support library
hvpsIOCSupport_SRCS += xxxRecord.c
hvpsIOCSupport_SRCS += devXxxSoft.c

# Link locally-provided code into the support library,
# rather than directly into the IOC application.
# This is required for Windows DLL builds.
hvpsIOCSupport_SRCS += dbSubExample.c
hvpsIOCSupport_SRCS += hvpsIOCHello.c
hvpsIOCSupport_SRCS += initTrace.c

hvpsIOCSupport_LIBS += $(EPICS_BASE_IOC_LIBS)


# Build the IOC application
PROD_IOC = hvpsIOC

# hvpsIOC.dbd will be created and installed
DBD += hvpsIOC.dbd

# hvpsIOC.dbd will include these files:
hvpsIOC_DBD += base.dbd
hvpsIOC_DBD += xxxSupport.dbd
hvpsIOC_DBD += dbSubExample.dbd
hvpsIOC_DBD += hvpsIOCHello.dbd
hvpsIOC_DBD += initTrace.dbd
hvpsIOC_DBD += calcSupport.dbd
# hvpsIOC_registerRecordDeviceDriver.cpp derives from hvpsIOC.dbd
hvpsIOC_SRCS += hvpsIOC_registerRecordDeviceDriver.cpp

# Build the main IOC entry point where needed
hvpsIOC_SRCS_DEFAULT += hvpsIOCMain.cpp
hvpsIOC_SRCS_vxWorks += -nil-

# Link in the code from our support library
hvpsIOC_LIBS += hvpsIOCSupport
hvpsIOC_LIBS += calc
hvpsIOChvpsIOC__LIBS += stream
hvpsIOChvpsIOC__LIBS += asyn
# To build SNL programs, SNCSEQ must be defined
# in the <top>/configure/RELEASE file
ifneq ($(SNCSEQ),)
    # Build sncExample into hvpsIOCSupport
    sncExample_SNCFLAGS += +r
    hvpsIOC_DBD += sncExample.dbd
    # A .stt sequence program is *not* pre-processed:
    hvpsIOCSupport_SRCS += sncExample.stt
    hvpsIOCSupport_LIBS += seq pv
    hvpsIOC_LIBS += seq pv

    # Build sncProgram as a standalone program
    PROD_HOST += sncProgram
    sncProgram_SNCFLAGS += +m
    # A .st sequence program *is* pre-processed:
    sncProgram_SRCS += sncProgram.st
    sncProgram_LIBS += seq pv
    sncProgram_LIBS += $(EPICS_BASE_HOST_LIBS)
endif

# Finally link IOC to the EPICS Base libraries
hvpsIOC_LIBS += $(EPICS_BASE_IOC_LIBS)

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD EXTRA GNUMAKE RULES BELOW HERE

