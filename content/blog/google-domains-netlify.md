---
title: Google Domains でドメインを取得してNetlify のプロジェクトに割り当てる
date: 2019-04-20T03:40:38.412Z
image: /images/uploads/google-domains-logo.png
---
Google Domains を使ってドメインを取得して、Netlify のプロジェクトに割り当てるまでをやったので、過程をメモしておきます。![domains-logo](/images/uploads/google-domains-logo.png "domains-logo")

## 1.Google Domains でドメインを購入する

まずはGoogle Domains でドメインを購入します。
<https://domains.google> にアクセスして、検索ボックスに欲しいドメインの名前を入力し、エンターを押します。
![domains-top](/images/uploads/_2019-04-20_10_59_56.png "domains-top")

しばらくすると、入力したドメイン名 + トップレベルドメインの候補一覧が、価格と共に表示されます(筆者はベトナム在住なのでベトナムドンで価格が表示されています)。
![search-result](/images/uploads/2019-04-20-11.00.30.png "search-result")

検索結果をクリックすると、カートに追加するかどうかを確認されるので、欲しいドメインをカートに追加して購入してしまいましょう。

ドメインを購入すると、 購入に利用したGoogle Account にメールアドレスの確認のためのメールが届くので、本文に記載されているリンクをクリックして確認を完了します。
![verification](/images/uploads/_2019-04-20_11_22_41.png "verification")

## 2.Google Domains 側の設定を行う

購入したドメインはGoogle Domains のダッシュボード[(https://domains.google.com/m/registrar)]("https://domains.google.com/m/registrar") から確認できます。
![domains](/images/uploads/2019-04-20-11.30.24.png "domains")
ドメイン名をクリックすると各ドメイン毎の設定ページに飛ぶので、ここから設定を変更していきます。
ページ左側に表示されているサイドバーの、 `DNS` を開きましょう。
![dns](/images/uploads/2019-04-20-11.30.41.png "dns")

様々な設定項目が表示されていますが、Netlify のプロジェクトにドメインを割り当てるだけなら、ページ最下部の `カスタムリソースレコード` を編集するだけで大丈夫です。netlifyのIPアドレス(104.198.14.52)を \`Aレコード\` に、リダイレクト用にwww付きのドメインを \`CNAME\` レコードに登録します。

![custom](/images/uploads/_2019-04-20_11_31_54.png "custom")

## 3.Netlify 側の設定を行う
