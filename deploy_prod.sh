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

# remove unused containers
# FIXME: docker rm requires at least one argument
# docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm

# remove unused images
# docker images -q |xargs docker rmi
