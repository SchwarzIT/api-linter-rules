#!/bin/bash

# Merging all rules with the main ruleset "spectral.yml"
yq eval-all -i '. as $item ireduce ({}; . * $item )' spectral.yml rules/**/*.yml