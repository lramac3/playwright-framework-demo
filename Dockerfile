FROM mcr.microsoft.com/playwright:v1.61.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx playwright install --with-deps chromium

CMD ["npm", "run", "test:smoke"]
