TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS BELOW HERE

# xxxRecord.h will be created from xxxRecord.dbd
DBDINC += xxxRecord

# Install xxxSupport.dbd into <top>/dbd
DBD += xxxSupport.dbd

# Build an IOC support library
LIBRARY_IOC += stagingSDPIOCSupport

# Compile and add the code to the support library
stagingSDPIOCSupport_SRCS += xxxRecord.c
stagingSDPIOCSupport_SRCS += devXxxSoft.c

# Link locally-provided code into the support library,
# rather than directly into the IOC application.
# This is required for Windows DLL builds.
stagingSDPIOCSupport_SRCS += dbSubExample.c
stagingSDPIOCSupport_SRCS += stagingSDPIOCHello.c
stagingSDPIOCSupport_SRCS += initTrace.c

stagingSDPIOCSupport_LIBS += $(EPICS_BASE_IOC_LIBS)


# Build the IOC application
PROD_IOC = stagingSDPIOC

# stagingSDPIOC.dbd will be created and installed
DBD += stagingSDPIOC.dbd

# stagingSDPIOC.dbd will include these files:
stagingSDPIOC_DBD += base.dbd
stagingSDPIOC_DBD += xxxSupport.dbd
stagingSDPIOC_DBD += dbSubExample.dbd
stagingSDPIOC_DBD += stagingSDPIOCHello.dbd
stagingSDPIOC_DBD += initTrace.dbd
stagingSDPIOC_DBD += calcSupport.dbd
# stagingSDPIOC_registerRecordDeviceDriver.cpp derives from stagingSDPIOC.dbd
stagingSDPIOC_SRCS += stagingSDPIOC_registerRecordDeviceDriver.cpp

# Build the main IOC entry point where needed
stagingSDPIOC_SRCS_DEFAULT += stagingSDPIOCMain.cpp
stagingSDPIOC_SRCS_vxWorks += -nil-

# Link in the code from our support library
stagingSDPIOC_LIBS += stagingSDPIOCSupport
stagingSDPIOC_LIBS += calc
# To build SNL programs, SNCSEQ must be defined
# in the <top>/configure/RELEASE file
ifneq ($(SNCSEQ),)
    # Build sncExample into stagingSDPIOCSupport
    sncExample_SNCFLAGS += +r
    stagingSDPIOC_DBD += sncExample.dbd
    # A .stt sequence program is *not* pre-processed:
    stagingSDPIOCSupport_SRCS += sncExample.stt
    stagingSDPIOCSupport_LIBS += seq pv
    stagingSDPIOC_LIBS += seq pv

    # Build sncProgram as a standalone program
    PROD_HOST += sncProgram
    sncProgram_SNCFLAGS += +m
    # A .st sequence program *is* pre-processed:
    sncProgram_SRCS += sncProgram.st
    sncProgram_LIBS += seq pv
    sncProgram_LIBS += $(EPICS_BASE_HOST_LIBS)
endif

# Finally link IOC to the EPICS Base libraries
stagingSDPIOC_LIBS += $(EPICS_BASE_IOC_LIBS)

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD EXTRA GNUMAKE RULES BELOW HERE

