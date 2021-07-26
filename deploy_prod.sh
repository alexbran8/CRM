#!/bin/bash

# cd /root/srv/app

#build docker container
docker build -t dashboard .


# stop existing container
docker stop dashboard  && docker rm dashboard 

# delete existing container

# delete existing image

# run new image
docker run  -d -p 5005:4000  --name dashboard  dashboard 
