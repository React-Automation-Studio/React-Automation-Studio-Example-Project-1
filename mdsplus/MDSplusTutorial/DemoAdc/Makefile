all: libDemoAdcShr.so

clean:
	rm libDemoAdcShr.so

libDemoAdcShr.so: demoadc.c
	gcc -fPIC -shared -o libDemoAdcShr.so demoadc.c -lm
