#!/bin/bash

# Checking whether there were changes to the repo. This is used after the file spectral.yml war re-built.
git diff --exit-code > /dev/null

if [[ $? -ne 0 ]] ; then
    echo "Error: The currently commited spectral.yml is not up to date and needs to be re-build"
    echo "Please run the script 'mergeRules.sh' under util/scripts/"
    exit 1
fi