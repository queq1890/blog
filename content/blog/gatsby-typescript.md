---
title: Gatsby プロジェクトに後からTypeScript を導入する
date: 2020-05-04T10:12:30.379Z
---
## TLDR;
- `gatsby-plugin-typescript` を使えば特に苦労することなくTS 化できる
- 型の生成には`gatsby-plugin-graphql-codegen` /`gatsby-plugin-typegen` などを使うと良い
- 自動生成される型はundefined 許容型になるのでOptional chaining 等を多用する形になる 

このブログをTypeScript 化したので、手順・詰まったところをまとめる。

## プラグインを読み込む
今回のTypeScript 化にあたって、Gatsby 用のplugin を2つ導入した。
- [gatsby-plugin-typescript](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/): Gatsby プロジェクトでTypeScript を扱えるようにするプラグイン
- [gatsby-plugin-typegen](https://www.gatsbyjs.org/packages/gatsby-plugin-typegen/): Gatsby プロジェクト内で扱っているGraphQL の型情報を自動生成してくれるプラグイン 

npm 経由で必要なプラグインをdeps に追加し、`gatsby-config.js`で追加したプラグインを読み込む。

`$yarn add gatsby-plugin-typescript gatsby-plugin-typegen`

```javascript
// gatsby-config.js
module.exports = {
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-typegen`,
  // ...
```

型定義を提供していないライブラリを利用しているなら、`@types` を入れるなり、自前で型を用意するなりしておく。 

## JS ファイルをTS ファイルに置き換える
プラグインの導入が完了したら、`tsconfig.json` をプロジェクトルートに用意する。`tsconfig.json`の書き方について、プラグイン側からの拘束は特にない(はず)なので、好きに書けば良いと思う。

`tsconfig.json` が用意できたら、`.jsx` を`.tsx`に、`.ts`を`.js` に変更した上で、一度`gatsby develop` を実行する。 まだ型を付けていないのでTypeScript のエラーが表示され、強制終了してしまうのだが、`gatsby-plugin-typegen`が各page / component に書かれているGraphQL のquery から必要な型定義を生成してくれる。(default のpath は`src/__generated__/gatsby-types.ts`)
例えば、`BlogIndex` という名前のquery をpage / component で利用しているなら、その返り値の型は`GatsbyTypes.BlogIndexQuery`となる。

```typescript
// BlogIndex という名前のquery
export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
```


```typescript
// BlogIndexQuery 型が生成される

declare namespace GatsbyTypes {
// ...

type BlogIndexQuery = { readonly site: Maybe<{ readonly siteMetadata: Maybe<Pick<SiteSiteMetadata, 'title'>> }>, readonly allMarkdownRemark: { readonly edges: ReadonlyArray<{ readonly node: (
        Pick<MarkdownRemark, 'excerpt'>
        & { readonly fields: Maybe<Pick<MarkdownRemarkFields, 'slug'>>, readonly frontmatter: Maybe<Pick<MarkdownRemarkFrontmatter, 'date' | 'title'>> }
      ) }> } };

// ...

}
```

後は生成された型を使って必要な箇所に型を付けていけば良い。
```typescript
type Props = {
  data: GatsbyTypes.BlogIndexQuery;
}
```

## 詰まったところ
`gatsby-plugin-typegen` で生成される型はほぼ`Maybe` 型でラップされており、undefined になりうる型となっている。

```typescript
type Maybe<T> = T | undefined;
```

なので、query 経由で取得したdata は、optional chaining 等を利用してundefined でないことを保証しながら扱っていく必要がある。これは、`gatsby-plugin-typegen` だけではなく、`gatsby-plugin-graphql-codegen` を使って型生成した場合も同じである。

```typescript
<li>
  {next?.fields?.slug && (
    <Link to={next.fields.slug} rel="next">
      {next?.frontmatter?.title} →
    </Link>
  )}
</li>
```

(リソースに対してのquery ならundfined になるのも分かるが、siteMetaData などのquery 結果はrequired な型でも良かったのでは、とも思う)

## 終わりに
自動生成される型が若干扱いにくいこと以外は、割とさっくりTypeScript を導入することができた。最近このブログはほぼ触っていなかったが、型による秩序も手に入ったことなので、このまま少しずつ改修していけたらと思う。 

