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
	std::cout << "Usage: eval_expr <expression> [experiment] [shot]" << std::endl;
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
            std::cout << evalData << std::endl;
        } catch(MDSplus::MdsException &exc)
        {
            std::cout << "Cannot evaluate " << expression  << ": " << exc.what() << std::endl;
            exit(0);
        }
// Data objects must be freed via routine deleteData()
        deleteData(evalData);
// Tree object instead use C++ delete operator
        delete(tree);
    }
    else //No experiment
    {
        try {
// Here the tree argument is not passed because no reference tree is open 
            evalData = MDSplus::execute(expression);
            std::cout << evalData << std::endl;
        } catch(MDSplus::MdsException &exc)
        {
            std::cout << "Cannot evaluate " << expression  << ": " << exc.what() << std::endl;
            exit(0);
        }
        deleteData(evalData);
    }
    
}
