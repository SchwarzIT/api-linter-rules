#!/bin/bash

# Merging all rules with the main ruleset "spectral.yml"
yq eval-all -i '. as $item ireduce ({}; . * $item )' spectral.yml rules/*.yml rules/**/*.yml

if [[ $? -ne 0 ]] ; then
    echo "Error: Unable to merge individual files into spectral.yml"
    exit 1
else
    echo "Success"
    exit 0
fi