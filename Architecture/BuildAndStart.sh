#!/bin/bash

# 리액트 프로젝트 빌드
echo "Building React project..."
cd /home/ubuntu/testJunho/F/S10P12A105/FrontEnd
npm install
npm run build
npm start &

# 스프링부트 프로젝트 빌드
echo "Building Spring Boot project..."
cd /home/ubuntu/testJunho/B/S10P12A105/BackEnd/Chocolate
chmod +x ./gradlew
./gradlew build

echo "Build process completed."

# 리액트 앱 실행 (Nginx를 통해 제공되므로 별도 실행 필요 없음)

# 스프링부트 앱 실행
echo "Starting Spring Boot application..."
java -jar /home/ubuntu/testJunho/B/S10P12A105/BackEnd/Chocolate/build/libs/Chocolate-0.0.1-SNAPSHOT.jar &

# Nginx 실행
echo "Starting Nginx..."
sudo systemctl start nginx

echo "All applications started."
