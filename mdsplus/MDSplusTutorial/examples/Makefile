# Note: Install MDSplus first so that $(MDSPLUS_DIR) exists.

CC=g++
#TO ENABLE DEBUG MESSAGES ADD OPTION -DDEBUG
CFLAGS=  -c -g -I$(MDSPLUS_DIR)/include
LDFLAGS = -g -L$(MDSPLUS_DIR)/lib -lMdsObjectsCppShr
JAVACFLAGS = -cp $(MDSPLUS_DIR)/java/classes/mdsobjects.jar

all:eval_expr eval_expr_inspect dump_tree copy_tree eval_expr.class eval_expr_inspect.class dump_tree.class 

eval_expr: eval_expr.o
	$(CC) $(LDFLAGS) -o eval_expr eval_expr.o

eval_expr.o: eval_expr.cpp
	$(CC) $(CFLAGS) eval_expr.cpp

eval_expr_inspect: eval_expr_inspect.o
	$(CC) $(LDFLAGS) -o eval_expr_inspect eval_expr_inspect.o

eval_expr_inspect.o:eval_expr_inspect.cpp
	$(CC) $(CFLAGS) eval_expr_inspect.cpp

dump_tree: dump_tree.o
	$(CC) $(LDFLAGS) -o dump_tree dump_tree.o

dump_tree.o: dump_tree.cpp
	$(CC) $(CFLAGS) dump_tree.cpp

copy_tree: copy_tree.o
	$(CC) $(LDFLAGS) -o copy_tree copy_tree.o

copy_tree.o: copy_tree.cpp
	$(CC) $(CFLAGS) copy_tree.cpp

eval_expr.class: eval_expr.java
	javac $(JAVACFLAGS) eval_expr.java

eval_expr_inspect.class: eval_expr_inspect.java
	javac $(JAVACFLAGS) eval_expr_inspect.java

dump_tree.class: dump_tree.java
	javac $(JAVACFLAGS) dump_tree.java


clean:
	rm -f *.o
	rm -f *.class
	rm -f eval_expr eval_expr_inspect dump_tree
