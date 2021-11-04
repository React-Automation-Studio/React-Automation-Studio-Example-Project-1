# %%
# https://tinkering.xyz/async-serial/
# Run this before starting to open two virtual serial ports for testing
# socat -d -d -v pty,rawer,echo=0,link=./reader pty,rawer,echo=0,link=./writer


import serial
import asyncio
import serial_asyncio


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
        message = res_req_params

        for b in message:
            await asyncio.sleep(0.5)
            self.transport.serial.write(bytes([b]))
            print(f'Writer sent: {bytes([b])}')
        self.transport.close()


class Reader(asyncio.Protocol):
    def connection_made(self, transport):
        """Store the serial transport and prepare to receive data.
        """
        self.transport = transport
        self.buf = bytes()
        self.msgs_recvd = 0
        print('Reader connection created')

    def data_received(self, data):
        """Store characters until a newline is received.
        """
        self.buf += data
        if b'\n' in self.buf:
            lines = self.buf.split(b'\n')
            self.buf = lines[-1]  # whatever was left over
            for line in lines[:-1]:
                print(f'Reader received: {line.decode()}')
                self.msgs_recvd += 1
        if self.msgs_recvd == 4:
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

loop = asyncio.get_event_loop()
reader = serial_asyncio.create_serial_connection(
    loop, Reader, 'reader', baudrate=115200)
writer = serial_asyncio.create_serial_connection(
    loop, Writer, 'writer', baudrate=115200)
asyncio.ensure_future(reader)
print('Reader scheduled')
asyncio.ensure_future(writer)
print('Writer scheduled')
loop.call_later(10, loop.stop)
loop.run_forever()
print('Done')
