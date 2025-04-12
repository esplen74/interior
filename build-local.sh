#!/bin/bash

echo "============================"
echo "Build backend local..."
echo "============================"

cd backend || exit
mvn clean package -DskipTests

cd ..

echo "============================"
echo "Docker Compose up..."
echo "============================"

docker-compose up --build
