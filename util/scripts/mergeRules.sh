#!/bin/bash

# ToDo: Put this in a pipeline (Two steps would be reasonable)
# Check the diff of spectral.yml and fail if HEAD != HEAD~1, because then the main file is not up to date

# Merging all rules with the main ruleset "spectral.yml"
yq eval-all -i '. as $item ireduce ({}; . * $item )' spectral.yml rules/**/*.yml