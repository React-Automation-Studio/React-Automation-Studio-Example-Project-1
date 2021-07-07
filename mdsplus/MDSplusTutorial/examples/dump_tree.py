import sys
from MDSplus import *

def traverseTree(rootNode, tabs):
    rootName = rootNode.getNodeName()
    for i in range(0, tabs):
	print "\t",
    print rootName
    try:
        children = rootNode.getChildren()
	for c in children:
            traverseTree(c, tabs+1)
    except:
       pass 
    try:
        members = rootNode.getMembers()
	for m in members:
            traverseTree(m, tabs+1)
    except:
       pass
	
	
if(len(sys.argv) < 2 or len(sys.argv) > 3):
    print "Usage: dump_tree <experiment> [shot]"
    sys.exit(0)
experiment = sys.argv[1]
shot = -1
if(len(sys.argv) > 2):
    shot = int(sys.argv[2])
try:
    tree = Tree(experiment, shot)
except:
    print "Cannot open tree " + experiment +" shot " + shot 
    sys.exit(0);
    
topNode = tree.getNode("\\TOP")
traverseTree(topNode, 0);
