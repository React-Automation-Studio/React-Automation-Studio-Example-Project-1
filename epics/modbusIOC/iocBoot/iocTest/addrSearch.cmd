# sdp0.cmd

dbLoadDatabase("../../dbd/modbus.dbd")
modbus_registerRecordDeviceDriver(pdbbase)

# Use the following commands for TCP/IP
#drvAsynIPPortConfigure(const char *portName, 
#                       const char *hostInfo,
#                       unsigned int priority, 
#                       int noAutoConnect,
#                       int noProcessEos);

drvAsynIPPortConfigure("sdp0","192.168.42.2:502",0,0,1)
asynSetOption("sdp0",0, "disconnectOnReadTimeout", "Y")

#modbusInterposeConfig(const char *portName, 
#                      modbusLinkType linkType,
#                      int timeoutMsec, 
#                      int writeDelayMsec)
modbusInterposeConfig("sdp0",0,5000,0)


# NOTE: We use octal numbers for the start address and length (leading zeros)
#       to be consistent with the PLC nomenclature.  This is optional, decimal
#       numbers (no leading zero) or hex numbers can also be used.
#       In these examples we are using slave address 0 (number after "sdp0").

# -------- -------- -------- READING BITS -------- -------- -------- #

# This Works for READING PLC INPUTS on MC memory: Operator and External
drvModbusAsynConfigure("S0_READ_X",  "sdp0", 1, 1,  00000, 020, 0,  100, "SDP0:DL205")

# Testing on ECOM100
drvModbusAsynConfigure("S0_READ_V",  "sdp0", 0, 1,  00000, 020, 0,  100, "SDP0:DL205")

# for reading HEALTH Inputs
drvModbusAsynConfigure("S0_HEALTH",  "sdp0", 0, 1,  00017, 007, 0,  100, "SDP0:DL205")

# This Works for READING PLC OUTPUTS on MI memory: LEDS and ON/OFF statuses
drvModbusAsynConfigure("S0_READ_Y", "sdp0", 0, 2, 00010, 027, 0, 100, "SDP0:DL205")

# -------- -------- -------- READING 16-BIT -------- -------- -------- #

# For READING HOLDING REGISTERS as 16-bit integers (words): fc=3
drvModbusAsynConfigure("S0_READ_WX", "sdp0", 0, 3,  00000, 48, 0,  100, "SDP0:DL205")


# -------- -------- -------- WRITING BITS -------- -------- -------- #

# Writing to MC memory for Operator Control
drvModbusAsynConfigure("S0_WRITE_X",  "sdp0", 0, 5,  00000, 020, 0,  100, "SDP0:DL205")s

# -------- -------- -------- DEBUGGING -------- -------- -------- #

# Enable ASYN_TRACEIO_HEX on octet server
asynSetTraceIOMask("sdp0",0,4)
# Enable ASYN_TRACE_ERROR and ASYN_TRACEIO_DRIVER on octet server
# asynSetTraceMask("sdp0",0,9)

# Enable ASYN_TRACEIO_HEX on modbus server
# asynSetTraceIOMask("S0_Yn_In_Bit",0,4)
# Enable all debugging on modbus server
# asynSetTraceMask("S0_READ_Y",0,255)
# asynSetTraceMask("S0_READ_X",0,255)
asynSetTraceMask("S0_WRITE_X",0,255)
# asynSetTraceMask("S0_READ_WX",0,255)
# asynSetTraceMask("S0_HEALTH",0,255)



# Dump up to 512 bytes in asynTrace
# asynSetTraceIOTruncateSize("S0_READ_Y",0,512)
asynSetTraceIOTruncateSize("S0_READ_X",0,512)
asynSetTraceIOTruncateSize("S0_WRITE_X",0,512)
# asynSetTraceIOTruncateSize("S0_READ_WX",0,512)
# asynSetTraceIOTruncateSize("S0_HEALTH",0,512)


dbLoadTemplate("addrSearch.substitutions")

iocInit

