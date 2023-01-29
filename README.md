# [TEAM Q] Q-team-surround-backend

![image](https://user-images.githubusercontent.com/83271772/215302205-e8e826e1-6a2d-4a53-bb6f-4b0b06eb6467.png)

![image](https://user-images.githubusercontent.com/83271772/215302213-76045eff-c2b1-4aae-9097-e56bb8abe1dd.png)


Surround는 SNS 기반 음원 스트리밍 플랫폼으로, 유저가 비공식 음원을 자유롭게 업로드하고 공유할 수 있는 플랫폼입니다.
Surround에서 재생하는 음악, 회원 등을 관리하며, 데이터 업로드 및 다운로드 등 애플리케이션의 전반적인 서비스를 제공합니다.

다음과 같은 기능이 포함되어 있습니다.
- 음원 업로드
- 음원 다운로드
- 음원 Likes
- Likes한 음원 조회


## 프로젝트에서 사용한 기술

- Language: TypeScript
- Server Framework: NestJS
- ORM: Prisma
- Database: PostgreSQL, Redis
- Cloud: EC2, RDS, S3, Docker

## Dev Server 실행 방법

- git clone
- sample.env를 참고해서 환경변수를 정의해주세요.
- docker build -t 이미지 .
- docker run -d -p 접속포트:컨테이너포트 --name 컨테이너이름 이미지



## Production 배포 방법

- EC2에서 Build.sh파일 작성
```bash
git clone
sudo docker stop 컨테이너
sudo docker rm 컨테이너
sudo docker build -t 이미지이름 .
sudo docker run -d -p 3000:3000 --name 컨테이너 이미지
```

## 환경 변수 및 시크릿

sample.env에도 존재

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=
JWT_ACCESS_TOKEN_SECRET=
JWT_REFRESH_TOKEN_SECRET=

# Redis config
REDIS_HOSTNAME=
REDIS_PORT=

CLIENT_URI=

AWS_BUCKET_REGION=

AWS_BUCKET_NAME=
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
```

## 기타

... 기타 설명이 필요한 사항들 ...
