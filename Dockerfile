FROM node:18-alpine

# 디렉토리 지정
RUN mkdir -p /usr/app
WORKDIR /usr/app

# 의존성 설치를 위해 package.json, yarn.lock 복사
COPY package.json ./
COPY yarn.lock ./

# 의존성 설치
RUN yarn

# 필요한 모든 파일을 복사
COPY . .

# next.js 앱 빌드
RUN yarn build

# 컨테이너 포트 3000 설정
EXPOSE 3000

# 애플리케이션 실행
CMD [ "yarn", "start" ]

# 다음 명령어 실행
# docker build -t bssmh-portfolio-app .