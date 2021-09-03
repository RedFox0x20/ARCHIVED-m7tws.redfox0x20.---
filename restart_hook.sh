#!/bin/bash
inotifywait -r /srv/www/m7tws.redfox0x20.xyz/public/wx-captures && sleep 1m && pm2 restart m7tws