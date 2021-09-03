#!/bin/bash
while true; do
 pm2 stop m7tws
 cd /srv/www/m7tws.redfox0x20.xyz/public/wx-captures/
 wget -mr ftp://radio:@192.168.1.127/* -A jpg -nH --cut-dirs=
 pm2 start m7tws
 sleep 15m
done