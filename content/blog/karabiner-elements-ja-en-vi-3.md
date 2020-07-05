---
title: Karabiner-Elements でja en vi の3種類の入力ソースを切り替えられるようにする
date: 2019-05-06T05:51:47.037Z
image: /images/uploads/screen-shot-2019-05-06-at-1.00.45-pm.png
tags: ["test"]
---
下記のJSON ファイルを適当な名前で `.config/karabiner/assets/complex_modifications` に置けば、Karabiner-Elements のcomplex_modifications からルールをimport できる。

下記のものは左側のshift と⌘ を押した時に入力ソースが順番に入れ替わるようにする例。
Mac のショートカットとぶつかってしまっているので後で書き直す。







```
{
  "title": "Language toggler",
  "rules": [
    {
      "description": "Left_Shift+Left_Command language toggle (en->vi->ja->en...)",
      "manipulators": [
        {
          "conditions": [
            {
              "type": "input_source_if",
              "input_sources": [
                {
                  "language": "en"
                }
              ]
            }
          ],
          "type": "basic",
          "from": {
            "key_code": "left_shift",
            "modifiers": {
              "mandatory": ["left_command"]
            }
          },
          "to": [
            {
              "select_input_source": {
                "language": "vi"
              }
            }
          ]
        },
        {
          "conditions": [
            {
              "type": "input_source_if",
              "input_sources": [
                {
                  "language": "vi"
                }
              ]
            }
          ],
          "type": "basic",
          "from": {
            "key_code": "left_shift",
            "modifiers": {
              "mandatory": ["left_command"]
            }
          },
          "to": [
            {
              "select_input_source": {
                "language": "ja"
              }
            }
          ]
        },
        {
          "conditions": [
            {
              "type": "input_source_if",
              "input_sources": [
                {
                  "language": "ja"
                }
              ]
            }
          ],
          "type": "basic",
          "from": {
            "key_code": "left_shift",
            "modifiers": {
              "mandatory": ["left_command"]
            }
          },
          "to": [
            {
              "select_input_source": {
                "language": "en"
              }
            }
          ]
        }
      ]
    }
  ]
}
```
