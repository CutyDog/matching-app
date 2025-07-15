# Matching App

このリポジトリは、マッチングアプリのフルスタック実装です。
フロントエンド、バックエンド、インフラ構成がディレクトリごとに分かれています。

## ディレクトリ構成

- `client/`
  フロントエンドアプリケーション。主にユーザーインターフェースやクライアント側のロジックを担当します。

- `server/`
  バックエンドAPIサーバー。GraphQLを用いたAPIやリアルタイム通信（ActionCable）を提供します。

- `gcloud/`
  Google Cloud Platform（GCP）用のインフラ構成管理（Terraform）。

- `neon/`
  Neon（PostgreSQLクラウドサービス）用のインフラ構成管理（Terraform）。

- `vercel/`
  Vercel用のインフラ構成管理（Terraform）。

- `docker-compose.yml`
  開発環境用のDocker Compose設定ファイル。

---

## 主要な機能

- **ユーザー登録・認証**
  新規ユーザー登録、ログイン、プロフィール作成・編集

- **マッチング機能**
  他ユーザーへの「いいね」送信、受信、承認・拒否、マッチ成立

- **チャット機能**
  マッチしたユーザー同士のリアルタイムチャット

- **画像アップロード**
  プロフィール画像などのアップロード

- **インフラ管理**
  TerraformによるGCP、Neon、Vercelのインフラ構築

---

## 詳細なセットアップ手順や技術スタックについて

各ディレクトリ（`client/`, `server/`, `gcloud/`, `neon/`, `vercel/`）のREADMEをご参照ください。
