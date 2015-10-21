#!/bin/bash

cd /src
git pull
npm install
npm restart http-server