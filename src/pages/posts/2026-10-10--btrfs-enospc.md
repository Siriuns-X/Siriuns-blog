---
layout: ../../layouts/MarkdownPostLayout.astro
title: '关于btrfs遇到enospc的修复'
pubDate: 2026-10-10
description: 'metadata满了'
author: 'Siriuns'
tags: ["linux"]
---

## 0. 背景

在下午跑 codex 的时候 GPT 突然说 "目录写入空间不足", 看了眼 Filelight, 空间还有 20 多G, 挂着没关, 上两节课回来发现 Firefox/Konsole 之类的 UI 莫名其妙有点透明的感觉, 有点崩, 遂 reboot, 结果启动项里面不知道哪个东西 Failed 了.

## 1. 修复

用 U 盘进 live 环境之后 `mount -o subvol=@ /dev/nvmeXnXpX /mnt` 挂上, 然后 `journalctl -D /mnt/var/log/journal -b -0 -p err` 看了下, 发现有显示 **No space left on device** 的报错, `btrfs filesystem usage /mnt` 之后发现 metadata 的空间不多并且 unallocated 的部分只剩了 1MiB.

> 在 btrfs 中, metadata 和 data 用的 chunk 类型不同, 空余空间不能直接共享.

一开始尝试用 `btrfs balance start -dusage=75,limit=3 /mnt` 来重新分配, 但是这时候虽然 metadata 还有 200MiB 左右的空间, 却被预先占用了, 而 unallocated 的空间又没了, 所以导致 balance 失败了.

不过 btrfs 可以在线添加设备, 用 fdisk 从硬盘上分了一块 /dev/sdaX 出来, `btrfs device add` 加入到了现有的文件系统上, 再 balance 就可以了, 最后移除设备再重启.

## 2. 调优

linux 6.11 以上版本对 btrfs 引入了 **dynamic_reclaim, periodic_reclaim** 这两项机制, 自动回收 data chunk, 降低 metadata 空间耗尽的风险.

这两项东西是否开启在 /sys/fs/btrfs/uuid/allocation/data/dynamic_reclaim 和 /sys/fs/btrfs/uuid/allocation/data/periodic_reclaim 中查看, 0 表示没开, 写入 1 来开启. 重启会重置这俩参数, 所以我们需要用 **systemd-tmpfiles** 机制在启动电脑后自动设置.

在 /etc/tmpfiles.d/ 下创建 btrfs-reclaim.conf 之类的文件, 写入如下内容:

```
w /sys/fs/btrfs/uuid/allocation/data/dynamic_reclaim - - - - 1
w /sys/fs/btrfs/uuid/allocation/data/periodic_reclaim - - - - 1
```

上面的内容在启动时才会生效, 如果需要立即生效, 可以靠下面这行命令

```bash
sudo systemd-tmpfiles --create /etc/tmpfiles.d/btrfs-reclaim.conf
```