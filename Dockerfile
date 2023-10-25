FROM node:latest

WORKDIR /usr/src/cs-short-course-reg

COPY . .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]