# %%
from serial import Serial
import asyncio
import serial_asyncio
import serial


def to_hex(value: int, size=4):
    return "{0:#0{1}x}".format(value, size)


def akum(value):
    return sum([int(i) for i in bin(value)[2:]])

# %%


# params_str = "0xA1 0x63 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x07 0x00 0x0D"
# params_hex = 0xA163000000000000000007000D


params_list = [0xA1, 0x63, 0x00, 0x00, 0x00, 0x00,
               0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0D]
chksum = sum([akum(_) for _ in params_list[:9]])
params_list[10] = chksum
req_params = serial.to_bytes(params_list)
print(params_list)
print(req_params)

req_params_good = params_list[:]
status = req_params_good[3:5]
# status = [0x63, 0xA1]
status0_lables = [
    'power',
    'hv_on',
    'const_hv',
    'const_ma',
    'const_pow',
    'over_volt',
    'inv_over_cur',
    'inv_over_temp'
]
status1_labels = [
    'hv_over_temp',
    'spark',
    'ac_fault',
    'emergency',
    'interlock',
    '485/plc',
    'NA',
    'NA'
]


# %%
# Set HV Pin: charge: 1.1kV and 101mA
power_on_1p1kV_101mA = [0xA1, 0x63, 0x00, 0x00, 0x00,
                        0x00, 0x63, 0x00, 0x6E, 0x00, 0x00, 0x00, 0x0D]
chksum_po = map(bin, power_on_1p1kV_101mA[:9])
chksum = sum([akum(_) for _ in power_on_1p1kV_101mA])
power_on_1p1kV_101mA[10] = chksum
p_on_test_params = serial.to_bytes(power_on_1p1kV_101mA)
print(p_on_test_params)

# Good response to check against
p_on_test_good = power_on_1p1kV_101mA[:]
p_on_test_good[2] = 0x0A
p_on_test_good = serial.to_bytes(p_on_test_good)
print(p_on_test_good)
assert(len(power_on_1p1kV_101mA) == 13)
# %%
# Turn HV pin off values
p_off_test_list = [0xA1, 0x62, 0x00, 0x00, 0x00,
                   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0D]
p_off_test_cs = sum([akum(_) for _ in p_off_test_list][:9])
p_off_test_list[10] = p_off_test_cs
print(p_off_test_list)
p_off_test_params = serial.to_bytes(p_off_test_list)
# print(p_off_test_cs)

# Good HV pin off value
p_off_test_good = p_off_test_list[:]
p_off_test_good[2] = 0x0A
p_off_test_good_cs = sum([akum(_) for _ in p_off_test_good][:9])
p_off_test_good[10] = p_off_test_good_cs
print(p_off_test_good)
p_off_test_good = serial.to_bytes(p_off_test_good)

# %%

# analysis of params check request
# voltage = [0x00, 0x00]
# voltage = res_req_params[5:7]
# current = res_req_params[7:9]
# res_req_params_cs = res_req_params[9:11]

status_dict = {0: dict(zip(status0_lables, [int(i) for i in bin(status[0])[2:]])),
               1: dict(zip(status1_labels, [int(i) for i in bin(status[0])[2:]]))}

print(status_dict)
# real_voltage = voltage

# %%
# https://tinkering.xyz/async-serial/
# Run this before starting to open two virtual serial ports for testing
# socat -d -d -v pty,rawer,echo=0,link=./reader pty,rawer,echo=0,link=./writer


class Writer(asyncio.Protocol):

    def connection_made(self, transport):
        """Store the serial transport and schedule the task to send data.
        """
        self.transport = transport
        print('Writer connection created')
        asyncio.ensure_future(self.send())
        print('Writer.send() scheduled')

    def connection_lost(self, exc):
        print('Writer closed')

    async def send(self):
        """Send four newline-terminated messages, one byte at a time.
        Add argument for a message to be passed by argument
        """
        # message = b'foo\nbar\nbaz\nqux\n'
        message = b'\xa1c\x00\x00\x00\x00\x00\x00\x00\x00\x07\x00\r'
        # message = params_list
        await asyncio.sleep(0.5)
        self.transport.serial.write(bytearray(message))
        print(f'Writer sent: {bytearray(message)}')
        self.transport.close()


class Reader(asyncio.Protocol):
    def connection_made(self, transport):
        """Store the serial transport and prepare to receive data.
        """
        self.transport = transport
        # self.buf = bytes()
        self.buf = bytearray()
        self.msgs_recvd = 0
        print('Reader connection created')

    def data_received(self, data):
        """Store characters until a return is received.
        """
        self.buf += data
        if b'\r' in self.buf:
            lines = self.buf.split(b'\r')
            self.buf = lines[-1]  # whatever was left over
            for line in lines[:-1]:
                print(f'Reader received: {line.decode()}')
                self.msgs_recvd += 1
        if self.msgs_recvd == 13:
            self.transport.close()

    def connection_lost(self, exc):
        print('Reader closed')


# class MeasurementDevice:
#     def __init__(self, ser):
#         self.ser = ser
#         self.idn = None

#     def get_identifier(self):
#         self.ser.write(b'?IDN')
#         response_length = 10
#         self.idn = self.ser.read(response_length)


# foo = Serial('/dev//', baudrate=9600, timeout=0.5)
# my_device = MeasurementDevice(foo)


# Reader, Writer are named in the creation of the ports.
# The RS485 comes in on same port.
dev_reader = '/dev/ttyUSB0'
dev_writer = dev_reader
dev_baud = 4800

loop = asyncio.get_event_loop()
reader = serial_asyncio.create_serial_connection(
    loop, Reader, dev_reader, baudrate=dev_baud)
writer = serial_asyncio.create_serial_connection(
    loop, Writer, dev_writer, baudrate=dev_baud)
asyncio.ensure_future(reader)
print('Reader scheduled')
asyncio.ensure_future(writer)
print('Writer scheduled')
loop.call_later(10, loop.stop)
loop.run_forever()
print('Done')

# %%
