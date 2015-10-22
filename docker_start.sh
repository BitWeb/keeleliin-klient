#!/bin/bash

ls -la /config

if [ ! -f /config/config.js ]; then
    cp -R -u -p /src/app/config/global_dist.js /config/config.js
fi

if [ ! -f /src/app/config/global.js ]; then
    ln -s /config/config.js /src/app/config/global.js
fi

cd /src
forever start ./node_modules/http-server/bin/http-server -p 3001 -c-1
forever list
