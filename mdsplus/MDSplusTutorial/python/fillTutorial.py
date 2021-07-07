from MDSplus import *
tt = Tree('rfx',37888)
t = Tree('tutorial', -1)
t.createPulse(1)
t = Tree('tutorial', 1)

for chan in range(1,17):
  n = t.getNode('calibrated:sig_'+str(chan))
  dd = Data.compile('(raw:sig_'+str(chan)+' * 10. / 4096  - parameters:offset) * parameters:gain')
  print 'Put Expression in ' + n.getPath()
  n.putData(dd)


for chan in range(1,10):
  n = t.getNode('raw:sig_'+str(chan))
  nn = tt.getNode('\\dflu_raw::cpci_2_tr10_5.channel_0'+str(chan)+':data')
  dd =  Data.compile('build_signal($1,,$2)', nn.getData().getRaw(), nn.getDimensionAt(0).data())
  n.putData(dd)

for chan in range(10,17):
  n = t.getNode('raw:sig_'+str(chan))
  nn = tt.getNode('\\dflu_raw::cpci_2_tr10_5.channel_'+str(chan)+':data')
  dd =  Data.compile('build_signal($1,,$2)', nn.getData().getRaw(), nn.getDimensionAt(0).data())
  n.putData(dd)


nn = tt.getNode('\\dstc_raw::acquisition:mcamera:camera_00:video')
n = t.getNode('camera:frames')
n.deleteData()
numSegments = nn.getNumSegments()
Tree.setActiveTree(t)
for segIdx in range(0,numSegments):
  segment = nn.getSegment(segIdx)
  shape = segment.getShape().data()
  reshapedSegment = Data.execute('set_range('+str(shape[2])+','+str(shape[1])+','+str(shape[0])+',$)',segment) 
  start = Data.compile('timing:frame_clock['+str(segIdx)+']')
  end = Data.compile('timing:frame_clock['+str(segIdx)+']')
  dim = Data.compile('[timing:frame_clock['+str(segIdx)+']]')
  n.makeSegment(start, end, dim, reshapedSegment.data())


n=t.getNode('trends:trend_1')
tr = Tree('rfx_run',20150309)
tn = tr.getNode('\\tbi01')
tnTimes = tn.getDimensionAt(0).data()
tnData = tn.data()
for i in range(0, tnTimes.size):
  print 0,i
  n.putRow(1024, Float32(tnData[i]), tnTimes[i])

n=t.getNode('trends:trend_2')
tn = tr.getNode('\\tbi02')
tnTimes = tn.getDimensionAt(0).data()
tnData = tn.data()
for i in range(0, tnTimes.size):
  print 1,i
  n.putRow(1024, Float32(tnData[i]), tnTimes[i])


n=t.getNode('trends:trend_3')
tn = tr.getNode('\\tbi03')
tnTimes = tn.getDimensionAt(0).data()
tnData = tn.data()
for i in range(0, tnTimes.size):
  print 2,i
  n.putRow(1024, Float32(tnData[i]), tnTimes[i])

n=t.getNode('trends:trend_4')
tn = tr.getNode('\\tb244')
tnTimes = tn.getDimensionAt(0).data()
tnData = tn.data()
for i in range(0, tnTimes.size):
  print 3,i
  n.putRow(1024, Float32(tnData[i]), tnTimes[i])



