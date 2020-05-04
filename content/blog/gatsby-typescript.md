---
title: Gatsby プロジェクトに後からTypeScript を導入する
date: 2020-05-04T10:12:30.379Z
---
## TLDR;
- `gatsby-plugin-typescript` を使えば特に苦労することなくTS 化できる
- 型の生成には`gatsby-plugin-graphql-codegen` /`gatsby-plugin-typegen` などを使うと良い
- 自動生成される型はundefined 許容型になるのでOptional chaining 等を多用する形になる 

このブログをTypeScript 化したので、手順・詰まったところをまとめる。

## プラグイン導入
今回のTypeScript 化にあたって、Gatsby 用のplugin を2つ導入した。
- [gatsby-plugin-typescript](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/)
- [gatsby-plugin-typegen](https://www.gatsbyjs.org/packages/gatsby-plugin-typegen/)

`gatsby-plugin-typescript`

## JS ファイルをTS ファイルに置き換え


## 詰まったところ

