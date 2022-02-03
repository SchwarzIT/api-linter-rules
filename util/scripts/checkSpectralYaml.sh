#!/bin/bash

# ToDo: Put this in a pipeline (Two steps would be reasonable)
# Check the diff of spectral.yml and fail if HEAD != HEAD~1, because then the main file is not up to date

git diff --exit-code > /dev/null

if [[ $? -ne 0 ]] ; then
    echo "Error: The currently commited spectral.yml is not up to date and needs to be re-build"
    echo "Please run the script 'mergeRules.sh' under util/scripts/"
    exit 1
fi