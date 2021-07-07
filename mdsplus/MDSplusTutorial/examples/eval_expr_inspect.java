

class eval_expr_inspect
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
	{
	    System.out.println("Cannot evaluate " + expression);
	    System.exit(0);
	}

	if(evalData instanceof MDSplus.Scalar)
	    System.out.println("Scalar: "+evalData); //Use the default toString() method for scalar data 
	else if(evalData instanceof MDSplus.Array)
	{
	    try {
	    	int dims[] = evalData.getShape();
	    	    System.out.print("Array ( ");
	    	for(int i = 0; i < dims.length; i++)
		    System.out.print(dims[i] + " " );
	    	System.out.println(")");

	    	if(evalData instanceof MDSplus.Float32Array || evalData instanceof MDSplus.Float64Array)
	    	{
		    float[] data = evalData.getFloatArray();
		    for(int i = 0; i < data.length; i++)
		    	System.out.print(data[i] + " " );
	    	}
	    	else if(evalData instanceof MDSplus.StringArray)
	    	{
		    String[] data = evalData.getStringArray();
		    for(int i = 0; i < data.length; i++)
		    	System.out.print("\""+data[i] + "\" " );
	    	}
	    	else //Integer
	    	{
		    int[] data = evalData.getIntArray();
		    for(int i = 0; i < data.length; i++)
		    	System.out.print(data[i] + " " );
	    	}
	    }catch(MDSplus.MdsException exc) { System.out.println("Cannot display evaluated data: " + exc);}
	}
	else
	    System.out.println("Unexpected returned data type");
    }
}

