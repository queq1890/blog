---
title: style 定義ををどこに書くか考察メモ
date: 2020-08-09T17:47:29.033Z
tags:
  - styling
---
## 特定の js ファイルにまとめる場合(styles.js)

以下のようなファイルを定義する場合

```jsx

const A = styled.div`
/**/
`

const B = styled.div`
/**/
`

export {
 A,
 B,
}
```

### メリット

#### jsx ファイルのコード量が減る

jsx ファイル内に記述されるのは純粋な component の定義のみになる。

```jsx
import { SomeStyledComponent } from './styles';

const A = () => (<SomeStyledComponent>ff</SomeStyledComponent>)

export default A

```

### デメリット

#### style がどこから利用されるか分かりにくくなる

以下のような、 1 directory - 1 component の場合なら分割しても依存関係が分かりやすい。

```
/Button
  /index.jsx
  /styles.js
```

しかし、実際のプロジェクトでは、開発が進むに連れ、以下のような、1 directory - many components のような構成が現れてしまうことがある。(規約で縛っていても誰かがやりだす) このような構成の場合だと、styles.js の中から、対応する css / styled-component 定義を探す手間が生じてしまい、後から開発に参加するメンバーが component と style の関係を理解するまでに時間が掛かってしまう。

```
/User
  /index.jsx
  /styles.js
  /UserProfile.jsx
  /UserAvatar.jsx
  /UserProfileEdit.jsx
  /UserList.jsx
```

また、styled-component + className を使って styling をしている場合、次のような component が生まれてしまう可能性がある。

```jsx
const A = ({ MainLogoUrl, SubLogoUrl }) => (
  <div className="logo">
    <img src={MainLogoUrl} className="main_logo" alt="logo_main" />
    <img src={SubLogoUrl} className="sub_logo" alt="logo_sub" />
  </div>
)
```

この component は、parent component の wrapper(styled-component) 内で定義されている className に依存しており、この component のみではどのような style になるのかが分からない。なので、A component の styling を理解したい場合は、「A component の実装を読む => A component を render している parent component を探す => parent component の style から component A 向けの className を探す」という手順を踏むことになり、非常に効率が悪い。そもそも、styled-component は 1 component - 1 scoped CSS の思想で設計されている library なので、ある component の style が別の component に依存するような設計になることは間違いである。

もしも parent component から child component に style を渡したいのなら、className を props として渡す事によって、injectable な設計にするべきである。

```jsx
const A = ({ className }) => (
  <div className={className} />
)
```

更に、style を export するということは、どこからでも import できる状態になることを意味する。これにより、当初の想定とは全く違う compoent から style を import してしまい、技術負債を生み出してしまう可能性がある。

#### 特定の style のみを再利用する場合が考えにくい

わざわざ style 定義を別のファイルにまとめて export するからには、複数の jsx からその module を import することを期待したい。多くの場合、component は logic + styling の纏まりである。頻繁に利用されるものは、 primitive/atom/molecule といった directory に、JSX + styling といった形で定義される。重要なのはこれら reusable な component が props を受け取り、最低限の logic を持つという点である。`styled.div` のみを export したとしても、import 先で別で logic を書かなければならない。 primitive な component でさえ props を受け取り、logic を持つというのに、ただの styled.div が再利用可能な component となり得るだろうか？答えは No である。

## styles.js を作らない場合(jsx に styled-components を直接書く場合)

### メリット

#### style が scoped であることが保証される

```jsx
const A = () => (<B>aaa</B>)

const B = styled.div``
```

jsx と同じファイル内に styled-component を書く場合、大抵の場合は定義した styled-component を export をする必要はない。上記の場合、styled-component である B は export されていないので、B の CSS を変更しても影響があるのがこの jsx の中だけだと分かる。他の component に影響を与えない事が分かっているので、style の refactoring がしやすい。また、同一ファイル内に CSS が書かれているので、「どのファイルで style を定義しているのか？」を考えなくていい。

### デメリット

#### jsx のコード量が多くなる

React component と styled-component が同じファイル内に書かれるので、jsx ファイル内のコード量は多くなる。ただし、React component と styled-component は全く役割の違う module で、別々に const
されているため、コードの可読性が落ちるという訳ではない。

## IMO

まとめると、
- styled-components は 1 component - 1 scoped CSS という思想の library なのだから、実装も scoped になるように寄せてあげるべき
- styled-component と JSX を同じファイルに書く場合のデメリットが正直そこまでデメリットではないので、特別な理由がない限りこちらの実装を選んだほうが幸せになれそう
- 1 directory - 1 jsx - 1 style のような規約を守れるなら、分割しても良いと思う
  - 現実だとこの規約を守れない dev がいるので、厳密にレビューする必要が出る
  - もちろん primitive な React Component ではなくて`styled.div` 定義を複数の場所から使いまわしたい、という場合は、 styled-component を export するための module を定義してあげれば良いと思う
