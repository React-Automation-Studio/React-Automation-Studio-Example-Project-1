#!../../bin/linux-x86_64/hvpsIOC

## You may have to change hvpsIOC to something else
## everywhere it appears in this file

< envPaths
epicsEnvSet EPICS_CA_SERVER_PORT 8002
cd "${TOP}"  # ../..

## Register all support components
dbLoadDatabase "dbd/hvpsIOC.dbd"
hvpsIOC_registerRecordDeviceDriver pdbbase

# Point to protocol files directory search 
< hvps.cmd


## Load record instances
dbLoadRecords "db/test.db", "device=hvpsIOC"

## Set this to see messages from mySub
#var mySubDebug 1



## Run this to trace the stages of iocInit
#traceIocInit

cd "${TOP}/iocBoot/${IOC}"
iocInit

## Start any sequence programs
#seq sncExample, "user=william"
