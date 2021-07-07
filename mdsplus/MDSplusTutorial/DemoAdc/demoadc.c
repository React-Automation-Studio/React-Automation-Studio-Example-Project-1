/***************************************************************************
A sample library simulation a ADC driver API for the DEMOADC MDSplus device. The methods
exported by this library will be called by the python init and store method of DEMOADC
device.
*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

//initialize method - do nothing
void initialize(char *device, int clockMode, int pts){}

//acquire routine - return four channels of simulated data
void acquire(char *device, short *chan1, short *chan2, short *chan3, short *chan4)
{
    int i;
    float currVal;
// 65536 samples assumed. Signed short to represent a range between -10V (-32767) and 10V (+32767)
printf("PARTE STORE\n");

    for(i = 0; i < 65536; i++)
    {
//First channel: Noisy sine waveform (about 65 periods)
	currVal = (sin(6.28 * i/1000.) + rand()/(10. * RAND_MAX)) * 32767;
	if(currVal < -32767) currVal = -32767;
	if(currVal > 32767) currVal = 32767;
	chan1[i] = (short)currVal;

//Second channel: More noisy sine waveform (about 65 periods)
	currVal = (sin(6.28 * i/1000.) + rand()/(5. * RAND_MAX)) * 32767;
	if(currVal < -32767) currVal = -32767;
	if(currVal > 32767) currVal = 32767;
	chan2[i] = (short)currVal;

//Third channel: Noisy sine waveform (about 6 periods)
	currVal = (sin(6.28 * i/10000.) + rand()/(10. * RAND_MAX)) * 32767;
	if(currVal < -32767) currVal = -32767;
	if(currVal > 32767) currVal = 32767;
	chan3[i] = (short)currVal;

//Fourth channel: More noisy sine waveform (about 6 periods)
	currVal = (sin(6.28 * i/10000.) + rand()/(5. * RAND_MAX)) * 32767;
	if(currVal < -32767) currVal = -32767;
	if(currVal > 32767) currVal = 32767;
	chan4[i] = (short)currVal;
    }
printf("FINISCE STORE\n");
}
    

