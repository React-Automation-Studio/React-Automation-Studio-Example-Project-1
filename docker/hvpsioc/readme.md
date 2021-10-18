# For Remote Control and Feedback of the -15kV High Voltage Powersupply
## Particulars

- Supplies a NEGATIVE potential of -15kV
- Setting the Voltage has precision of 1 decimal place
- Setting MV/mA value is multiplied by 10 anc converted to Hex
  - eg. 15kv --> 1500 --> 0x05C
  - eg. 600ma --> 600 --> 0x0258
- 


## Communications

Uses 13 Bytes to communicate back and forth between Controller and the PS.

0. Address
1. Command
2. Command
3. Data
4. Data
5. Data
6. Data
7. Data
8. Data
9. Checksum
10. Checksum
11. EndCHaracter
12. EndCharacter 

### Protocol

RS485 Serial Communicationss

baudrate:       38400 bps
checksum:       yes
databits:       8
Parity:         None
Stop Bits:      1

### Command Structure

- Address:        1-byte: `0xA1` 
- Instruction:    2-byte
- Data:           6-byte
- Checksum:       2-byte
- EndCharacter:   2-byte: `0x0D00`

Checksum confirms the command and data message are all characters

Once all bits are converted to binary and accumulated, then a HEX value is returned. Here's an example

Eg. 
- instruction:    7000
- as binary:      "0111"+"0000"+"0000"+"0000"
- as hex:         0x03
- checksum:       3

The Accumulation is literally the addition of each bit as integers

### Instruction List

- 6100 (out) Sets HV Pin High
- 610A (in)  Confirms HV Pin High
- 6200 (out) Sets HV Pin Low
- 620A (in)  Confirms HV Pin Low
- 6300 (out) Requests PS parameters
- 630A (in)  Reponse of PS paramters

### Instruction Details

#### HV Pin On

1. Address: 0xA1 
2. Command1: 0x61
3. Command2: 0x00
4. Spare Area: 0x00


#### **Pin On Confirm**

This returns Data

**Byte 3 and 4**

- Spare Area: Not Used

**Bytes 5 and 6**

- Should return the HV Value  x100 so need a calc record

**Bytes 7 and 8**

- Should return mV Value x1

#### **Pin Off and Pin Off Confirm**

Have the same structure. #TODO Confirm that the message is null


### Parameter Request

No content, just the command and null values. No Checksum?

#### Parameters Response

The Paramters beging at byte index 3 (0-index) and ends with 8. 

3. Status/State
4. Status/State
5. Real Voltage
6. Real Voltage
7. Real Current
8. Real Current
   
The Status/State Data breaks down as follows:
It appears to be Bigendian

From Most significant bit to least

**Byte 3**
- POWER
- HV On
- CONST HV
- CONST Power
- Over Voltage
- Inv Over Current
- Inv Over Temperature

**Byte 4**
- HV Over Temp
- Spark
- AC Fault
- Emergency
- Interlock
- 485/PLC
- Unused
- Unused

## EPICS and Control

### Flows

#### Setting HV Pin Values

1. Power the device on with power switch, if not already on.
2. Confirm that the HV pin is LOW and report to EPICS
3. If ready to proceed with charging, set Pin On and Values
   1. Operator Chooses Setpoints
      1. from list
      2. manually enter
   2. Send message to device: what message?
   3. Request Confirmation
   4. Display confirmation results
   
#### Updating HV Status/Values

1. Request HV Parameters at regular intervals
2. Receive the response values
   1. Plot these in display

#### Setting HV Pin Off

1. Check that HV Pin is On with `0x610A` command
   1. If passes then send instruction to turn pin off with `0x6200`
   2. Confirm off with `0x6210A`
2. Report Parameters as 0 (?)

### Support: Modules, Drivers Etc

The communication is Serial so I assume `Async` will have the support needed. Perhaps `StreamDevice`. 

#### **StreamDevice**

[*Prerequisites*](https://paulscherrerinstitute.github.io/StreamDevice/setup.html#pre):

- `ASYN` listed in `configure/RELEASE` in the *<top>* directory
- `CALC` record also needed from `synApps` also in the *<top>* directory
  
Presently, we have:

- `CALC=$(SUPPORT)/calc-R3-7-1`
- `ASYN=$(SUPPORT)/asyn-R4-33`
- `STREAM=$(SUPPORT)/stream-R2-7-7c`

#### **Startup**

`STREAM_PROTOCOL_PATH` controls where StreamDevice looks for the protocol path

## Questions for EPICS TechTalk

1. What is the difference between defining
   PROD_LIB or mysoftIOC_LIB?

2. Use Cases for `PCRE` (`PROD_LIBS += pcre`)