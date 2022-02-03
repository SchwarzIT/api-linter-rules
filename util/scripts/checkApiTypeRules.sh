#!/bin/bash

includesRules() {
  # Checking that all rulenames of the first file are included in the rulesnames of the second one
  yq eval-all -e 'select(fileIndex == 0) .rules as $a | select(fileIndex == 1) .rules as $b | $b | keys | contains($a | keys)' $2 $1 > /dev/null 2>&1

  if [[ $? -ne 0 ]] ; then
      echo "Error: $1 does not overwrite all rules of $2, it should at leas specify the severiy level of each rule"
      echo "The following paths are not overwritten inside $1:"
      # Showing all the rulenames in the second file, that are not overwritten by the first file
      yq eval-all -e 'select(fileIndex == 0) .rules as $a | select(fileIndex == 1) .rules as $b | $a | keys - ($b | keys)' $2 $1
      exit 1
  fi
}

includesRules spectral-api.yml spectral.yml
includesRules spectral-bff.yml spectral.yml
includesRules spectral-legacy.yml spectral.yml