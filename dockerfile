FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY . .


RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]