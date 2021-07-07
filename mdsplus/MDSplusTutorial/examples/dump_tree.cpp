#include <mdsobjects.h>
#include <iostream>
#include <stdlib.h>
/*************************************************
* Dump the tree structure of a MDSplus pulse file. The program will print 
* the name of every node in the tree aligned to highlight the tree hierarchy
*
*************************************************/
//Recursive traversal routine
static void traverseTree(MDSplus::TreeNode *rootNode, int tabs);

int main(int argc, char *argv[])
{
    if(argc < 2 || argc > 4)
    {
	std::cout << "Usage: dump_tree <experiment> [shot]" << std::endl;
	exit(0);
    }
    char *experiment = argv[1];
    int shot = -1;
    if(argc > 2)
	sscanf(argv[2], "%d", &shot);  //If no shot specified, the experiment model (shot -1) is considered

    MDSplus::Tree *tree;
    try {
	tree = new MDSplus::Tree(experiment, shot);
    } catch(MDSplus::MdsException &exc)
    {
	std::cout << "Error opening tree " << experiment << ": "  << exc.what() << std::endl;
	exit(0);
    }
//Get the top node. It is named by default "\TOP"
    MDSplus::TreeNode *topNode = tree->getNode("\\TOP");
    traverseTree(topNode, 0);
    //Deallocate topNode and tree
    delete topNode;
    delete tree;
    return 0;
}

//Recursive tree traversal
static void traverseTree(MDSplus::TreeNode *rootNode, int tabs)
{
    //Print the root name, get the list of the descendats and recurse on them
    //getNodeName() returns a C string which must be dealloaed afterwards
    char *rootName = rootNode->getNodeName();
    for(int i = 0; i < tabs; i++)
	std::cout << "\t";
    std::cout << rootName << std::endl;
    delete []rootName;
    // Get all the descendant (members + children)for this node
    int numDescendants;
    MDSplus::TreeNode **descendants = rootNode->getDescendants(&numDescendants);
    //Traverse hierarchy
    for(int i = 0; i < numDescendants; i++)
	traverseTree(descendants[i], tabs + 1);
    //Deallocate the returned array of tree nodes
    for(int i = 0; i < numDescendants; i++)
	delete descendants[i];
    delete [] descendants;
}

    

    
