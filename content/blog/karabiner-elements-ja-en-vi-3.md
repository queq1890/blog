---
title: Karabiner-Elements でja en vi の3種類の入力ソースを切り替えられるようにする
date: 2019-05-06T05:51:47.037Z
---
下記のJSON ファイルを適当な名前で `.config/karabiner/assets/complex_modifications` に置けば、Karabiner-Elements のcomplex_modifications からルールをimport できる。

下記のものは左側のshift と⌘ を押した時に入力ソースが順番に入れ替わるようにする例。

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
