---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Basic Usage Of Tmux'
pubDate: 2025-11-07
description: 'This is a blog about basic usage of tmux.'
author: 'Siriuns'
tags: ["tmux"]
---
## tmux的结构

Session => Window => Pane => Command

## tmux基础命令

### session操作

- 查看会话: `tmux ls`
- 创建会话: `tmux new -s <name>`
- 分离会话: `tmux detach` or `Ctrl+b d `
- 连接会话: `tmux attach -t <name>`
- 终止会话: `tmux kill-session -t <name>`
- 切换会话: `tmux switch -t <name>`
- 重命名会话: `tmux rename-session -t <name> <new-name>`

### window操作

- 新建窗口: `Ctrl+b c`
- 上/下一个窗口: `Ctrl+b p/n`
- 切换到指定窗口: `Ctrl+b 0-9`
- 重命名窗口: `Ctrl+b ,`
- 关闭窗口: `Ctrl+b &`
- 进入复制模式: `Ctrl+b [`
- 从缓冲区粘贴: `Ctrl+b ]`
- 向左交换窗口位置: `Ctrl+b {`
- 向右交换窗口位置: `Ctrl+b }`

### pane操作

- 创建垂直分屏: `Ctrl+b %`
- 创建水平分屏: `Ctrl+b "`
- 切换窗格: `Ctrl+b Left/Right/Up/Down`
- 关闭窗格: `Ctrl+b x`
- 缩放窗格: `Ctrl+b z`