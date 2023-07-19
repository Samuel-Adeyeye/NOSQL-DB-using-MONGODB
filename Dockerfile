FROM node:18-alpine

WORKDIR /books

COPY . .

RUN yarn

EXPOSE 5000

CMD ["yarn", "dev"]