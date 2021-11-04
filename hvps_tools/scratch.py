# %%
# Configure some values to use to create messages for the pS

# Compute some set points for voltage
import math
from sys import _current_frames
import serial
from serial import Serial
from abc import ABC

from hvps_tools import akum


def hex_string(value: int, size=6):
    """Returns a 0-padded scring of length string """
    return "{0:#0{1}x}".format(value, size).upper()


def hexify(value: int):
    """Takes a 16-bit integer and returns two 8-bit hex integers"""
    if value <= 2 ** 16:
        try:
            result = ((value >> 8) & 0xFF, value & 0xFF)
            return result
        except Exception:
            print("An error occured.")


# %%


class HVPSSerial:

    def __init__(self, ser):
        self.ser = ser

        self.message = None

    def worker(self):
        pass


class PSMessage:
    """Message Class for the 15kV Powersupply"""

    def __init__(
            self,
            command="setHVOff",
            header=(0x00, 0x00),
            V=0,
            I=0,
    ):

        # set points
        self.setpoints = {
            "V": {V: hexify(V * 100) for V in range(1, 16)},  # Kilovolts
            "I": {I: hexify(I) for I in range(100, 700, 100)}  # Milliamps
        }
        self.voltages = self.setpoints["V"]
        self.currents = self.setpoints["I"]

        # Command strings
        self.commands = {
            "setHVOn": (0x61, 0x00),
            "setHVOff": (0x62, 0x00),
            "getParams": (0x63, 0x00),
        }

        self.responses = {
            "confirmHVOn": (0x61, 0x0A),
            "confirmHvOff": (0x62, 0x0A),
            "readParams": (0x63, 0x0A),
        }

        if command not in self.commands:
            raise ValueError

        if V > 0 and V not in self.voltages:
            raise KeyError(
                "Key {} not in Voltage setpoints. Must be from 1 kV to 15 kV in ".format(voltage))
        if V == 0:
            try:
                self.voltage = (0x00, 0x00)
            except Exception:
                print(Exception)
        else:
            self.voltage = self.voltages[V]

        if I > 0 and I not in self.currents:
            raise KeyError(
                "Key {} not in Voltage setpoints. Must be from 1 kV to 15 kV in ".format(current))
        if I == 0:
            try:
                self.current = (0x00, 0x00)
            except Exception:
                print(Exception)
        else:
            self.current = self.currents[I]

        # Build the message
        self.address = (0xA1,)
        self.command = self.commands[command]
        self.header = header

        self.checksum = (0x00, 0x00)
        self.eom = (0x00, 0x0D)  # End of message

    def get_checksum(self, message):
        """computes a checksum for the message sent as the device expects a properly
        configured message including an accumulation of the bits in the binary
        representation of the first 9 bytes"""
        chksum = 0
        for tup in message[1:9]:
            chksum += sum([akum(b) for b in tup])
        return hexify(chksum)

    def build_message(
        self,
    ):
        self.message = [
            self.address,
            self.command,
            self.header,
            self.voltage,
            self.current,
            self.checksum,
            self.eom,
        ]
        self.checksum = self.get_checksum(self.message)
        self.message[5] = self.checksum
        tmp = []
        for tup in self.message:
            for _ in tup:
                tmp.append(_)
        self.message = tmp
        del tmp
        return bytearray(self.message)

# %%


def parse_params(res):
    try:
        len(res) >= 13
    except ValueError:
        print(
            "The Response is too short. Expected 13 bytes. Received {}".format(len(res)))

    status_functions = [
        'power',
        'hv_on',
        'const_hv',
        'const_ma',
        'const_pow',
        'over_volt',
        'inv_over_cur',
        'inv_over_temp'
    ]
    status_device = [
        'hv_over_temp',
        'spark',
        'ac_fault',
        'emergency',
        'interlock',
        '485/plc',
        'NA0',
        'NA1'
    ]
    # Convert Bytes in response to a list of integers
    tmp = [b for b in res]

    address = tmp[0]
    print("address", address)
    command = tmp[1], tmp[2]
    print("command", command)
    status = tmp[3], tmp[4]
    print("status", status)
    V = tmp[5], tmp[6]
    print("voltage", V)
    I = tmp[7], tmp[8]
    print("current", I)
    checksum = tmp[9], tmp[10]
    print("checksum", checksum)
    eom = tmp[11], tmp[12]
    print("EOM", eom)

    status_dict = {0: dict(zip(status_functions, [int(i) for i in bin(status[0])[2:]])),
                   1: dict(zip(status_device, [int(i) for i in bin(status[1])[2:]]))}
    return status_dict[0], status_dict[1], V, I, checksum


# %%
msg_15_600 = PSMessage("setHVOn", V=15, I=600).build_message()
msg_15_600
# %%
msg_1_10 = PSMessage("setHVOn", V=10, I=10).build_message()
msg_1_10
# %%
msg_setOff = PSMessage("setHVOff").build_message()
msg_setOff

# %%
msg_get_params = PSMessage("getParams").build_message()
msg_get_params

# %%


# %%
# Serial Connection settings
# TODO Method for finding the port
# TODO

# settings = {
#     "port": "/dev/ttyUSB0",
#     "baudrate": 4800,
#     "parity": serial.PARITY_NONE,
#     "stopbits": serial.STOPBITS_ONE,
#     "bytesize": serial.EIGHTBITS,
#     "timeout": 0,


# }

# %%
# mu_ps_ser = HVPSSerial(*settings)
# Default message setting the voltage to 0. Probably not what we want.
# message = Message().build_message()


# class Device:
#     def __init__(self, ser):
#         self.ser = ser
#         self.response = None

#     def get_params(self, message):
#         self.ser.write(message)
#         response_len = 13
#         self.response = self.ser.read(response_len)
#         eom = serial.to_bytes([0x00, 0x0D])


# # Interface

# settings = settings = {
#     "port": "/dev/ttyUSB0",
#     "baudrate": 4800,  # or is it 38400?
#     "parity": serial.PARITY_NONE,
#     "stopbits": serial.STOPBITS_ONE,
#     "bytesize": serial.EIGHTBITS,
#     "timeout": 0,
# }

# ser = Serial(**settings)
# %%
