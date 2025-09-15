FROM node:23-bullseye

WORKDIR /app

# パッケージファイルのみをコピー
COPY package*.json ./
# 依存関係のインストール
RUN npm install
# ソースコードをコピー
COPY . .
# コンテナ起動時のコマンド
CMD ["npm", "run", "dev"]