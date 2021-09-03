#!/bin/sh
cd /srv/www/m7tws.redfox0x20.xyz/public/wx-captures/
wget -mr ftp://radio:@192.168.1.127/* -A jpg -nH --cut-dirs=

cd /srv/www/m7tws.redfox0x20.xyz
/usr/bin/git pull
/usr/bin/yarn production