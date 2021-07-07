#include <mdsobjects.h>
#include <iostream>
#include <stdlib.h>
#include <assert.h>
/*************************************************
* Deep copy of a pulse file. First the new pulse file is recursively created, then the 
* content recursively copied. Several facts must be handled:
* 1) Device subtrees cannot be recursively created. A device subtree must be created by 
* the corresponding device add method, therefore when detecting a device root in recursive 
* creation, the device subtree must is created by calling the addociated add method and
* recursion must be avoided for that subtree.
* 2) Expressions containing NID eferences (TreeNode instances) must be converted to the
* corresponding TreePath instances. The reason is that the node reference (nid) is a number
* which is valid only in the context of the container tree. Copying the NID as it is in the
* context of a different tree leads possibly to unconsistent node references. 
* TreePath carries the same node reference but a path name is used instead of of an
* internal node number and therefore is valid regardless the container tree instance. The
* replacement of TreeNode instances with TreePath ones is done recursively in the 
* hierarchical structure of the expression.
* 3) It may happen that sone nodes are tagged as NO_WRITE_PULSE stating that they can be
* written only in experiment models and not in any other pulse file (shot number != -1).
* In this sample program this is the only possible reason for the generation of an exception
* when writing in the copied tree. The program therefopre avoids writing when such
* exception is generated (and trapped).
* 4) If nodes referring to other linked pulse files are present, the corrsponding subtree is not copied
* 5) When copying data, segmented and non segmented nodes must be handled differently. Non segmented nodes can 
* be copied straightforwardly (after converting TeeNode instances into TeePath ones). Segmented nodes must be copied
* segment by segment. 
*************************************************/
//Recursive traversal routine prototype for creation
static void traverseTreeCreate(MDSplus::TreeNode *inRootNode, MDSplus::TreeNode *outRootNode, bool isFirst);
//Recursive traversal routine prototype for copy
static void traverseTreeCopy(MDSplus::TreeNode *inRootNode, MDSplus::TreeNode *outRootNode, MDSplus::Tree *inTree, bool isFirst);

//Recursive expression traversal routine prototype for TreeNode/TreePath replacement
MDSplus::Data *resolveNids(MDSplus::Data *inData, MDSplus::Tree *inTree);

int main(int argc, char *argv[])
{
    if(argc < 4)
    {
	std::cout << "Usage: copy_tree <in experiment> <in shot> <out experiment> [<out_shot>]" << std::endl;
	exit(0);
    }
    char *inExperiment = argv[1];
    char *outExperiment = argv[3];  
    int inShot, outShot;
    sscanf(argv[2], "%d", &inShot);
    if(argc >= 5)
        sscanf(argv[4], "%d", &outShot);
    else
	outShot = -1;
    MDSplus::Tree *inTree;
    MDSplus::Tree *outTree;
//Open input tree
    try {
	inTree = new MDSplus::Tree(inExperiment, inShot);
    } catch(MDSplus::MdsException &exc)
    {
	std::cout << "Error opening tree " << inExperiment << ": "  << exc.what() << std::endl;
	exit(0);
    }
//Open output tree in edit and overwrite mode
    try {
	outTree = new MDSplus::Tree(outExperiment, outShot, "NEW"); 
    } catch(MDSplus::MdsException &exc)
    {
	std::cout << "Error opening tree " << outExperiment << ": "  << exc.what() << std::endl;
	exit(0);
    }

//Get the top node. It is named by default "\TOP" The doulbe backslash is required because
//backslash is a special character in C
    MDSplus::TreeNode *inTopNode = inTree->getNode("\\TOP");
    MDSplus::TreeNode *outTopNode = outTree->getNode("\\TOP");

//Traverse trees for out tree creation
    traverseTreeCreate(inTopNode, outTopNode, true);
//Write and close output tree. Data copies do not require the tree open in edit mode
    outTree->write();
    delete outTopNode;
    delete outTree;
//Open the new tree in normal mode
    outTree = new MDSplus::Tree(outExperiment, outShot);
    outTopNode = outTree->getNode("\\TOP");
//traverse trees for node content copy
    traverseTreeCopy(inTopNode, outTopNode, inTree, true);
//Deallocate top nodes  and trees
    delete inTopNode;
    delete outTopNode;
    delete inTree;
    delete outTree;
    return 0;
}

