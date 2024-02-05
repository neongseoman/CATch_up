#!/bin/bash

# 이 스크립트는 특정 Git 레포지토리의 프론트엔드(FE)와 백엔드(BE) 프로젝트를 클론, 빌드 및 실행하는 과정을 자동화합니다.
# 사용법: ./start.sh [FE_branch_name] [BE_branch_name]
# FE_branch_name과 BE_branch_name은 선택적입니다. 기본값은 각각 FE_develop와 BE_develop입니다.

# 파라미터로 받은 브랜치 이름을 변수에 저장하거나 기본값 지정
FE_BRANCH=${1:-FE_develop}
BE_BRANCH=${2:-BE_develop}

echo "Starting the setup process..."

# 프론트엔드 레포지토리를 /home/ubuntu/testJunho/F 경로에서 제거 후, 지정된 브랜치를 클론합니다.
echo "Removing and cloning FE repository..."
rm -rf /home/ubuntu/testJunho/F/S10P12A105
cd /home/ubuntu/testJunho/F
git clone -b $FE_BRANCH --single-branch https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A105

# 백엔드 레포지토리를 /home/ubuntu/testJunho/B 경로에서 제거 후, 지정된 브랜치를 클론합니다.
echo "Removing and cloning BE repository..."
rm -rf /home/ubuntu/testJunho/B/S10P12A105
cd /home/ubuntu/testJunho/B
git clone -b $BE_BRANCH --single-branch https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A105

echo "Cloning completed."

# 지정된 포트에서 실행 중인 프로세스를 찾아 종료합니다. 이는 새로운 빌드를 위해 포트를 비워주기 위함입니다.
for PORT in 8080 8443 3000; do
    PID=$(lsof -ti:$PORT)
    if [ ! -z "$PID" ]; then
        echo "Killing process on port $PORT..."
        kill -9 $PID
    fi
done

# 리액트 프로젝트를 빌드합니다. 이 과정에는 의존성 설치와 프로덕션 빌드 생성이 포함됩니다.
echo "Building React project..."
cd /home/ubuntu/testJunho/F/S10P12A105/FrontEnd
npm install
NODE_ENV=production npm run build
serve -s build &

# 스프링부트 프로젝트를 빌드합니다. Gradle 래퍼를 사용하여 빌드 과정을 실행합니다.
echo "Building Spring Boot project..."
cd /home/ubuntu/testJunho/B/S10P12A105/BackEnd/Chocolate
chmod +x ./gradlew
./gradlew build

echo "Build process completed."

# 스프링부트 애플리케이션을 실행합니다. 여기서는 프로덕션 프로파일을 활성화합니다.
echo "Starting Spring Boot application..."
java -jar -Dspring.profiles.active=prod /home/ubuntu/testJunho/B/S10P12A105/BackEnd/Chocolate/build/libs/Chocolate-0.0.1-SNAPSHOT.jar &

# Nginx 웹 서버를 시작합니다. 이는 리액트 앱을 서빙하기 위해 사용됩니다.
echo "Starting Nginx..."
sudo systemctl start nginx

echo "All applications started."
