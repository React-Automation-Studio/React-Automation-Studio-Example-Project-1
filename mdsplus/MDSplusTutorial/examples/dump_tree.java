class dump_tree
{
    public static void main(String args[])
    {
    	if(args.length < 1 || args.length > 3)
    	{
	    System.out.println("Usage: dump_tree <experiment> [shot]");
	    System.exit(0);
    	}
    	String experiment = args[0];
    	int shot = -1;
    	if(args.length > 1)
	    shot = Integer.parseInt(args[1]);

    	MDSplus.Tree tree = null;
    	try {
	    tree = new MDSplus.Tree(experiment, shot);
    	} catch(MDSplus.MdsException exc)
    	{
	    System.out.println("Error opening tree " + experiment + ": "  + exc);
	    System.exit(0);
    	}
//Get the top node. It is named by default "\TOP"
	try {
	    MDSplus.TreeNode topNode = tree.getNode("\\TOP");
	    traverseTree(topNode, 0);
	}catch(MDSplus.MdsException exc)
	{
	    System.out.println("annot traverse tree: " + exc);
	}
    }

//Recursive tree traversal
    static void traverseTree(MDSplus.TreeNode rootNode, int tabs) throws MDSplus.MdsException
    {
    //Print the root name, get the list of the descendats and recurse on them
    //getNodeName() returns a C string which must be dealloaed afterwards
    	String rootName = rootNode.getNodeName();
    	for(int i = 0; i < tabs; i++)
	    System.out.print("\t");
    	System.out.println(rootName);

    	MDSplus.TreeNodeArray descendants = rootNode.getDescendants();
    //Traverse hierarchy
    	for(int i = 0; i < descendants.size(); i++)
	    traverseTree(descendants.getElementAt(i), tabs + 1);
    }
}

    

    
