#!/bin/bash
rm -f deploy/*.html
rm -f deploy/*.js
cp build/app/index.html deploy
perl -i -pe 'BEGIN{undef $/;} s/<\!--BUILDONLY_BEGIN.*END-->/<script type="text\/javascript" src="app-compiled.js"><\/script>/smg' deploy/index.html
build/closure-library/closure/bin/build/closurebuilder.py \
	--root=build/closure-library/ \
	--root=build/app/ \
	--namespace="app.start" \
	--output_mode=compiled \
	--compiler_jar=/home/wbmartin/dev/closurecompiler/compiler.jar \
	--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
	> deploy/app-compiled.js

#<script src="app-compiled.js"></script>
