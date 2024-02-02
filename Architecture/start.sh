#!/bin/bash

# clone_repos.sh를 두 번 실행
./clone_repos.sh
./clone_repos.sh

# 8080 포트에서 실행 중인 프로세스의 PID를 찾음
PID=$(lsof -ti:8080)

# 해당 PID가 있으면 프로세스 종료
if [ ! -z "$PID" ]; then
    kill -9 $PID
fi

# BuildAndStart.sh 실행
./BuildAndStart.sh
