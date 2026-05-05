---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'code测试页面'
pubDate: 2026-4-30
description: '测试代码块显示'
author: 'Siriuns'
tags: ["code", "test"]
---

## 行内代码

`echo "SGVsbG8sIHdvcmxk" | base64 -d`

## 代码块

```cpp
#include<iostream>
using namespace std;
typedef long long ll;
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen(".txt", "r", stdin);
#endif

    return 0;
}
```
