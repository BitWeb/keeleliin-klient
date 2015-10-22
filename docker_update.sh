#!/bin/bash

cd /src
git pull
npm install
forever stopall
forever ./node_modules/http-server/bin/http-server -p 3001 -c-1
forever list