//Recursive tree traversal for out tree node creation
static void traverseTreeCreate(MDSplus::TreeNode *inRootNode, MDSplus::TreeNode *outRootNode, bool isFirst)
{
    char *rootName = inRootNode->getNodeName();
//Get the usage of the current node (cwe are interesting in checking whether it is a DEVICE or SUBTREE usage
    const char *usage = inRootNode->getUsage();
 
//Firstly, check whether the current node is a device subtree root (usage == DEVICE)
    if(!strcmp(usage, "DEVICE"))
    {
//If it is a device subtree, get the contained data (Conglomerate object and deriev the device model information
//The model string is passed to TeeNode::addDevice method
	MDSplus::Data *modelData;
	try  {
	    MDSplus::Conglom *conglom = (MDSplus::Conglom *)inRootNode->getData();
	    modelData = conglom->getModel();
	    char *model = modelData->getString();
	    MDSplus::TreeNode *newNode = outRootNode->addDevice(rootName, (const char *)model);
	    deleteData(modelData);
	    deleteData(conglom);
	    delete newNode;
  	    delete []model;
	} catch(MDSplus::MdsException &exc)
	{
	    std::cout << "Error adding device " << modelData << ": " << exc.what() << std::endl;
	}
    }
    else
    {
        MDSplus::TreeNode *newNode;
//The TOP node must not be created in the target experiment model. It is created when the tree is instantiated
        if(!isFirst) 
	{
	    char fullname[14];
//Add the current node. Keep track whether the current node is a member or a child 
	    if(inRootNode->isMember())
	        sprintf(fullname, ":%s", rootName);
	    else
	        sprintf(fullname, ".%s", rootName);
	    try {
	    	newNode = outRootNode->addNode(fullname, usage);
	    } catch (MDSplus::MdsException &exc)
	    {
		std::cout << "Error adding node: " << exc.what() << std::endl;
		exit(0);
	    }
	}
	else
	    newNode = outRootNode;
//If the usage is subtree, the current node is the root of a linked tree (in separate files), which is not copied here
	if(strcmp(usage, "SUBTREE") || isFirst)  //Subtrees (except TOP)  are not traversed
	{
    	    int numDescendants;
    	    MDSplus::TreeNode **descendants = inRootNode->getDescendants(&numDescendants);
//Traverse hierarchy ans recursive call
    	    for(int i = 0; i < numDescendants; i++)
		traverseTreeCreate(descendants[i], newNode, false);
//Deallocate the array of tree nodes created by getDescendants
    	    for(int i = 0; i < numDescendants; i++)
		delete descendants[i];
    	    delete [] descendants;
	}
//The returned usage is not deleted since it is a constant string
	if(!isFirst) 
	    delete newNode;
    }
    delete []rootName;
}

