#!/bin/bash
rm -rf deploy/*
cp build/app/index.html deploy
mkdir deploy/cgi-bin
mkdir deploy/images
cp build/app/cgi-bin/server.pl deploy/cgi-bin/
cp build/app/cgi-bin/UTL.pm deploy/cgi-bin/
cp build/app/images/* deploy/images/


perl -i -pe 'BEGIN{undef $/;} s/<\!--BUILDONLY_BEGIN.*END-->/<script type="text\/javascript" src="app-compiled.js"><\/script>/smg' deploy/index.html
build/closure-library/closure/bin/build/closurebuilder.py \
  --root=build/closure-library/ \
  --root=build/app/ \
  --namespace="app" \
  --output_mode=compiled \
  --compiler_jar=/home/wbmartin/dev/closurecompiler/compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  --compiler_flags="--debug" \
  --compiler_flags="--formatting=pretty_print" \
  --compiler_flags="--warning_level=verbose" \
  > deploy/app-compiled.js
