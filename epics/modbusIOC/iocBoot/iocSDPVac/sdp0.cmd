# sdp0.cmd

dbLoadDatabase("../../dbd/modbus.dbd")
modbus_registerRecordDeviceDriver(pdbbase)

# Use the following commands for TCP/IP
#drvAsynIPPortConfigure(const char *portName, 
#                       const char *hostInfo,
#                       unsigned int priority, 
#                       int noAutoConnect,
#                       int noProcessEos);

drvAsynIPPortConfigure("sdp0","42.57.51.23:502",0,0,1)
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

# READING DLY for USER INPUTS: 32 (040) bits but need only need 20 offsets
drvModbusAsynConfigure("S0_READ_DLY",  "sdp0", 0, 1,  04000, 040, 0,  100, "SDP0:DL205")

# READING DLX for HEALTH INPUTS from Pumps and cooler: 8 Bits
# drvModbusAsynConfigure("S0_HEALTH_DLX",  "sdp0", 0, 2,  04000, 010, 0,  100, "SDP0:DL205")

# READING DLX for equipment LEDS and ON/OFF statuses: 38 bits
drvModbusAsynConfigure("S0_READ_DLX", "sdp0", 0, 2, 04000, 046, 0, 100, "SDP0:DL205") 

# -------- -------- -------- READING 16-BIT -------- -------- -------- #

# For READING DLV as HOLDING REGISTERS as 16-bit integers stored as 12bit integers (words): fc=3
drvModbusAsynConfigure("S0_READ_DLV", "sdp0", 0, 3,  00000, 48, 0,  100, "SDP0:DL205")


# -------- -------- -------- WRITING BITS -------- -------- -------- #

# WRITING DLY for USER INPUT: Actuation
drvModbusAsynConfigure("S0_FORCE_DLY",  "sdp0", 0, 5,  04000, 020, 0,  100, "SDP0:DL205")s

# -------- -------- -------- DEBUGGING -------- -------- -------- #

# Enable ASYN_TRACEIO_HEX on octet server
asynSetTraceIOMask("sdp0",0,4)
# Enable ASYN_TRACE_ERROR and ASYN_TRACEIO_DRIVER on octet server
# asynSetTraceMask("sdp0",0,9)

# Enable ASYN_TRACEIO_HEX on modbus server
# asynSetTraceIOMask("S0_Yn_In_Bit",0,4)
# Enable all debugging on modbus server
# asynSetTraceMask("S0_READ_DLY",0,255)
# asynSetTraceMask("S0_READ_DLX",0,255)
# asynSetTraceMask("S0_FORCE_DLY",0,255)
# asynSetTraceMask("S0_READ_DLV",0,255)
# asynSetTraceMask("S0_HEALTH_DLX",0,255)



# Dump up to 512 bytes in asynTrace
# asynSetTraceIOTruncateSize("S0_READ_DLY",0,512)
# asynSetTraceIOTruncateSize("S0_READ_DLX",0,512)
# asynSetTraceIOTruncateSize("S0_FORCE_DLX",0,512)
# asynSetTraceIOTruncateSize("S0_READ_DLV",0,512)
# asynSetTraceIOTruncateSize("S0_HEALTH_DLX",0,512)


dbLoadTemplate("sdp0.substitutions")
# dbLoadTemplate("")

iocInit

