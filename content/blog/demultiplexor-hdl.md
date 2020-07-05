---
title: Demultiplexor をhdl で記述した際のメモ
date: 2019-09-16T09:39:27.111Z
tags: ["hdl"]
---
「コンピュータシステムの理論と実装 ―モダンなコンピュータの作り方」の「1章 ブール論理」より、Demultiplexor をいくつかhdl で書いてみたので、考え方のメモ。

## DMux
`a` が1になるのは`in=1` `sel=0`の時のみであることを考えると、`a` の値を出すには`sel` の値を反転して`And` に渡せば良い。`b` が1になるのは`in=1` `sel=1` の時なのでそのまま`And` に渡す。

```hdl
CHIP DMux {
    IN in, sel;
    OUT a, b;

    PARTS:
    Not (in=sel, out=nsel);
    And (a=in, b=nsel, out=a);
    And (a=in, b=sel, out=b);
}
```


## DMux4Way
初めに`DMux` に`in` と`sel[1]` を渡して`w1` `w2` の2値に`in` を分割する。
後は`DMux` に`w1` と`sel[0]` を与えれば`{a, b}` の値が、`w2` と`sel[0]`を与えれば`{c, d}` の値が得られる。

```hdl
CHIP DMux4Way {
    IN in, sel[2];
    OUT a, b, c, d;

    PARTS:
    DMux (in=in, sel=sel[1], a=w1, b=w2);
    DMux (in=w1, sel=sel[0], a=a, b=b);
    DMux (in=w2, sel=sel[0], a=c, b=d);
}
```

## DMux8Way
`DMux4Way` の実装と考え方は同じで、初めに`in` を2値に分割し、それぞれを`DMux4Way` に与えれば良い。

```hdl
CHIP DMux8Way {
    IN in, sel[3];
    OUT a, b, c, d, e, f, g, h;

    PARTS:
    DMux(in=in, sel=sel[2], a=t1, b=t2);
    DMux4Way(in=t1, sel=sel[0..1], a=a, b=b, c=c, d=d);
    DMux4Way(in=t2, sel=sel[0..1], a=e, b=f, c=g, d=h);
}
```
