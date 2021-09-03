#!/bin/bash
while true; do inotifywait -r /srv/www/m7tws.redfox0x20.xyz/public/wx-captures && pm2 stop m7tws && sleep 30s && pm2 start m7tws; done