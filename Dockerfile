FROM mcr.microsoft.com/playwright:v1.54.1
WORKDIR /test
COPY package.json ./
RUN npm install
COPY . .
CMD ["npx", "playwright", "test"]