# 소개
`BE_develop` 브랜치는 프로젝트의 백엔드 개발을 위한 핵심 브랜치입니다. 이 브랜치에서 서버 사이드 로직 구현, 데이터베이스 관리, RESTful API 개발 등 백엔드 관련 모든 작업이 진행됩니다.

# 기술 스택 및 도구
- 프로그래밍 언어: Java 17
- 빌드 도구: Gradle
- 프레임워크: Spring Boot 3.2.1
  - Spring Security: 회원 관리 기능 구현에 사용
  - Spring Data JPA: MySQL 데이터베이스 조작
  - Spring WebSocket + SockJS + STOMP: 실시간 채팅 기능 구현
  - Kurento Media Server: 실시간 스트리밍 서비스 지원
- 데이터베이스: MySQL
- 캐싱: Redis를 사용한 스프링 세션 정보 저장
- 유틸리티: Lombok
  
# 환경 설정
프로젝트는 개발(`application-dev.properties`)과 프로덕션(`application-prod.properties`) 환경 설정 파일을 분리하여 관리합니다. 이를 통해 개발과 배포 환경에서의 동작을 쉽게 구분하고 관리할 수 있습니다.

# 개발 가이드
- 환경 준비: Java 17 및 Gradle이 설치되어 있어야 합니다.
- 의존성 설치: 프로젝트 디렉토리에서 gradle build 명령을 실행하여 필요한 의존성을 설치합니다.
- 데이터베이스 설정: application-dev.properties 파일에서 데이터베이스 연결 정보를 설정합니다.
- 애플리케이션 실행: 개발 모드에서 애플리케이션을 실행하기 위해 `./gradlew bootRun -Pprofile=dev` 명령을 사용합니다.
- 테스트: 단위 테스트 및 통합 테스트를 수행하여 코드의 안정성을 확인합니다.

# 기능 구현
- 회원 관리: Spring Security를 사용하여 사용자 인증 및 권한 관리 기능을 구현합니다.
- 데이터베이스 조작: Spring Data JPA를 사용하여 MySQL 데이터베이스와의 상호작용을 구현합니다.
- 실시간 채팅: WebSocket을 기반으로 한 채팅 기능을 SockJS와 STOMP를 사용하여 구현합니다.
- 실시간 스트리밍 서비스: Kurento Media Server를 활용하여 비디오 및 오디오 스트리밍 서비스를 제공합니다.
- 캐싱: Redis를 사용하여 세션 정보 및 자주 사용되는 데이터를 캐싱하여 성능을 최적화합니다.

# 배포
프로덕션 환경에서의 배포를 위해 `application-prod.properties` 파일에 적절한 설정을 적용합니다.
배포 프로세스는 CI/CD 파이프라인을 통해 자동화될 수 있으며, `gradlew build` 명령을 사용하여 배포 가능한 아티팩트를 생성합니다.

# 기여 방법
새로운 기능 개발이나 버그 수정을 위해 `BE_develop` 브랜치에서 작업을 시작하기 전에 새로운 피처 브랜치를 생성해주세요. 작업이 완료되면 `BE_develop` 브랜치로 풀 리퀘스트를 생성하여 코드 리뷰를 요청합니다.

