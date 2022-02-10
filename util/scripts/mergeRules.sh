#!/bin/bash

# Merging all rules with the main ruleset "spectral.yml"
# All comments are removed from this file to make the merge saver
yq eval-all -i '... comments="" | . as $item ireduce ({}; . * $item )' spectral.yml rules/**/*.yml

if [[ $? -ne 0 ]] ; then
    echo "Error: Unable to merge individual files into spectral.yml"
    exit 1
else
    echo "Success"
    exit 0
fi