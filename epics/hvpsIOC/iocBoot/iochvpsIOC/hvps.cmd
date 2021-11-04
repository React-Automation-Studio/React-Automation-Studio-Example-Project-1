# hvps.cmd
# For Adding Any number of PS databases to this IOC (max 4)

# Add Relevant IOC env Variables
< envPaths
dbLoadTemplate "HVPSMU15KV.substitutions"

cd "${TOP}" 

## Register all support components
dbLoadDatabase("dbd/hvpsIOC.dbd")
dbLoadDatabase "dbd/hvpsIOC.dbd"
hvpsIOC_registerRecordDeviceDriver pdbbase

# MU_PS1 will be the prefix
# Port: /dev/ttyUSB0 in all likely-hood. #TODO Use a Variable?

drvAsynSerialPortConfigure("MU_PS1","/dev/ttyUSB0")
# TODO: how fast will this be relative to shot cycle time
asynSetOption ("MU_PS1", 0, "baud", "38400")  # 38,400bps per comms spec
asynSetOption ("MU_PS1", 0, "bits", "8")
asynSetOption ("MU_PS1", 0, "parity", "none")
asynSetOption ("MU_PS1", 0, "stop", "1")
asynSetOption ("MU_PS1", 0, "clocal", "Y")
asynSetOption ("MU_PS1", 0, "crtscts", "N")


# -------- -------- -------- DEBUGGING -------- -------- -------- #

# Enable ASYN_TRACEIO_HEX on octet server
asynSetTraceIOMask("sdp0",0,4)
# Enable ASYN_TRACE_ERROR and ASYN_TRACEIO_DRIVER on octet server
# asynSetTraceMask("sdp0",0,9)
# iocInit
traceIocInit
