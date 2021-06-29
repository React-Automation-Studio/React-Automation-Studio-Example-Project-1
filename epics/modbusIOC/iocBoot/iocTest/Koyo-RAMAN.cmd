drvAsynIPPortConfigure("Koyo","164.54.160.23:502",0,0,1)
asynWaitConnect("Koyo",2)
asynSetOption("Koyo",0, "disconnectOnReadTimeout", "Y")
asynSetQueueLockPortTimeout("Koyo", 1)
modbusInterposeConfig("Koyo",0,0)

# NOTE: We use octal numbers for the start address and length (leading zeros)
#       to be consistent with the PLC nomenclature.  This is optional, decimal
#       numbers (no leading zero) or hex numbers can also be used.

# The DL205 has bit access to the Xn inputs at Modbus offset 4000 (octal)
# Read 32 bits (X0-X37).  Function code=2.
drvModbusAsynConfigure("K1_Xn_Bit",      "Koyo", 0, 2,  04000, 040,    0,  100, "Koyo")

# The DL205 has bit access to the Yn outputs at Modbus offset 4000 (octal)
# Read 32 bits (Y0-Y37).  Function code=1.
drvModbusAsynConfigure("K1_Yn_In_Bit",   "Koyo", 0, 1,  04000, 040,    0,  100, "Koyo")

# The DL205 has bit access to the Cn bits at Modbus offset 6000 (octal)
# Access 256 bits (C0-C377) as inputs.  Function code=1.
drvModbusAsynConfigure("K1_Cn_In_Bit",   "Koyo", 0, 1,  06000, 0400,   0,  100, "Koyo")

# Access the same 256 bits (C0-C377) as outputs.  Function code=5.
drvModbusAsynConfigure("K1_Cn_Out_Bit",  "Koyo", 0, 5,  06000, 0400,   0,  1,  "Koyo")

# Hex trace format on TCP server
asynSetTraceIOMask("Koyo",0,4)
# Turn on asynError and asynTraceIODriver on TCP server
#asynSetTraceMask("Koyo",0,255)

dbLoadTemplate("Koyo-RAMAN.substitutions")
