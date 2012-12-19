#!/usr/bin/bash
mkdir db
mkdir lib
mkdir template
mkdir template/_gen_
mkdir tempate/_template_
mkdir template/_template_/xHeader/
mkdir build
mkdir deploy
echo You Need to copy into template:  1.DBGen_Util.pm 2.generateTemplates.pl 3.include.properties
echo "you need to adjust grants on symlink, but this will adjust the target dir: sudo chown www-data *; sudo chgrp www-data *;sudo chmod 644 *"
svn checkout http://closure-library.googlecode.com/svn/trunk/ build/closure-library
sudo ln -s /home/wbmartin/www/ledger/build /var/www/ledger-build
sudo ln -s /home/wbmartin/www/ledger /var/www/ledger
echo "closure-library/" > build/.gitignore



