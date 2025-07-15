# server

このディレクトリは、マッチングアプリのバックエンドAPIサーバー（Ruby on Rails + GraphQL）です。リアルタイム通信にはSolid Cableを利用したActionCableを採用しています。

## 主な技術スタック

- Ruby on Rails
- GraphQL (graphql-ruby)
- ActionCable（Solid Cable利用）
- PostgreSQL
- RSpec（テスト）

## 主な機能

- ユーザー認証・管理
- プロフィール管理
- マッチング（Like/Accept/Reject）
- チャット（リアルタイム通信含む）
- 画像アップロード（※クライアント側でGoogle Cloud Storageに直接アップロードし、レスポンスのオブジェクトURLをDBに保存するアーキテクチャです）

## セットアップ手順（ローカル開発：Dockerコンテナ前提）

### 前提
- Docker, Docker Composeがインストールされていること

### 起動手順
1. コンテナのビルド・起動
   ```sh
   docker compose up --build
   ```
2. 別ターミナルでDBマイグレーション等の初期化
   ```sh
   docker compose exec server bundle exec rails db:create db:migrate
   ```
3. サーバーは http://localhost:3000 で起動します

### テスト実行
```sh
docker compose exec server bundle exec rspec
```

## GraphQLエンドポイント・スキーマ
- エンドポイント: `/graphql`
- スキーマ定義: `app/graphql/` および `server/graphql/server_schema.graphql`
- GraphiQL: 開発環境で利用可能（`/graphiql` など、環境により異なる場合あり）

## 主なディレクトリ構成
- `app/graphql/` : GraphQLスキーマ、型、リゾルバ、ミューテーション等
- `app/models/` : Railsモデル
- `app/controllers/` : コントローラー
- `app/channels/` : ActionCable（Solid Cable）関連
- `spec/` : RSpecテスト

## 開発・デプロイに関する補足
- 環境変数やSecretsは `.env` ファイルやDocker Composeの設定で管理します
- 本番環境用の設定やインフラ構成はリポジトリルートの `gcloud/`, `neon/`, `vercel/` ディレクトリを参照してください
