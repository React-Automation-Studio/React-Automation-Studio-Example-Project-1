#include <mdsobjects.h>
#include <iostream>
#include <stdlib.h>
#include <stdio.h>
/*******************************************
* Evalation of a MDSplus expression.
* The expression is passed as first argument. An Optional second argument defines an
* experiment. a further optional argument defines the shot number. 
* If only one command line argument is passed no tree is open;
* If only two command arguments are passed, shot -1 (the model) is open for the passed experiment name.
* The programs prints the decompiled form of the Data object returned by the evaluation.
********************************************/

int main(int argc, char *argv[])
{
    if(argc < 2 || argc > 4)
    {
	std::cout << "Usage: native_eval_expr <expression> [experiment] [shot]" << std::endl;
	exit(0);
    }
    char *expression = argv[1];
    MDSplus::Data *evalData;
    if(argc > 2)
    {
        char *experiment = argv[2];
        int shot = -1;
        if(argc > 3)
            sscanf(argv[3], "%d", &shot);
        MDSplus::Tree *tree;
        try {
//Open the tree in a try block
            tree = new MDSplus::Tree(experiment, shot);
        } catch(MDSplus::MdsException &exc)
        {
//methode MdsException::what() return a description of the exception 
            std::cout << "Cannot open tree " << experiment  << " shot " << shot << ": " << exc.what() << std::endl;
            exit(0);
        }
        try {
//MDSplus::execute first compiles the passed striing and then evaluates the expression
//It is equivalent to:
//    MDSplus::Data *compiledData = MDSplus::compile(expression, tree);
//    evalData = compiledData->data();
//    deleteData(compiledData);
            evalData = MDSplus::execute(expression, tree);
        } catch(MDSplus::MdsException &exc)
        {
            std::cout << "Cannot evaluate " << expression  << ": " << exc.what() << std::endl;
            exit(0);
        }
// Tree object instead use C++ delete operator
        delete(tree);
    }
    else //No experiment
    {
        try {
// Here the tree argument is not passed because no reference tree is open 
            evalData = MDSplus::execute(expression);
        } catch(MDSplus::MdsException &exc)
        {
            std::cout << "Cannot evaluate " << expression  << ": " << exc.what() << std::endl;
            exit(0);
        }
    }
//evalData is the result of the expression evaluation. In order to render it, inquire it via getInfo method
//method getInfo returns information about the data object in a C like approach.

    char dataClass, dataType, nDims;  //Returned data type, class and number of dimensions
    short dataSize;		      //Returned total data size in bytes
    int *dims;                        //Returned array dimensions
    void *dataPtr;                     //Returned internal data pointe. NEVER use it!!
    evalData->getInfo(&dataClass, &dataType, &dataSize, &nDims, &dims, &dataPtr);

//Returned dataClass for evalated data will be either CLASS_S (scalar) or CLASS_A (array) 
    int nItems = 1;
    switch(dataClass) {
        case CLASS_S: //Scalar
            if(dataType == DTYPE_FLOAT || dataType == DTYPE_DOUBLE) //If the returned scalar is floating point
		std::cout << "Scalar: " << evalData->getDouble() << std::endl;
	    else if(dataType == DTYPE_T)  //If the returned type is a string
	    {
		char *retStr = evalData->getString();
		std::cout << "Scalar: " << retStr << std::endl;
		delete [] retStr;  //Deallocate returned string
	    }
	    else //The returned data is integer
		std::cout << "Scalar: " << evalData->getInt() << std::endl;
	    break;
	case CLASS_A: //array
	    std::cout << "Array ( ";
	    for(int i = 0; i < nDims; i++)
	    {
		nItems *= dims[i];
		std::cout << dims[i] << " ";
	    }
	    std::cout << ") " << std::endl;
            if(dataType == DTYPE_FLOAT || dataType == DTYPE_DOUBLE)
	    {
		double *retDoubleArr = evalData->getDoubleArray(&nItems);
	    	for(int i = 0; i < nItems; i++)
		    std::cout << retDoubleArr[i] << " ";
		delete [] retDoubleArr;  //Deallocate returned native array
	    }
	    else if (dataType == DTYPE_T) //String Array
	    {
		char **strings = evalData->getStringArray(&nItems);
		for(int i = 0; i < nItems; i++)
		{
		    std::cout << "\"" << strings[i] << "\" ";
		    delete [] strings[i];
		}
		delete [] strings; 
	    }
	    else //Integer array
	    {
		int *retIntArr = evalData->getIntArray(&nItems);
	    	for(int i = 0; i < nItems; i++)
		    std::cout << retIntArr[i] << " ";
		delete [] retIntArr;  //Deallocate returned native array
	    }
	    break;
	default:
	    std::cout << "Unexpected data class" << std::endl;
    } 	
    deleteData(evalData); //Deallocate evaluated data object
    return 0; 
}
