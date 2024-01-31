FROM node
WORKDIR /app
COPY package* ./
RUN npm ci --production
RUN npm i @nestjs/cli

COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "dist/main"]
