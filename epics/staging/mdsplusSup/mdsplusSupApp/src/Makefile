TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS AFTER THIS LINE
#=============================

#==================================================
# build a support library

LIBRARY_IOC += mdsplusSup

# xxxRecord.h will be created from xxxRecord.dbd
#DBDINC += xxxRecord
# install mdsplusSup.dbd into <top>/dbd
DBD += mdsplusSup.dbd

# specify all source files to be compiled and added to the library
#mdsplusSup_SRCS += xxx

mdsplusSup_LIBS += $(EPICS_BASE_IOC_LIBS)

#===========================

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD RULES AFTER THIS LINE

