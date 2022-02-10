#!/bin/bash
NL=$'\n'

function printRules() {
  for file in "$1"/*
  do
    if [ ! -d "${file}" ] ; then
      if [[ ( $file == *.yml ) || ( $file == *.yaml )]] ; then
        comment=`yq 'headComment' $file` # Extracting the head comment from the rule
        ruleName=`basename ${file%.*}` # Getting the name of the rule by removing the suffix from the file name
        echo "### $ruleName$NL" >> $2

        # If there's a head comment it gets added to the wiki
        [ ! -z "$comment" ] && echo "$comment$NL" >> $2

        # Getting the severity levels for that rule from the api types
        echo "**Severities**$NL" >> $2
        echo "- Product API Severity Level: $(yq .rules."$ruleName" spectral-api.yml)" >> $2
        echo "- BFF API Severity Level: $(yq .rules."$ruleName" spectral-bff.yml)" >> $2
        echo "- Legacy API Severity Level: $(yq .rules."$ruleName" spectral-legacy.yml)$NL" >> $2

        # Extracting the rules source code and adding it to the wiki
        sourceCode=`yq ".rules."$ruleName" | parent" "$file"`
        echo "\`\`\`yml" >> $2
        echo "$sourceCode" >> $2
        echo "\`\`\`$NL" >> $2
      fi
    fi
  done
}

function addTrailingSlash() {
  length=${#1}
  last_char=${1:length-1:1}

  [[ $last_char != "/" ]] && STR="$1/"; :

  echo $STR
}

# Iterates over every folder in the specified directory
# then creates a wiki page with its name and appends the rules to it.
for file in "$1"/*
do
  if [ -d "${file}" ] ; then
    folder=`basename ${file%}`
    # Uppercasing folder names (needed to support bash v3)
    folder="$(tr '[:lower:]' '[:upper:]' <<< ${folder:0:1})${folder:1}"
    fileName="$(addTrailingSlash $2)$folder-API-Linting-Rules.md"
    rm $fileName

    echo "Schwarz API custom rulesets depend heavily on [Spectral OAS Recommended Rules](https://meta.stoplight.io/docs/spectral/ZG9jOjExNw-open-api-rules#license-url). We consider them to be a very good starting point that we built our custom rules on top of it.$NL" >> $fileName
    echo "Below you'll find a more semantic description about the API $folder rulesets.$NL" >> $fileName
    echo "***$NL" >> $fileName
    echo "## API $folder rules$NL" >> $fileName
    printRules "${file}" $fileName $2
  fi
done