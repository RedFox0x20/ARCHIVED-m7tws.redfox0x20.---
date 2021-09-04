#!/bin/bash
# Update the Image galleries via FTP every 15 minutes
while true; do
 cd /srv/www/m7tws.redfox0x20.xyz/public/wx-captures/
    wget -mr ftp://radio:@192.168.1.127/* -A jpg -nH --cut-dirs=
    sleep 15m
done