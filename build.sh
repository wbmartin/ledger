#!/bin/bash
clear
srcpath="."
./generateTemplates.pl $srcpath
outputPath="./template/_gen_"
#Post Processing
echo "replacing Tabs\n";
perl -p -i -e 's/\t/ /g' $outputPath/app.js;
#perl -p -i -e 's/\t/ /g' $outputPath/appmobile.js;
perl -p -i -e 's/\t/ /g' $outputPath/index.html;
echo "replacing EOL whitespace\n";
perl -p -i -e 's/[ \t]+$//g' $outputPath/app.js;
#perl -p -i -e 's/[ \t]+\$//g' $outputPath/appmobile.js;
perl -p -i -e 's/[ \t]+$//g' $outputPath/index.html;

echo 'replacing redundant line breaks';
perl -p -i -e 's/^\n//' $outputPath/index.html;
perl -p -i -e 's/\n\n/\n/smg' $outputPath/app.js;
#perl -p -i -e 's/\n\n/\n/g' $outputPath/appmobile.js;
echo 'removing redunant spaces in html';
perl -p -i -e 's/ +/ /g' $outputPath/index.html;
#print 'tidying the html';
#tidy -m $outputPath/index.html;
#probably want to use tidy -qe for quiet and errors.warnings only no markup changes

#print "adjusting mobile path";
#perl -p -i -e 's/images\//\.\.images\//g' $outputPath/mobile.html;
#print gjslint $outputPath/app.js;

#File Copies
cp $outputPath/index.html ./build/app/; # copy the generated index.html
cp $outputPath/app.js ./build/app/; # copy the generated app.js
#cp $outputPath/mobile.html $absoluteSrcPath/deploy/mobile/index.html; # copy the generated mobile
#cp $outputPath/appmobile.js $absoluteSrcPath/deploy/mobile/; # copy the generated mobile
#print "\n\n";

