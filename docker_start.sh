#!/bin/bash
cp -R -u -p /src/app/config/global_dist.js /config/config.js
ln -s /config/config.js /src/app/config/global.js
cd /src
npm start
