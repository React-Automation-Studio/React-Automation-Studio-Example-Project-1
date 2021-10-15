#!../../bin/linux-x86_64/stagingTestIOC

## You may have to change stagingTestIOC to something else
## everywhere it appears in this file

< envPaths
epicsEnvSet EPICS_CA_SERVER_PORT 8002
cd "${TOP}"

## Register all support components
dbLoadDatabase "dbd/stagingTestIOC.dbd"
stagingTestIOC_registerRecordDeviceDriver pdbbase

## Load record instances
dbLoadRecords "db/test.db", "device=stagingTestIOC"

## Set this to see messages from mySub
#var mySubDebug 1

## Run this to trace the stages of iocInit
#traceIocInit

cd "${TOP}/iocBoot/${IOC}"
iocInit

## Start any sequence programs
#seq sncExample, "user=william"
