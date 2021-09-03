#!/bin/bash
cd /srv/www/m7tws.redfox0x20.xyz/public/wx-captures/
while true; do wget -mr ftp://radio:@192.168.1.127/* -A jpg -nH --cut-dirs=1 && sleep 15m; done