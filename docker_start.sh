#!/bin/bash
cp -R -u -p /src/app/config/global_dist.js /config/config.js
ln -s /config/config.js /src/app/config/global.js

cd /src
forever start /src/node_modules/http-server/bin/http-server -p 3001 -c-1
forever list
