#!/bin/bash

# proxy
cd ~/HTTPS-proxy
sudo pm2 start --name proxy "npm start"

# target server
# cd ~/fesp02-nextlevel
# pm2 start --name next-level "npm start"