FROM node:16.16.0

WORKDIR /home

ADD https://worldtimeapi.org/api/timezone/Asia/Seoul /tmp/bustcache

RUN git clone "https://${GITHUB_ID}@${GITHUB_PASSWORD}github.com/kweonminsung/ttdtt-backend.git"

WORKDIR /home/ttdtt-backend

RUN npm install

CMD npm run build && npm run start:prod