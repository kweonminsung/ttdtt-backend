FROM node:16.16.0

WORKDIR /ttdttbe

COPY ./ ./

RUN npm install && npm run build

CMD npm run start:prod