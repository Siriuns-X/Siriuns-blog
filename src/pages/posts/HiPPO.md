---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'HiPPO推导'
pubDate: 2026-3-4
description: 'Mathematical foundation of S4: a derivation of HiPPO.'
author: 'Siriuns'
tags: ["HiPPO", "S4", "SSM", "math"]
---

## 关于S4架构HiPPO的推导

在隐空间中考虑LLM, 此时我们需要学习/预测隐空间中一个高维向量的走势, 模型的核心部分输入记为 $\mathbf{x}(t) \in \mathbb{R}^d$; 为了减少存储开销/简化模型, 我们将$\mathbf{x}(t)$的通道之间解耦, 从而仅需考虑一个输入为 $x(t) \in \mathbb{R}$ 的模型.
SSM 模型假设系统为
$$
\begin{cases}
\mathbf{h}'(t) &= \mathbf{A}\mathbf{h}(t) + \mathbf{B}x(t) \\
\mathbf{h}(0) &= 0
\end{cases}
$$
我们需要对该 ODE 离散化. 该方程为 **一阶线性常系数微分方程**, 有通用解法如下:
$$
\begin{aligned}
\mathbf{h}'(t) - \mathbf{A}\mathbf{h}(t) &= \mathbf{B}x(t) \\
e^{-\mathbf{A}t} \left( \mathbf{h}'(t) - \mathbf{Ah}(t) \right) &= e^{-\mathbf{A}t}\mathbf{B}x(t) \\
e^{-\mathbf{A}t}\mathbf{h}(t) &= \int_0^t e^{-\mathbf{A}\tau}\mathbf{B}x(\tau) d\tau \\
\mathbf{h}(t) &= e^{\mathbf{A}t} \int_0^t e^{-\mathbf{A}\tau}\mathbf{B}x(\tau) d\tau \\
\end{aligned}
$$
此时我们采用 **ZOH** (即零阶保持假设) 来离散化, 记时间步为 $\Delta \in \mathbb{R}$, 将 $\mathbf{h}(k \Delta), x(k \Delta)$ 简记为 $\mathbf{h}_k, x_k$.
$$
\begin{aligned}
\mathbf{h}_k &= e^{k \Delta \mathbf{A}} \int_0^{k \Delta} e^{-\mathbf{A}\tau}\mathbf{B}x(\tau) d\tau \\
 &= e^{k \Delta \mathbf{A}} \sum_{r=0}^{k-1} \int_{r}^{r+1} e^{-\Delta \mathbf{A}\tau}\mathbf{B}x_r d\tau \\
 &= e^{k \Delta \mathbf{A}} \sum_{r=0}^{k-1} \left(e^{- r \Delta \mathbf{A}} - e^{- (r+1) \Delta \mathbf{A}} \right) \left(\mathbf{A}^{-1}\mathbf{B}\frac{x_r}{\Delta}\right) \\
\end{aligned}
$$
于是不难发现
$$
\begin{aligned}
\mathbf{h}_{k+1} &= e^{(k+1) \Delta \mathbf{A}} \sum_{r=0}^{k} \left(e^{- r \Delta \mathbf{A}} - e^{- (r+1) \Delta \mathbf{A}} \right) \left(\mathbf{A}^{-1}\mathbf{B}\frac{x_r}{\Delta}\right) \\
 &= e^{\Delta \mathbf{A}} \mathbf{h}_k + \left(e^{\Delta \mathbf{A}} - 1\right) \left(\Delta\mathbf{A}\right)^{-1}\mathbf{B}x_r \\
\end{aligned}
$$
此时我们记 $e^{\Delta \mathbf{A}}$ 为 $\mathbf{A}_d$, 记 $\left(e^{\Delta \mathbf{A}} - 1\right) \left(\Delta\mathbf{A}\right)^{-1}\mathbf{B}$ 为 $\mathbf{B}_d$, 从而得到形式简洁的 **一阶线性常系数差分方程**.
$$
\mathbf{h}_{k+1} = \mathbf{A}_d \mathbf{h}_k + \mathbf{B}_d x_r
$$
对这个式子直接展开就可以得到
$$
\mathbf{h}_{k+1} = \sum_{r = 0}^{k} \mathbf{A}_d^r \mathbf{B}_d \cdot x_{k - r}
$$
此时方程可以进行并行运算, 相比原来的 RNN 可以更快训练. 我们记$\mathbf{g}_r = \mathbf{A}_d^r\mathbf{B}_d$, 可以把这个式子写成卷积的形式.
$$
\begin{aligned}
\mathbf{h}_{k+1} &= \sum_{r=0}^{k} \mathbf{g}_r x_{k-r} \\
 &= (\mathbf{g} * x)[k] \\
\end{aligned}
$$
这个卷积可以用 **FFT** 等算法来加速, 并且支持并行计算.
