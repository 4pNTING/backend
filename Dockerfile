FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

COPY dist ./dist

EXPOSE 3000 9897

CMD ["node", "dist/main.js"]
