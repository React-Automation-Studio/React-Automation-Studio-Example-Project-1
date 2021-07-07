#!/bin/bash

set -e

# Source the MDSplus configuration script
. ${MDS_ROOT}/setup.sh

if [[ "x$default_tree_path" == "x" ]]; then
    export default_tree_path="/trees/~t"
fi

# For Running as mdsip server: daq, analysis, client services, events etc
# mdsip -s -p $MDSIP_PORT

$@ # set -e related?
