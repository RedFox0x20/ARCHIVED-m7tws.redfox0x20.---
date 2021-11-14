#!/bin/sh
# Update gallery
cd /srv/www/m7tws.redfox0x20.xyz/public/wx-captures/
wget -mr ftp://radio:@192.168.1.127/NOAA/* -A jpg -nH --cut-dirs=1 -nv
cd /srv/www/m7tws.redfox0x20.xyz/public/wefax-captures/
wget -mr ftp://radio:@192.168.1.127/WEFAX/* -A png -nH --cut-dirs=1 -nv

# Update server and start production
cd /srv/www/m7tws.redfox0x20.xyz
/usr/bin/git pull
/usr/bin/yarn production