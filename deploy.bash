#!/usr/bin bash

#User credential
LOGIN="ee426414"
HOST="ee426414.ftp.tools"
PASS="Kolobok@11"
PORT=22
ADDRESS="https://svet-agropromgroup.online/"

PROJECT_DIRECTORY="svet-agropromgroup.online"
BUILD_DIRECTORY="dist"

#Build
npm run build

#sshpass -p $PASS 
ssh -t $LOGIN@$HOST -p $PORT << OEF
    #Remove previous build
    rm -rf ~/$PROJECT_DIRECTORY/www/*
    echo "Previous build was removed"
OEF

#Upload build
#sshpass -p $PASS  
rsync -a --progress -rp ./$BUILD_DIRECTORY/* $LOGIN@$HOST:~/$PROJECT_DIRECTORY/www
echo $ADDRESS