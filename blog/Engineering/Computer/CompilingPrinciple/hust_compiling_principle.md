---
title: "[HUST]编译原理"
description: 华中科技大学编译原理笔记
date: 2020-12-01
bg: ./.images/dark.jpg
---



# 编译原理



## 文法

$文法G=(V_T,V_N,P,S)$

$\begin{cases}V_T:非终结符\\V_N:终结符\\P:规则集\\S:开始符\\V_T\bigcap V_N:符号表\end{cases}$

$\begin{cases}\alpha\rightarrow \beta \in P \\0型文法:\alpha至少包含一个非终结符\\1型文法(上下文有关文法):\alpha至少包含一个非终结符,|\alpha|\leq|\beta|\\2型文法(上下文无关文法):\alpha\in V_T\\3型文法(正规文法):\alpha\in V_N\begin{cases}左线性文法:\beta\in \{Ba,a\}~B\in V_T~a\in V_N\\右线性文法:\beta\in \{aB,a\}~B\in V_T~a\in V_N\end{cases}\end{cases}$

$\rightarrow:推导\begin{cases}最左推导\\最右推导(规范推到)\end{cases}$

## 词法

- 正则表达式(正规式)

- 有穷自动机(DFA)：$M=(K,\Sigma,f,S,Z)$

  $\begin{cases}K:元素状态\\\Sigma:字母表\\f=K\times\Sigma\rightarrow K:状态装换函数\\S\in K:开始状态\\Z\subset K:结束状态\\L(M)=\{a|a\in\Sigma^*,f'(S,a)\in Z\}:M可接受符号串集合\end{cases}$

- 不确定有穷自动机(NFA)：$M=(K,\Sigma,f,S,Z)$

  $\begin{cases}K:元素状态\\\Sigma:字母表\\f=K\times\Sigma\bigcup\{\varepsilon\}\rightarrow \rho(K):状态装换函数(\rho(K)=K^+)\\S\subset K:开始状态\\Z\subset K:结束状态\\L(M)=\{a|a\in\Sigma^*,f'(S,a)\in Z\}:M可接受符号串集合\end{cases}$

### 正规文法$\Leftrightarrow$正规式

$\begin{cases}A\rightarrow xB,B\rightarrow y \Leftrightarrow A\rightarrow xy\\A\rightarrow xA|y\Leftrightarrow A\rightarrow x^*y\\A\rightarrow x,A\rightarrow y\Leftrightarrow A\rightarrow x|y\end{cases}$

### 正规式$\Rightarrow$NFA

![](https://s2.loli.net/2022/01/23/vOeb736h2jCRJl9.png)

![](https://s2.loli.net/2022/01/23/T3UqYQh9WV1M4bl.png)

### DFA$\Rightarrow$NFA

![](https://s2.loli.net/2022/01/23/qO2XWsPefLi6FcJ.png)

### DFA化简

![](https://s2.loli.net/2022/01/23/YiBbXUvCmMRleL3.png)

### DFA$\Rightarrow$程序

![](https://s2.loli.net/2022/01/23/MxTLtJ2lG9sq6an.png)



## 语法

### 自顶向下

- 最左推倒

- FIRST集：$First(A)=\{a|A\overset{*}{\Rightarrow}aB,a\in V_T\bigcup\{\varepsilon\}~A\in V_N~B\in V_N^*\}$
- FOLLOW集：$Follow(A)=\{a|S\overset{*}{\Rightarrow}AB,a\in FIRST(B),A\in V_N, B\in V_N^*\}$
- SELECT集：$Select(A\rightarrow BC)=\begin{cases}First(B)\\(First(B)-\{\varepsilon\})\bigcup Follow(B)\end{cases}$
- LL(1)文法：$\begin{cases}P不包含左递归\\A\rightarrow \alpha_1|\alpha_2|...|\alpha_n:FIRST(\alpha_i)\bigcap FIRST(\alpha_j)=\Phi\\如果FIRST(\alpha_i)=\varepsilon:FIRST(\alpha_j)\bigcap FOLLOW(A)=\Phi\end{cases}$

#### 消除左递归

$P\rightarrow Pa|b\Leftrightarrow \begin{cases}P\rightarrow bP'\\P'\rightarrow aP'|\varepsilon\end{cases}$

对于简介左递归，代入并按照直接左递归处理

#### 提取左公因子

$P\rightarrow \alpha\beta|\alpha\Leftrightarrow \begin{cases}P\rightarrow \alpha\beta'\\\beta'\rightarrow\beta|\varepsilon\end{cases}$

#### 计算FIRST集和FOLLOW集

![](https://s2.loli.net/2022/01/23/e1M9lWNpa8KOvfg.png)

![](https://s2.loli.net/2022/01/23/o2RtvZVCkwTmdWn.png)



#### 计算SELECT集

$SELECT(S\rightarrow \alpha)=\begin{cases}FIRST(\alpha)\quad if~\varepsilon\notin FIRST(\alpha)\\FIRST(\alpha)-\{\varepsilon\}+FOLLOW(\alpha)\end{cases}$

#### 判断LL(1)文法

- 判断是否有左递归
- 对于所有的推倒都必须符合$SELECT(S\rightarrow\alpha_1)\bigcap SELECT(S\rightarrow\alpha_2)=\Phi$



#### LL(1)文法$\Rightarrow$递归子程序

![](https://s2.loli.net/2022/01/23/RtKFksQ8u6SOynM.png)

#### LL(1)文法$\Rightarrow$ 预测分析法

- 通过SELECT集构造分析表

![](https://s2.loli.net/2022/01/23/PrmAgBqTxIkl7GD.png)



### 自底向上

- 算符优先
  
- 算符文法：没有两个相邻的非终结符
  
- 优先关系：$\begin{cases}a\eqcirc b:A\rightarrow \cdots ab\cdots 或A\rightarrow\cdots aQb\cdots\\a\lessdot b:A\rightarrow\cdots aR\cdots,R\overset{+}{\Rightarrow}b\cdots或R\overset{+}{\Rightarrow}Qb\cdots\\a\gtrdot b:A\rightarrow \cdots Rb\cdots,R\overset{+}{\Rightarrow}\cdots a或R\overset{+}{\Rightarrow}\cdots aQ\end{cases}$
  
- 简单(算符)优先文法：只存在优先关系之一，没有相同的右部规则
  
  ​	简单文法无二义性
  
- $FIRSTVT(P)=\{a|P\overset{+}{\Rightarrow}a\ldots或P\overset{+}{\Rightarrow}Qa\ldots,a\in V_T,Q\in V_N\}$
  
  - $LASTVT(P)=\{a|P\overset{+}{\Rightarrow}\ldots a或P\overset{+}{\Rightarrow}aQ,a\in V_T,Q\in V_N\}$
  
  - 算符优先函数：$\begin{cases}a\eqcirc b\Leftrightarrow f(a)=f(b)\\a\lessdot b \Leftrightarrow f(a)<f(b)\\a\gtrdot b \Leftrightarrow f(a)>f(b)\end{cases}$
  
- LR分析

  - 最左素短语：最左边高位2的树的边缘
  - 短语：$\alpha\beta\delta,S\overset{*}{\Rightarrow}\alpha A \delta,A\overset{+}{\Rightarrow}\beta$
  - 直接短语：$\alpha\beta\delta,S\overset{*}{\Rightarrow}\alpha A \delta,A\rightarrow\beta$
  - 句柄：最左边两层子树末端
  - 活前缀：不包含句柄之后的符号

#### 算符优先



##### 计算FIRSTVT集和LASTVT集

![](https://s2.loli.net/2022/01/23/YeRaomnZVGy3uQE.png)

![](https://s2.loli.net/2022/01/23/FMW6RboviCmNYVS.png)

##### 构造优先关系表

![](https://s2.loli.net/2022/01/23/ehE8PW37VsjLUIO.png)

##### 优先关系表$\Rightarrow$算符优先函数

压缩算符优先表

- $f(a)\leftarrow 1, g(a)\leftarrow 1,a\in V_T$

- 遍历每一个关系

  $a\eqcirc b,f(a)\neq f(b)\Rightarrow min\{f(a),g(b)\}\leftarrow max\{f(a),g(b)\}$

  $a\lessdot b,f(a)\geq g(b)\Rightarrow g(b)\leftarrow f(a)+1$

  $a\gtrdot b, f(a)\leq g(b)\Rightarrow f(a)\leftarrow g(b)+1$

- 重复上一步知道没有变化，如果$f,g$中有值大于$2V_T$则算符优先函数不存在

##### 算符优先分析

$栈顶\gtrdot a_i\Rightarrow 规约(相同优先级)$

$栈顶\lessdot 或\eqcirc a_i  \Rightarrow 移入$

![](https://s2.loli.net/2022/01/23/A7MhVvKLq1ozeUg.png)


#### LR(0)

##### LR文法$\Rightarrow$NFA

活前缀$\Rightarrow$NFA

![](https://s2.loli.net/2022/01/23/IOaPvX5f9u7Yspz.png)

##### LR文法$\Rightarrow$ DFA

![](https://s2.loli.net/2022/01/23/3gvzyek1aJOs9N4.png)

##### DFA$\Rightarrow$ 分析表

![](https://s2.loli.net/2022/01/23/arHiEp95hSJZOqC.png)

##### LR(0)分析

![](https://s2.loli.net/2022/01/23/EnU6s3QzmdMK7ex.png)

#### SLR(1)

解决 “移进-规约”冲突

$A\rightarrow\alpha\cdot a_i\beta\\B\rightarrow\alpha\cdot$

${a_i}\bigcap FOLLOW(B)=\Phi$

##### DFA$\Rightarrow$分析表

规约时只填入FOLLOW集所在的列

![](https://s2.loli.net/2022/01/23/e8AaMZWrh3g16ji.png)

#### LR(1)

解决“规约-规约” 冲突

##### LR文法$\Rightarrow$DFA

![](https://s2.loli.net/2022/01/23/VCDA4Em2cShknJO.png)

##### DFA$\Rightarrow$分析表

![](https://s2.loli.net/2022/01/23/nkbw3EmBV4SrWRl.png)

## 语义

语法+语义 = 语法制导翻译(SDD)

- $属性文法(G,V,F)\\G:文法\\V:符号属性集\\F:语义规则集$
- 注释分析树：每个节点都带有属性
- 综合属性：自下而上，或自己的属性
- 继承属性：自上而下，或兄弟节点
- S-属性文法：只有综合属性的文法
- L-属性文法：可以含继承属性
- 依赖图：（继承属性标在左侧）
- 复写规则：拷贝右边符号的值

#### 属性模式

![](https://s2.loli.net/2022/01/23/Sfg8jO9UQYtonqx.png)

#### 翻译模式

![](https://s2.loli.net/2022/01/23/RlDdeY1FT4LrZPb.png)

##### LL(1)$\Rightarrow$ LR

#### ![](https://s2.loli.net/2022/01/23/KOCw5ai1ng7tdsL.png)

![](https://s2.loli.net/2022/01/23/KOCw5ai1ng7tdsL.png)

![](https://s2.loli.net/2022/01/23/YhvBPgx5kltSbuZ.png)

#### L-翻译模式自底向上

![](https://s2.loli.net/2022/01/23/ktu6jRvVc8X9HsG.png)

![](https://s2.loli.net/2022/01/23/Y4Lq6XK1ug3lDIV.png)

![](https://s2.loli.net/2022/01/23/Vz5RLijDX9nsAqe.png)

![](https://s2.loli.net/2022/01/23/HViAoqvdLXsfmC9.png)