# Creating a Tree in MDSplus

Using `jTraverser2` as you can do more than with the original application.


## Default Tree Path: Where to look for trees

`default_tree_path=/trees/~t` means it will look in the `/trees` directory for a tree
named `~t`, with this being a placeholder for the tree opened by MDSplus tools

## Defining `Fuse` trees

> "Recall that edit is used when the structure of the tree is going to be changed (e.g. adding or deleting nodes) requiring issuing a write command at the end. Command set tree is used to open a tree when its structure is not changed, that is when data is read and written, but nodes are neither added nor deleted."

### SDP: Source Development Platform

1. Create tree directory

`mkdir -p /trees/devices` 

2. with  `jTraverser2` and `mdstcl`, create the tree files. 

I'm going to use `mdstcl`, a command line tool.

`mdstcl`



### Defining Devices: `pydevices`

[Source](https://www.mdsplus.org/index.php?title=Documentation:Tutorial:Devices&open=1625331125204362002495&page=Tutorials%2FMDSplus+Devices)


#### Conventions

3 or more methods: Constructor, INIT, STORE 

#### How to Write good device drivers

[Source](https://www.mdsplus.org/index.php/Pydevice_dev)




### Creating Shot/Pulse Files

https://www.mdsplus.org/index.php?title=Documentation:Tutorial:CreateTrees&open=1625331125204362002495&page=Tutorials%2FTrees+%26+Data


## DATA 

### GOTCHAS

mdsplus max sample size about 2^32 since is stored as 32-bit value

### Time Base and Time Base Correction

The time base is a special function generator that provides a common reference for various analog signals that need to be related.

Correcting this eliminates or at least reduce mechanically induced instabilities in analog signals recorded on mechanical media. 

The correction is made by defining a target time base to align the signals by a frame.

