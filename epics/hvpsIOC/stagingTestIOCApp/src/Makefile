TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS BELOW HERE

# xxxRecord.h will be created from xxxRecord.dbd
DBDINC += xxxRecord

# Install xxxSupport.dbd into <top>/dbd
DBD += xxxSupport.dbd

# Build an IOC support library
LIBRARY_IOC += stagingTestIOCSupport

# Compile and add the code to the support library
stagingTestIOCSupport_SRCS += xxxRecord.c
stagingTestIOCSupport_SRCS += devXxxSoft.c

# Link locally-provided code into the support library,
# rather than directly into the IOC application.
# This is required for Windows DLL builds.
stagingTestIOCSupport_SRCS += dbSubExample.c
stagingTestIOCSupport_SRCS += stagingTestIOCHello.c
stagingTestIOCSupport_SRCS += initTrace.c

stagingTestIOCSupport_LIBS += $(EPICS_BASE_IOC_LIBS)


# Build the IOC application
PROD_IOC = stagingTestIOC

# stagingTestIOC.dbd will be created and installed
DBD += stagingTestIOC.dbd

# stagingTestIOC.dbd will include these files:
stagingTestIOC_DBD += base.dbd
stagingTestIOC_DBD += xxxSupport.dbd
stagingTestIOC_DBD += dbSubExample.dbd
stagingTestIOC_DBD += stagingTestIOCHello.dbd
stagingTestIOC_DBD += initTrace.dbd
stagingTestIOC_DBD += calcSupport.dbd
# stagingTestIOC_registerRecordDeviceDriver.cpp derives from stagingTestIOC.dbd
stagingTestIOC_SRCS += stagingTestIOC_registerRecordDeviceDriver.cpp

# Build the main IOC entry point where needed
stagingTestIOC_SRCS_DEFAULT += stagingTestIOCMain.cpp
stagingTestIOC_SRCS_vxWorks += -nil-

# Link in the code from our support library
stagingTestIOC_LIBS += stagingTestIOCSupport
stagingTestIOC_LIBS += calc
# To build SNL programs, SNCSEQ must be defined
# in the <top>/configure/RELEASE file
ifneq ($(SNCSEQ),)
    # Build sncExample into stagingTestIOCSupport
    sncExample_SNCFLAGS += +r
    stagingTestIOC_DBD += sncExample.dbd
    # A .stt sequence program is *not* pre-processed:
    stagingTestIOCSupport_SRCS += sncExample.stt
    stagingTestIOCSupport_LIBS += seq pv
    stagingTestIOC_LIBS += seq pv

    # Build sncProgram as a standalone program
    PROD_HOST += sncProgram
    sncProgram_SNCFLAGS += +m
    # A .st sequence program *is* pre-processed:
    sncProgram_SRCS += sncProgram.st
    sncProgram_LIBS += seq pv
    sncProgram_LIBS += $(EPICS_BASE_HOST_LIBS)
endif

# Finally link IOC to the EPICS Base libraries
stagingTestIOC_LIBS += $(EPICS_BASE_IOC_LIBS)

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD EXTRA GNUMAKE RULES BELOW HERE

