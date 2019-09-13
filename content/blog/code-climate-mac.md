---
title: Code Climate を Mac で動かす
date: 2019-09-13T08:12:30.933Z
image: /images/uploads/codeclimate.png
---

## Code Climate とは

[https://codeclimate.com](https://codeclimate.com)

- コードの品質を測るためのサービス
- OSS で使う分には無料
- docker を使って動作環境を自分で作ることもできる

今参加しているプロジェクトでは CI で Code Climate の実行結果を見れるようにしているのですが、たまにプッシュする前に Code Climate の結果を見たいことがあり、手元で動かせるようにしてみました。

## 環境構築

環境構築とはいっても、Homebrew から導入してゴニョゴニョするだけで済みます。

### Homebrew から Code Climate を導入する

\*Docker for Mac が導入されている前提

```
$ brew tap codeclimate/formulae
$ brew install codeclimate
```

### global に Code Climate を実行できるようにする

brew install が完了した段階で、shell を叩けば Code Climate は動くようになるのですが、一々入力をするのも面倒くさいので、以下の内容で `.sh` ファイルを作成しておきます。

```
sudo docker run \
--interactive --tty --rm \
--env CODECLIMATE_CODE="$PWD" \
--volume "$PWD":/code \
--volume /var/run/docker.sock:/var/run/docker.sock \
--volume /tmp/cc:/tmp/cc \
--volume /code/node_modules \
codeclimate/codeclimate analyze -f html > output.html
```

`codeclimate analyze` コマンドは `-f` というオプションを受け取ることができます。コードの解析結果の出力形式を指定するためのオプションです。今回は html 形式で出力して、output.html というファイルに書き込むように設定しています。

作成した　`.sh` ファイルを`/usr/local/bin` 以下に配置し、権限を弄れば準備完了です。

```
$ cd /usr/local/bin/ && sudo chmod 755 codeclimate
```

後は、Code Climate の設定ファイルのあるディレクトリで、`codeclimate` コマンドを叩けば、解析結果が `実行したディレクトリ/output.html` に出力されます。

## 参考

- [Github](https://github.com/codeclimate/codeclimate)
- [Run Code Climate Locally](https://medium.com/@empressia/run-code-climate-locally-e30635321e18) この記事の手順を参考にシェルをちょこちょこ書き換えています。
