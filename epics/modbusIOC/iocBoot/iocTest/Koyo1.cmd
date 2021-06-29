# Koyo1.cmd

dbLoadDatabase("../../dbd/modbus.dbd")
modbus_registerRecordDeviceDriver(pdbbase)

# Use the following commands for TCP/IP
#drvAsynIPPortConfigure(const char *portName, 
#                       const char *hostInfo,
#                       unsigned int priority, 
#                       int noAutoConnect,
#                       int noProcessEos);

drvAsynIPPortConfigure("Koyo1","192.168.42.2:502",0,0,1)
asynSetOption("Koyo1",0, "disconnectOnReadTimeout", "Y")

#modbusInterposeConfig(const char *portName, 
#                      modbusLinkType linkType,
#                      int timeoutMsec, 
#                      int writeDelayMsec)
modbusInterposeConfig("Koyo1",0,5000,0)


# NOTE: We use octal numbers for the start address and length (leading zeros)
#       to be consistent with the PLC nomenclature.  This is optional, decimal
#       numbers (no leading zero) or hex numbers can also be used.
#       In these examples we are using slave address 0 (number after "Koyo1").

# The DL205 has bit access to the Xn inputs at Modbus offset 4000 (octal)
# Read 32 bits (X0-X37).  Function code=2.
# drvModbusAsynConfigure("K1_Xn_Bit",      "Koyo1", 0, 2, 04032, 040, 0,  100, "Koyo")
drvModbusAsynConfigure("K1_Xn_Bit",      "Koyo1", 0, 2, 04000, 040, 0,  100, "Koyo")

# Exp Write op
drvModbusAsynConfigure("S0_READ_WX", "Koyo1", 0, 4,  00000, 48, 0,  100, "Koyo")

# The DL205 has word access to the Xn inputs at Modbus offset 40400 (octal)
# Read 8 words (128 bits).  Function code=3.
drvModbusAsynConfigure("K1_Xn_Word",     "Koyo1", 0, 3, 040400, 010, 0,  100, "Koyo")

# Reading Holding Registers for V memory - word access 
drvModbusAsynConfigure("K1_Vn_Word",     "Koyo1", 0, 3, 040400, 010, 0,  100, "Koyo")

# The DL205 has bit access to the Yn outputs at Modbus offset 4000 (octal)
# Read 32 bits (Y0-Y37).  Function code=1.
drvModbusAsynConfigure("K1_Yn_In_Bit",   "Koyo1", 0, 1, 04000, 040, 0,  100, "Koyo")

# The DL205 has bit access to the Yn outputs at Modbus offset 4000 (octal)
# Write 32 bits (Y0-Y37).  Function code=5.
drvModbusAsynConfigure("K1_Yn_Out_Bit",  "Koyo1", 0, 5,  04000, 040,    0,  1, "Koyo")

# The DL205 has word access to the Yn outputs at Modbus offset 40500 (octal)
# Read 8 words (128 bits).  Function code=3.
drvModbusAsynConfigure("K1_Yn_In_Word",  "Koyo1", 0, 3, 040500, 010,    0,  100, "Koyo")

# Write 8 words (128 bits).  Function code=6.
drvModbusAsynConfigure("K1_Yn_Out_Word", "Koyo1", 0, 6, 040500, 010,    0,  100, "Koyo")

# The DL205 has bit access to the Cn bits at Modbus offset 6000 (octal)
# Access 256 bits (C0-C377) as inputs.  Function code=1.
drvModbusAsynConfigure("K1_Cn_In_Bit",   "Koyo1", 0, 1,  06000, 0400,   0,  100, "Koyo")

# Access the same 256 bits (C0-C377) as outputs.  Function code=5.
drvModbusAsynConfigure("K1_Cn_Out_Bit",  "Koyo1", 0, 5,  06000, 0400,   0,  1,  "Koyo")

# Access the same 256 bits (C0-C377) as array outputs.  Function code=15.
drvModbusAsynConfigure("K1_Cn_Out_Bit_Array",  "Koyo1", 0, 15,  06000, 0400,   0,   1, "Koyo")

# The DL205 has word access to the Cn bits at Modbus offset 40600 (octal)
# We use the first 16 words (C0-C377) as inputs (256 bits).  Function code=3.
drvModbusAsynConfigure("K1_Cn_In_Word",  "Koyo1", 0, 3, 040600, 020,    0,  100, "Koyo")

# We access the same 16 words (C0-C377) as outputs (256 bits). Function code=6.
drvModbusAsynConfigure("K1_Cn_Out_Word", "Koyo1", 0, 6, 040600, 020,    0,  1,  "Koyo")

# We access the same 16 words (C0-C377) as array outputs (256 bits). Function code=16.
drvModbusAsynConfigure("K1_Cn_Out_Word_Array", "Koyo1", 0, 16, 040600, 020,    0,   1, "Koyo")

# -------- SDP Related Checks -------- # 
#
# NB:0-th index of PLC memory seems inaccessible
#
# -------- --------  -------- -------- # 

# -------- -------- -------- READING BITS -------- -------- -------- #

# This Works for READING PLC INPUTS on MC memory: Operator and External
# drvModbusAsynConfigure("K1_MCn_Bit",  "Koyo1", 0, 1,  00000, 010, 0,  100, "Koyo")


# This Works for READING PLC OUTPUTS on MI memory: LEDS and ON/OFF statuses
# drvModbusAsynConfigure("K1_MIn_Bit", "Koyo1", 0, 2, 00000, 010, 0, 100, "Koyo")

# -------- -------- -------- READING 16-BIT -------- -------- -------- #
# For READING HOLDING REGISTERS as 16-bit integers (words): fc=3
# drvModbusAsynConfigure("K1_MHRn_In", "Koyo1", 0, 3,  00000, 50, 0,  100, "Koyo")


# -------- -------- -------- WRITING BITS -------- -------- -------- #
# Writing to MC memory for Operator Control
# drvModbusAsynConfigure("K1_MCo_Bit",  "Koyo1", 0, 5,  00000, 010, 0,  100, "Koyo")

# -------- -------- -------- Debugging -------- -------- -------- #

# Enable ASYN_TRACEIO_HEX on octet server
# asynSetTraceIOMask("Koyo1",0,4)
# Enable ASYN_TRACE_ERROR and ASYN_TRACEIO_DRIVER on octet server
# asynSetTraceMask("Koyo1",0,9)

# Enable ASYN_TRACEIO_HEX on modbus server
# asynSetTraceIOMask("K1_Yn_In_Bit",0,4)
# Enable all debugging on modbus server
# asynSetTraceMask("K1_Yn_In_Bit",0,255)
# asynSetTraceMask("K1_MCn_Bit",0,255)
# asynSetTraceMask("K1_MCo_Bit",0,255)
# asynSetTraceMask("K1_MHRn_In",0,255)
# asynSetTraceMask("K1_Xn_Bit",0,255)
# asynSetTraceMask("K1_Cn_In_Bit",0,255)
asynSetTraceMask("S0_READ_WX",0,255)




# Dump up to 512 bytes in asynTrace
# asynSetTraceIOTruncateSize("K1_MIn_Bit",0,512)
# asynSetTraceIOTruncateSize("K1_MCn_Bit",0,512)
# asynSetTraceIOTruncateSize("K1_MCo_Bit",0,512)
# asynSetTraceIOTruncateSize("K1_MHRn_In",0,512)

dbLoadTemplate("Koyo1.substitutions")

iocInit

