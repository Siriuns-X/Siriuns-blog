---
layout: ../../../layouts/MarkdownPostLayout.astro
title: 'ICPC 邀请赛 南昌'
pubDate: 2026-4-27
description: '补题记录'
author: 'Siriuns'
tags: ["CP"]
---
## A - Nezha Naohai

签到题

```cpp
#include <iostream>
using namespace std;
typedef long long ll;
int main()
{
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    cout << (a + b + c) * d << "\n";
    return 0;
}
```

## M - Divide coins

找规律发现: 假设一开始 $n-k$ 个反面硬币都在同一堆, 这一堆都经过翻转, 然后交换两堆中的任意硬币, 正面的数量始终保持不变. 故只要 $n-k$ 个硬币反转并归入一堆即可.

```cpp
#include <iostream>
using namespace std;
typedef long long ll;
int main()
{
    int n, k;
    cin >> n >> k;
    for (int i = 0; i < n - k; i++) cout << 2;
    for (int i = 0; i < k; i++) cout << 3;
    cout << "\n";
    return 0;
}
```

## F - Caloric Difference

原式子 $\sum_{i=1}^n(c_i-r_i)$ 的 $c_1$ 和 $r_n$ 显然固定, 将 $c_i$ 与 $r_{i-1}$ 项合并, 原式化为 $(c_1-r_n)+p\sum_{i=1}^{n-1}(c_i-r_i)$, 此时 $r_{i-1}$ 显然要取最小, 一直展开得到: $r_i$ 不确定时取 $L$ 即可.

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
typedef long long ll;
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    ll tt; cin >> tt;
    while (tt--)
    {
        int n, k; cin >> n >> k;
        double r0, c0, p, L, R; cin >> r0 >> c0 >> p >> L >> R;

        double c1 = p * c0 + (1 - p) * r0;
        double ans = 0;
        vector<double> r(n, L);
        for (int i = 0; i < k; i++)
        {
            int pp; double vv; cin >> pp >> vv;
            r[pp - 1] = vv;
        }
        for (int i = 0; i < n; i++) ans = p * ans + (c1 - r[i]);
        cout << fixed << setprecision(10) << ans << "\n";
    }
    return 0;
}
```

## G - Exploration

直接广搜会MLE, 而此题目边权至少为2, 耐力小于1e+9, 所以每个点预处理一下k步内所能消耗的最大体力值, 每个点最多处理30多次.

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;
struct Node
{
    ll size;
    vector<ll> sons;
    vector<ll> edges;
    ll csm[33];
    Node() : size(0), csm{} {}
};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen("in.txt", "r", stdin);
#endif

    ll n, m, Q; cin >> n >> m >> Q;
    vector<Node> nodes(n);
    for (int i = 0; i < m; i++)
    {
        ll u, v, d; cin >> u >> v >> d;
        nodes[--u].size++;
        nodes[u].sons.emplace_back(--v);
        nodes[u].edges.emplace_back(d);
    }
    for (int i = 1; i < 33; i++)
    {
        for (auto &xx : nodes)
        {
            ll tcsm = 0;
            for (int ii = 0; ii < xx.size; ii++)
                tcsm = max(tcsm, xx.edges[ii] * (nodes[xx.sons[ii]].csm[i - 1] + 1) - 1);
            xx.csm[i] = tcsm;
        }
    }
    for (int i = 0; i < Q; i++)
    {
        ll p, x; cin >> p >> x;
        Node node = nodes[--p];
        int dep = 1;
        for (; node.csm[dep] < x; dep++) continue;
        cout << dep << "\n";
    }
    return 0;
}
```

## I - Dating Day

找规律发现: 从左到右, 每次取包含 $k$ 个 $1$ 的区间(左右两侧都贪婪取0), 进行重排时, 相邻区间会存在包含 $k-1$ 个 $1$ 的重叠部分, 仅重排这个区间的部分被两侧都计数了一遍, 去除这部分即可.

