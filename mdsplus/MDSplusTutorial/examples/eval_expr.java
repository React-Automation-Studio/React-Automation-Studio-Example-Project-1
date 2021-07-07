

class eval_expr
{
    public static void main(String []args)
    {
    	if(args.length < 1 || args.length > 3)
    	{
	    System.out.println("Usage: eval_expr <expression> [experiment] [shot]");
	    System.exit(0);
    	}
	String expression = args[0];
    	if(args.length > 1)
    	{
            String experiment = args[1];
            int shot = -1;
            if(args.length > 2)
		shot = Integer.parseInt(args[2]);

	    MDSplus.Tree tree = null;
            try {
//Open the tree in a try block
            	tree = new MDSplus.Tree(experiment, shot);
            } catch(MDSplus.MdsException exc)
            {
            	System.out.println("Cannot open tree " + experiment +" shot " + shot + ": " + exc);
            	System.exit(0);
            }
    	}
 //execute first compiles the passed striing and then evaluates the expression
//It is equivalent to:
//    MDSplus.Data compiledData = MDSplus::compile(expression);
//    evalData = compiledData.data();
	MDSplus.Data evalData = MDSplus.Data.execute(expression, new MDSplus.Data[0]); //Second argument means no argument[assed
	if(evalData == null)
	    System.out.println("Cannot evaluate " + expression);
	else
	    System.out.println(evalData);

    }
}	