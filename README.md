# TADAK Backend

타닥: 온라인 코딩 연습 사이트 백엔드

### Prerequistes

- Node.js 16.x LTS

### 1. Clone & Installation

```bash
$ git clone https://github.com/kweonminsung/tadak-backend.git
$ npm install
```

### 2-1. Start Server (Development)

`.env` 파일 생성 후 아래 내용 입력

```
APP_ENV=development
APP_PORT={PORT_OF_THE_APP}
DB_URL="mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
```

```bash
$ npm run start:dev
```

### 2-2. Start Server (Production)

```bash
$ npm run build
$ npm run start:prod
```

### Developed with

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