先预处理了 $n!$ 与 $(n!)^{-1}$, 然后计算 $A_{\text{lenth}}^{k}$ 与 $A_{\text{lenth}}^{k-1}$ 各自的和, 最终答案为 $(k!)^{-1}\sum A_{\text{lenth}}^{k} - ((k-1)!)^{-1}\sum A_{\text{lenth}}^{k-1}$

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <queue>
using namespace std;
typedef long long ll;
const ll M = 998244353;
const ll N = 100000;
ll fac[N + 5];
ll ifac[N + 5];
ll pw(ll x, ll y)
{
    if (x == 1) return 1;
    if (y == 1) return x;
    else
    {
        ll k = x * x % M;
        if (y % 2 == 1) return pw(k, y / 2) * x % M;
        else return pw(k, y / 2);
    }
}
inline ll A(ll n, ll k) return fac[n] * ifac[n - k] % M;
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen(".txt", "r", stdin);
#endif

    fac[0] = 1;
    for (int i = 1; i <= N; i++) fac[i] = fac[i - 1] * i % M;

    ifac[N] = pw(fac[N], M - 2);
    for (int i = N; i > 0; i--) ifac[i - 1] = ifac[i] * i % M;

    ll tt; cin >> tt;
    while (tt--)
    {
        ll n, k; cin >> n >> k;
        string s; cin >> s;

        ll cnt = 0, slt = 0, lft = -1;
        ll sz = s.size();
        ll aa = 0, bb = 0;

        queue<ll> lth;
        for (int i = 0; i <= sz; i++)
        {

            if (s[i] == '1' || i == sz)
            {
                lth.push(i - lft - 1);
                if (cnt < k)
                {
                    cnt++;
                    slt++;
                }
                else
                {
                    if (aa != 0)
                        bb = (bb + A(slt - i + lft, k - 1)) % M;
                    aa = (aa + A(slt, k)) % M;
                    slt -= lth.front();
                    lth.pop();
                }
                lft = i;
            }
            else
                slt++;
        }
        cout << (ifac[k] * aa % M - ifac[k - 1] * bb % M + M) % M << "\n";
    }

    return 0;
}
```

## E - God's String on This Wonderful World

使用莫队算法+哈希(假装用了)+离散化.

思路大致是: 维护整个序列字母计数的前缀和(模 $k$), 若两点前缀和一致则这两点间的字串就是 $k$ 重子串; 先找出整个字串的前缀有多少状态, 用离散化压缩空间(可hash然后排序), 最后在莫队算法中计数这些前缀出现的数量, 指针移动的时候通过计数来确定当前区间答案的变化.

莫队算法: 遇到多个区间查询时, 将所有区间离线存储后排序处理, 排序时先根据 **左端点所在块** $\left\lfloor \frac{l}{m} \right\rfloor$ 升序; 同一块内, 右端点按照 **左端点所在块号的奇偶** 交替升降序, 减少指针移动.

预处理: 求 $A_n^k$ 的时候会遇到很多 $n!$ 和 $(n!)^{-1}$, 提前打表 $\text{fac}[n] = n!$ 和 $\text{ifact}[n] = (n!)^{-1}$.

离散化: 前缀和有 $k^26$ 种状态, 直接记录难查找并且空间可能很大, 因此将所有状态映射到一个一维数组上.

```cpp
#include <iostream>
#include <string>
#include <cmath>
#include <algorithm>
#include <array>
#include <vector>
using namespace std;
typedef long long ll;
struct tsk
{
    int l, r, ord;
    tsk() : l(0), r(0), ord(0) {}
    tsk(int l, int r, int ord) : l(l), r(r), ord(ord) {}
};

int main()
{

#ifndef LOCAL
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
#endif

#ifdef LOCAL
    freopen(".txt", "r", stdin);
#endif

    int n, k, q; cin >> n >> k >> q;
    int m = max(1, (int)sqrt(n));

    string s; cin >> s;
    vector<array<int, 26>> c(n + 1);
    vector<array<int, 26>> vec(n + 1);

    for (int i = 1; i <= n; i++)
    {
        int ich = s[i - 1] - 'a';
        c[i][ich] = 1;
        for (int r = 0; r < 26; r++)
        {
            c[i][r] += c[i - 1][r];
            c[i][r] %= k;
        }
        vec[i] = c[i];
    }

    sort(vec.begin(), vec.end());
    vec.erase(unique(vec.begin(), vec.end()), vec.end());
    int sz = vec.size();

    vector<ll> cnt(sz, 0);

    vector<int> a(n + 1);
    for (int i = 0; i <= n; i++) 
        a[i] = lower_bound(vec.begin(), vec.end(), c[i]) - vec.begin();

    vector<tsk> qr(q);
    vector<ll> ans(q);
    for (int i = 0; i < q; i++)
    {
        int l, r; cin >> l >> r;
        qr[i] = tsk(--l, r, i);
    }

    sort(qr.begin(), qr.end(), [m](const tsk &a, const tsk &b)
        {
            int x = a.l / m, y = b.l / m;
            if (x != y) return x < y;
            if (x & 1) return a.r > b.r;
            return a.r < b.r; 
        });

    int nl = 0, nr = 0;
    ll scnt = 0;
    cnt[0] = 1;
    for (const auto &x : qr)
    {
        auto [l, r, ord] = x;
        while (nr < r) scnt += cnt[a[++nr]]++;
        while (nr > r) scnt -= --cnt[a[nr--]];
        while (nl < l) scnt -= --cnt[a[nl++]];
        while (nl > l) scnt += cnt[a[--nl]]++;
        ans[ord] = scnt;
    }
    for (int i = 0; i < q; i++) cout << ans[i] << "\n";
    return 0;
}
```
