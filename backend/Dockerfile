FROM node:23-bullseye

WORKDIR /app

RUN npm i -g @nestjs/cli

# パッケージファイルのみをコピー
COPY package.json package-lock.json ./
# 依存関係のインストール
RUN npm install
# ソースコードをコピー
COPY . .
# コンテナ起動時のコマンド
CMD ["npm", "run", "start:dev"]