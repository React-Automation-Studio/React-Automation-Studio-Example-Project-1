# %%
import serial
# import serial.rs485
from serial.serialutil import to_bytes


def to_hex(value: int, size=4):
    return "{0:#0{1}x}".format(value, size).encode("ascii")


def akum(value):
    return sum([int(i) for i in bin(value)[2:]])


def ps_checksum(data):
    return sum([akum(_) for _ in data[:9]])


def parse_params_response(res):
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
        'NA1',
        'NA2'
    ]
    tmp = [x for x in res]
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

    status_dict = {0: dict(zip(status0_lables, [int(i) for i in bin(status[0])[2:]])),
                   1: dict(zip(status1_labels, [int(i) for i in bin(status[1])[2:]]))}
    return status_dict[0], status_dict[1], V, I, checksum

# %%


# Setting some commands and serial settings
params_list = [
    0xA1,
    0x63, 0x00,
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x07,
    0x00, 0x0D
]

req_params = serial.to_bytes(params_list)

res_req_params_good = params_list[:]
res_req_params_good[2] = 0x0A
# res_req_params_cs = sum([akum(_) for _ in params_list][:9])
res_req_params_cs = ps_checksum(req_params)
res_req_params_good[10] = res_req_params_cs
# print(res_req_params_good)
res_req_params_good = to_bytes(res_req_params_good)
# print(res_req_params_good)


# Set HV Pin: charge: 1.1kV and 101mA
power_on_test = [
    0xA1,
    0x61, 0x00,  # co mmand
    0x00, 0x00,  # Header
    0x03, 0x84,  # Set Voltage 2kV 0xc8
    0x00, 0x64,  # Set Current 100mA
    0x00, 0x00,  # Checksum computed before sending
    0x00, 0x0D,  # EOM
]

chksum_po = map(bin, power_on_test[:9])
power_on_test[10] = ps_checksum(power_on_test)
power_on_test_params = serial.to_bytes(power_on_test)
# print(power_on_test)

# Good response to check against
p_on_test_good = power_on_test[:]
p_on_test_good[2] = 0x0A
p_on_test_good = serial.to_bytes(p_on_test_good)
# print("p on test good resp", p_on_test_good)
assert(len(power_on_test) == 13)

# Turn HV pin off values
p_off_test_list = [
    0xA1,
    0x62, 0x00,
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x0D
]
p_off_test_cs = ps_checksum(p_off_test_list)
p_off_test_list[10] = p_off_test_cs
# print("p off test", p_off_test_list)
p_off_test_params = serial.to_bytes(p_off_test_list)
# print(p_off_test_cs)

# Good HV pin off value
p_off_test_good = p_off_test_list[:]
p_off_test_good[2] = 0x0A
# p_off_test_good_cs = sum([akum(_) for _ in p_off_test_params][:9])
p_off_test_good_cs = ps_checksum(p_off_test_params)
p_off_test_good[10] = p_off_test_good_cs
# print("good resp p off test", p_off_test_good)
p_off_test_good = serial.to_bytes(p_off_test_good)

port = "/dev/ttyUSB0"

settings = {
    "port": "/dev/ttyUSB0",
    "baudrate": 38400,
    "parity": serial.PARITY_NONE,
    "stopbits": serial.STOPBITS_ONE,
    "bytesize": serial.EIGHTBITS,
    "timeout": 1,
}


# Opening serial connection
print("Opening serial connection on port: {}".format(port))

ser = serial.Serial(**settings)
print("The Serial Port on {} is open {}".format(port, ser.is_open))

# %%
# Get Params first
print("Test Getting System Parameters on Startup")
ser.write(bytearray(params_list))
res_req_params = ser.read_until(b'\r')
assert(len(res_req_params) == 13)
print("Reading {} bytes from Supply".format(len(params_list)))
# res_req_params = ser.read_until(b'\r')
print("Response Length", len(res_req_params))
assert(len(res_req_params) == 13)

parse_params_response(res_req_params)
# %%
print("Testing Power On:")
print("setting HV pin on with 2kV and 101mA")
ser.write(bytearray(power_on_test_params))
res_p_on_test = ser.read_until(b'\r')
print(res_p_on_test)

print("Get Parameters after Power On test")
ser.write(bytearray(params_list))
print("Reading {} bytes from Supply".format(len(params_list)))
res_req_params_test_p_on = ser.read_until(b'\r')
parse_params_response(res_req_params_test_p_on)
# P On Test Done

# %%
print("Testing Power Off")
ser.write(p_off_test_params)
res_p_off_test = ser.read_until(b'\r')
print(res_p_off_test)

print("Get Params for power off test")
ser.write(bytearray(params_list))
print("Reading {} bytes from Supply".format(len(params_list)))
res_req_params_test_off = ser.read_until(b'\r')
parse_params_response(res_req_params_test_off)

# %%
ser.close()
print("The Serial Port on {} is open {}".format(port, ser.is_open))

# %%
