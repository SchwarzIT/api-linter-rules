#!/bin/bash
NL=$'\n'

function printRules() {
  for file in "$1"/*
  do
    if [ ! -d "${file}" ] ; then
      if [[ ( $file == *.yml ) || ( $file == *.yaml )]] ; then
        comment=`yq 'headComment' $file`
        file=`basename ${file%.*}`
        echo "### $file$NL" >> $2

        [ ! -z "$comment" ] && echo "$comment$NL" >> $2

        echo "**Severities**$NL" >> $2
        echo "- Product API Severity Level: $(yq .rules.$file spectral-api.yml)" >> $2
        echo "- BFF API Severity Level: $(yq .rules.$file spectral-bff.yml)" >> $2
        echo "- Legacy API Severity Level: $(yq .rules.$file spectral-legacy.yml)$NL" >> $2
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

for file in "$1"/*
do
  if [ -d "${file}" ] ; then
    folder=`basename ${file%}`
    # Uppercasing folder names (needed to support bash v3)
    folder="$(tr '[:lower:]' '[:upper:]' <<< ${folder:0:1})${folder:1}"
    fileName="$(addTrailingSlash $2)$folder-API-Linting-Rules.md"
    rm $fileName

    echo "Schwarz API custom rulesets depend heavily on [Spectral OAS Recommended Rules](https://meta.stoplight.io/docs/spectral/ZG9jOjExNw-open-api-rules#license-url). We consider them to be a very good starting point that we built our custom rules on top of it.$NL" >> $fileName
    echo "Below you´ll find a more semantic description about the API $folder rulesets.$NL" >> $fileName
    echo "***$NL" >> $fileName
    echo "## API $folder rules$NL" >> $fileName
    printRules "${file}" $fileName $2
  fi
done