import sys
from MDSplus import *
if(len(sys.argv) < 2 or len(sys.argv) > 4):
    print "Usage: eval_expr_inspect <expression> [experiment] [shot]"
    sys.exit(0)
if(len(sys.argv) > 2):
    experiment = sys.argv[2]
    shot = -1
    if(len(sys.argv) > 3):
        shot = int(sys.argv[3])
    try:
        tree = Tree(experiment, shot)
    except:
	print "Cannot open tree " + experiment +" shot " + shot 
	sys.exit(0);
expression = sys.argv[1]	
try:
    evalData = Data.execute(expression);
except:
    print "Cannot evaluate expression "+ expression
    sys.exit(0)
    
if(isinstance(evalData, Scalar)):
    print "Scalar: " + evalData
else:
    if(isinstance(evalData, Array)):
        print "Array", evalData.getShape()
	if (isinstance(evalData, Float32Array) or isinstance(evalData, Float64Array)):
	    print evalData.getFloatArray()
	else:
	    if (isinstance(evalData, StringArray)):
	        print evalData.getString()
	    else:
	        print evalData.getIntArray()
