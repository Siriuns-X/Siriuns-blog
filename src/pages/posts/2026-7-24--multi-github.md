---
layout: ../../layouts/MarkdownPostLayout.astro
title: '如何在一台电脑上配置使用多个github账号以及ssh密钥'
pubDate: 2026-7-24
description: '有点神秘的配置'
author: 'Siriuns'
tags: ['github', 'git']
---

## 0. why?

为什么会有两个github账号? 主账号上不想放杂七杂八的东西, 遂开了个小号然后用来做归档或者说backup.

## 1. 配置

首先在本地用 ssh-keygen 生成两个ssh密钥, 在各自账号上加入对应的公钥作为 Authentication key, 这个密钥是 push 时用到的, 旁边的 Signing key 是 commit 时用到的.

### 1.1 配置 host, 对应 push

首先是要在 push 的时候让 github 知道是哪个账号的, 于是就需要配置 `~/.ssh/config`:

```
Host <main-host>
    HostName github.com
    User git
    IdentityFile ~/.ssh/<main-key>

Host <alt-host>
    HostName github.com
    User git
    IdentityFile ~/.ssh/<alt-key>
```

改完之后我们的 remote 就不能设置成 git@github.com:\<name\>/\<repo\>.git, 而是要根据账号把 github.com 改成对应的 host.

### 1.2 改 gitconfig, 对应 commit

接着修改 `~/.gitconfig` 和 `~/.gitconfig-alt`, 如果你用 ssh 去签名 commit, 最终大概会长这样:

```ini
# ~/.gitconfig
[user]
    name = <main_name>
    email = <main_email@example.com>
    signingkey = ~/.ssh/<main_key>.pub
[gpg]
    format = ssh
[commit]
    gpgsign = true

[includeIf "gitdir:/dir/for/alt/account/"]  # 'gitdir' must end with '/'
    path = ~/.gitconfig-alt
```

```ini
# ~/.gitconfig-alt
[user]
    name = <alt_name>
    email = <alt_email@example.com>
    sigingkey = ~/.ssh/<alt_key>.pub
[gpg]
    format = ssh
[commit]
    gpgsign = true
```

这里面 `~/.gitconfig-alt` 的名字可以随便改, 只要对的上就行. 以及提醒, `gitdir` 必须以 `/` 结尾(很神秘). 另外, github 是根据 commit 中留的邮箱对应哪个账号来归绿墙的贡献的, ssh 签名不是必须的.


## -1. 清空 commit

由于不想仓库里全是 main 账户的 commit, 所以一般会 rebase 一下:

```bash
git checkout --orphan backup
```

这条命令会创建一个 commit 为空的分支, 在该分支上用 alt account 来 commit 就没有 main 账号的记录了.