#!/bin/bash

echo "============================"
echo "Build backend trong Docker..."
echo "============================"

echo "Đang chỉnh Dockerfile backend thành Dockerfile.build"

sed -i '' 's/Dockerfile.release/Dockerfile.build/' docker-compose.yml

echo "============================"
echo "Docker Compose up..."
echo "============================"

docker-compose up --build
