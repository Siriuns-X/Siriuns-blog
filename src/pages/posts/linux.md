---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Several Linux Command'
pubDate: 2025-11-17
description: 'recording several basic linux command'
author: 'Siriuns'
tags: ["linux"]
---
## 关于存储(基于open Euler教程写的)

### 基础结构

PE(4MB) => PV(物理盘) => VG => LV(可动态扩展)
物理扩展 => 物理卷 => 卷组 => 逻辑卷

### 常用文件系统类型

`ext4`: Linux 标准日志型文件系统，兼容性好
`xfs`: 高性能大容量文件系统，适合服务器
`btrfs`: 支持快照、压缩、RAID的现代文件系统
`vfat`: 兼容 Windows 的 FAT32,常用于U盘
`ntfs`: Windows 主文件系统(需`ntfs-3g`包)

### 常用命令

- `mount`
- `umount`
- `lsscsi`
- `df`
- `lsblk`: 查看设备
- `fdisk`: 创建分区
- `mkfs.<type> [option] <device>`
- `xfs_growfs /dev/<VG>/<LV>`: 扩大完LV后，扩大LV上的xfs系统
- `resize2fs /dev/<VG>/<LV>`: 扩大完LV后，扩大LV上的ext4系统

#### PV

- `pvs [<PV>]`: 显示系统有哪些PV
- `pvdiplay [<PV>]`: PV详细信息
- `pvcreate <PV> [<PV>...]`: 初始化新的PV
- `pvremove <PV> [<PV>...]`: 删除PV
- `pvmove <PV> [<PV>]`: 将前一个PV的数据转移到后一个PV

#### VG

- `vgs [<VG>]`: 显示系统有哪些VG
- `vgdisplay [<VG>]`: VG详细信息
- `vgcreate <VG> <PV> [<PV>...]`: 用PV创建VG
- `vgextend <VG> <PV> [<PV>...]`: 把PV加入VG
- `vgreduce <VG> <PV>`: 删除VG中未使用的PV
- `vgremove <VG>`

#### LV

- `lvs [<VG>/<LV>]`: 显示系统有哪些LV
- `lvdiplay [<VG>/<LV>]`: LV详细信息
- `lvcreate [options] -L <size> -n <LV> <VG>`: 在VG上创建LV并制定大小
- `lvextend [options] -L <size> <VG>/<LV>`: 扩大LV
- `lvremove <LV> <VG>/<LV>`: 删除LV
