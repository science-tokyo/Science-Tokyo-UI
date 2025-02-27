# Science Tokyo UI フロントエンド

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-typescript-000000.svg?logo=typescript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-eleventy-000000.svg?logo=eleventy&style=for-the-badge">
  <img src="https://img.shields.io/badge/-nunjucks-269539.svg?logo=nunjucks&style=for-the-badge">
  <img src="https://img.shields.io/badge/-storybook-FFFFFF.svg?logo=storybook&style=for-the-badge">
</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 22.12.0    |
| Storybook            | 8.4.7      |
| Eleventy             | 2.0.1      |
| Sass                 | 1.77.1     |

その他のパッケージのバージョンは package.json を参照してください

## ディレクトリ構成

<!-- ディレクトリ構成を記載 -->

<pre>
.
├── eleventy.config.js
├── package-lock.json
├── package.json
├── README.md
└── src
      ├── scss
      │     └── globals
      │           ├── _mixin.scss
      │           ├── _typography.scss
      │           ├── _var_colors.scss
      │           └── _var_numbers.scss
      ├── assets
      │     └── css
      │           └── style.scss
      ├── components
      │     ├── primitive
      │     └── semantic
      └── pages
             ├── _includes
             │    └── layouts
             │           └── base.njk
             ├── category
             │     └── index.njk
             └── index.njk
</pre>

## 開発環境構築

### コマンド一覧

| コマンド          | 実行する処理                                |
| ----------------- | ------------------------------------------- |
| npm install       | node_modules のインストール                 |
| npm run storybook | Storybookの起動                             |
| npm run start     | 11tyとSassのビルド＋監視 と Storybookの起動 |
| npm run build     | 11tyのビルド                                |
