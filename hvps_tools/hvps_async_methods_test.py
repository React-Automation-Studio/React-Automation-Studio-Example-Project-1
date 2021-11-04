# %%

import serial
import asyncio
from serial import Serial
from serial.serialutil import to_bytes
import serial_asyncio
import nest_asyncio
nest_asyncio.apply()
# __import__("IPython").embed()


def akum(value):
    return sum([int(i) for i in bin(value)[2:]])


params_list = [0xA1, 0x63, 0x00, 0x00, 0x00, 0x00,
               0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x0D]

req_params = serial.to_bytes(params_list)

res_req_params_good = params_list[:]
res_req_params_good[2] = 0x0A
res_req_params_cs = sum([akum(_) for _ in params_list][:9])
res_req_params_good[10] = res_req_params_cs
print(res_req_params_good)
res_req_params_good = to_bytes(res_req_params_good)
print(res_req_params_good)

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
print("p on test good resp", p_on_test_good)
assert(len(power_on_1p1kV_101mA) == 13)

# Turn HV pin off values
p_off_test_list = [0xA1, 0x62, 0x00, 0x00, 0x00,
                   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0D]
p_off_test_cs = sum([akum(_) for _ in p_off_test_list][:9])
p_off_test_list[10] = p_off_test_cs
print("p off test", p_off_test_list)
p_off_test_params = serial.to_bytes(p_off_test_list)
# print(p_off_test_cs)

# Good HV pin off value
p_off_test_good = p_off_test_list[:]
p_off_test_good[2] = 0x0A
p_off_test_good_cs = sum([akum(_) for _ in p_off_test_good][:9])
p_off_test_good[10] = p_off_test_good_cs
print("good resp p off test", p_off_test_good)
p_off_test_good = serial.to_bytes(p_off_test_good)


# p_off_test_good =


# %%
# https://tinkering.xyz/async-serial/
# Run this before starting to open two virtual serial ports for testing
# socat -d -d -v pty,rawer,echo=0,link=./reader pty,rawer,echo=0,link=./writer
# nest_asyncio.apply()

dev_reader = "/dev/ttyUSB0"
dev_writer = dev_reader  # if reader changes, writer will still be same device.
dev_baud = 4800


async def main(loop):
    reader, _ = await serial_asyncio.open_serial_connection(url='./reader', baudrate=dev_baud)
    print('Reader created')
    _, writer = await serial_asyncio.open_serial_connection(url='./writer', baudrate=dev_baud)
    print('Writer created')
    # messages = [b'foo\n', b'bar\n', b'baz\n', b'qux\n']
    # messages = [[bytes([_]) for _ in params_list]]
    # messages = [req_params]
    messages = [bytearray(params_list)]
    sent = send(writer, messages)
    received = recv(reader)
    await asyncio.wait([sent, received])


async def send(w, msgs):
    for msg in msgs:
        w.write(msg)
        # print(f'sent: {msg.decode().rstrip()}')?
        print(f"sent: {msg}")
        await asyncio.sleep(0.5)
    w.write(b'DONE\n')
    print('Done sending')


async def recv(r):
    while True:
        # msg = await r.readuntil(b'\n')
        msg = await r.readuntil(b'\r')
        if msg.rstrip().decode() == b'DONE\n':
            print('Done receiving')
            break
        print(f'received: {msg.rstrip().decode()}')
        # print(f'received: {msg}')
        # loop.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(main(loop))
# loop.stop()
loop.close()
# %%