//Recursive tree traversal for otyree node content copy
static void traverseTreeCopy(MDSplus::TreeNode *inRootNode, MDSplus::TreeNode *outRootNode, MDSplus::Tree *inTree, bool isFirst)
{
//Log message
    std::cout << "COPY "<< inRootNode->getPathStr() << std::endl;


    const char *usage = inRootNode->getUsage();
//Data are to be copied only if not devices (the content of a device subtree root is filled by the corresponding add method)
//or subtree root (no content, this is just a link to a separate subtree
    if(strcmp(usage, "DEVICE") && strcmp(usage, "SUBTREE")) 
    {
	int numSegments = inRootNode->getNumSegments();
//If sumSegments > -, the node contains segmented data which must be copied segment by segmenty
	if(numSegments > 0) 
	{
//For every segment, get start, end, dimension and segment data. 
	    for(int segmentIdx = 0; segmentIdx < numSegments; segmentIdx++)
	    {
		MDSplus::Data *segStart, *segEnd, *segDim;
		MDSplus::Array *segData;
		inRootNode->getSegmentLimits(segmentIdx, &segStart, &segEnd);
		segDim = inRootNode->getSegmentDim(segmentIdx);
//Since arbitrary expressions can be assigned to segemnt start, end, dim, make sure they do not contain TreeNode instances
		segStart = resolveNids(segStart, inTree);
		segEnd = resolveNids(segEnd, inTree);
		segDim = resolveNids(segDim, inTree);

		segData = inRootNode->getSegment(segmentIdx);
		char dataClass, dataType;
   		segDim->getInfo(&dataClass, &dataType);
//Check segment dimension: if the dimension is a 64 bit array, use timestamped segments. 
//In this case start and end information are not required
		if(dataClass == CLASS_A && (dataType == DTYPE_Q || dataType == DTYPE_QU))
		{
		    int nTimes;
		    uint64_t *times = segDim->getLongUnsignedArray(&nTimes);
		    outRootNode->makeTimestampedSegment(segData, (int64_t *)times);
		    delete[] times;
		}
//otherwise use normal segments
		else
		    outRootNode->makeSegment(segStart, segEnd, segDim, segData);
		deleteData(segStart);
		deleteData(segEnd);
		deleteData(segDim);
		deleteData(segData);
	    }
	}
	else if(inRootNode->getLength() > 0)
	{
//The node is not segmented and non empty, teherfore it contains a single expression
	    MDSplus::Data *data = inRootNode->getData();
//Make sure no TreeNode instances are contained in the expressions
	    MDSplus::Data *convData = resolveNids(data, inTree);
	    try {
	    	outRootNode->putData(convData);
	    }
	    catch(MDSplus::MdsException &exc)
	    {
//This exception shpuld be generated onbly or those datawith are tagged as NO_WRITE_PULSE
		std::cout << "Warning: node not written to out shot: " << exc.what() << std::endl;
	    }	
	    deleteData(convData);
	}
    }
    if(strcmp(usage, "SUBTREE") || isFirst) 
//The tree recursively traversed if the current node root is not a subtree (except TOP, which is always tagged as a subtree)
    {
    	int numInDescendants, numOutDescendants;
//Get current input and output node descendants
    	MDSplus::TreeNode **inDescendants = inRootNode->getDescendants(&numInDescendants);
    	MDSplus::TreeNode **outDescendants = outRootNode->getDescendants(&numOutDescendants);
	assert(numInDescendants == numOutDescendants);
//Traverse hierarchy
    	for(int i = 0; i < numInDescendants; i++)
	    traverseTreeCopy(inDescendants[i], outDescendants[i], inTree, false);
//Deallocate the returned array of tree nodes
    	for(int i = 0; i < numInDescendants; i++)
	{
	    delete inDescendants[i];
	    delete outDescendants[i];
	}
    	delete [] inDescendants;
    	delete [] outDescendants;
    }
}

//Recursive expression hierarchy traversal for TeeNode/TreePath replacement
MDSplus::Data *resolveNids(MDSplus::Data *inData, MDSplus::Tree *inTree)
{
    char dataClass, dataType;
    if(!inData) return NULL;
    inData->getInfo(&dataClass, &dataType);
//For TreeNode instances dataClass == CLASS_S and dataType == DTYPE_NID 
    if((unsigned char)dataClass == CLASS_S && (unsigned char)dataType == DTYPE_NID)
    {
//Replace TreeNode instance with equivalent TreePath instance, by retrieving the full path of the node
	char *path = ((MDSplus::TreeNode *)inData)->getFullPath();
	MDSplus::Data *retData = new MDSplus::TreePath((const char *)path, inTree);
	delete [] path;
	deleteData(inData);
	return retData;
    }
//Recursive trabersal is required only for two data sperclasses CLASS_R (superclass CompoundData of every non atomic expressions)....
    else if((unsigned char)dataClass == CLASS_R)
    {
	MDSplus::Compound *compoundData = (MDSplus::Compound *)inData;
	for(int i = 0; i < compoundData->getNumDescs(); i++)
	{
	    compoundData->assignDescAt(resolveNids(compoundData->getDescAt(i), inTree), i);
	}
    }
// ... and for superclass CLASS_APD (superclass ApdData used for lists and dictionaries
    else if((unsigned char)dataClass == CLASS_APD)
    {
	MDSplus::Compound *compoundData = (MDSplus::Compound *)inData;
	for(int i = 0; i < compoundData->getNumDescs(); i++)
	{
	    compoundData->assignDescAt(resolveNids(compoundData->getDescAt(i), inTree), i);
	}
    } 
    return inData;
}
