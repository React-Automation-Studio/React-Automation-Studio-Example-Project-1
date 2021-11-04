#!../../bin/linux-x86_64/hvpsIOC

## You may have to change hvpsIOC to something else
## everywhere it appears in this file

cd "${TOP}"  # ../..
## Load record instances
dbLoadRecords "db/test.db", "device=hvpsIOC"

## Set this to see messages from mySub
#var mySubDebug 1



## Run this to trace the stages of iocInit
#traceIocInit

cd "iocBoot/iochvpsIOC"

# Point to protocol files directory search 
< hvps.cmd

## Start any sequence programs
#seq sncExample, "user=william"
