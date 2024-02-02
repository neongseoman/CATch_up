#!/bin/bash

# /home/ubuntu/testJunho/F 내의 10P12A105 레포지토리 제거
echo "Removing existing 10P12A105 repository from /home/ubuntu/testJunho/F..."
rm -rf /home/ubuntu/testJunho/F/S10P12A105

# FE_develop 브랜치 클론
echo "Cloning FE_develop branch of S10P12A105 repository into /home/ubuntu/testJunho/F..."
cd /home/ubuntu/testJunho/F
git clone -b test_deploy --single-branch https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A105

# /home/ubuntu/testJunho/B 내의 S10P12A105 레포지토리 제거
echo "Removing existing S10P12A105 repository from /home/ubuntu/testJunho/B..."
rm -rf /home/ubuntu/testJunho/B/S10P12A105

# BE_develop 브랜치 클론
echo "Cloning BE_develop branch of S10P12A105 repository into /home/ubuntu/testJunho/B..."
cd /home/ubuntu/testJunho/B
git clone -b BE_develop --single-branch https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A105

echo "Cloning completed."
