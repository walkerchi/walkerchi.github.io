---
title: "[HUST]数值分析"
description: 华中科技大学计算机学院数值分析笔记
date: 2020-11-13
bg: ./.images/booth.jpg
---




## 1.误差

$误差来源\left\{\begin{array}{} 模型误差:理想化模型导致 \\ 观测误差:测量设备导致 \\ 截断误差:无穷多项式取前N项导致 \\舍入误差:计算时对小数位数截断导致 \end{array} \right.$



$误差分类\left\{\begin{array}{}    误差:\varepsilon=x^\ast(测量值)-x(真实值)\\        绝对误差:\varepsilon(x^\ast) = |x^\ast- x| \leq \eta(x)(绝对误差限)              \\       相对误差: \varepsilon_r(x^\ast)=|\frac{x^\ast-x}{x^\ast}|     \\相对误差限: \eta_r=\frac{\eta}{|x^\ast|}            \end{array} \right.$



$误差限传递\left\{\begin{array}{}    \eta(x^\ast\pm y^\ast)=\eta(x^\ast)+\eta(y^\ast)  \\ \eta(x^\ast y^\ast)=|x^\ast|\eta(y^\ast)+|y^\ast|\eta(x^\ast) \\ \eta(\frac{x^\ast}{y^\ast})=\frac{|x^\ast|y^\ast+|y^\ast|x^\ast}{|y^\ast|^2}  \quad\quad\quad\quad y\neq0,y^\ast\neq0      \end{array} \right.$

$\begin{cases}       \eta(x)=\frac{1}{2}\times10^{n} \quad\quad\quad\quad n为x的小数位数 \\ x^ast有n位有效数字\Rightarrow\eta_r(x^\ast)=\frac{1}{2a_1}\times10^{-n+l} \\ \eta_r(x^\ast)=\frac{1}{2(a_1+1)}\times10^{-n+l}\Rightarrow有n位有效数字     \end{cases}$

****
## 2.曲线拟合

$\{x,x_0,\cdots,x_n\} \in [a,b]$  

$步长:h_i = x_{i+1}-x_i$

$基函数:l_i = \prod_{ \begin{array}{c} j=0 \\ j\neq i \end{array} }^{n}{\frac{x-x_j}{x_i-x_j}}$

$差值余项:R_n = f(x)-p_n(x)$

$n阶差商: f[x_0,x_1,\cdots,x_n]= \left\{\begin{array}{c} \frac{f[x_0,\cdots,x_{n-1}]-f[x_1,\cdots,x_{n}]}{x_0-x_n} \\ \sum_{i=0}^n{\frac{f(x_i)}{   \prod_{  \begin{array}{c} j=0 \\ j\neq i \end{array}  }^n{(x_i-x_j)}   }} \\ \frac{1}{n!}f^n(\xi) \end{array}\right.$

$\omega(x)=\prod_{i=0}^n(x-x_i)$

### 2.1基本差值法
$\begin{cases}                   Lagrange差值\begin{cases} L_n(x) = \sum_{i=0}^{n}{y_i l_i} \\  R_n = \frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x)\end{cases}     \\     Newton差值\begin{cases} N_n(x)=f(x_0)+f[x_0,x_1](x-x_0)+\cdots+f[x_0,x_1,\cdots,x_n](x-x_0)\cdots(x-x_{n-1})  \\  R_n=f[x,x_0,\cdots,x_n]\omega(x)\end{cases}     \\      Hermite差值\begin{cases}     H_{2n+1}(x)=\sum_{i=0}^n\phi_i(x)y_i+\sum_{i=0}^n\Phi_i(x)y'_i \\ =\sum_{i=0}^n\left[y_i\left(1-2(x-x_i)\sum_{\begin{array}{c}k=0 \\k\neq i \end{array}}^n{\frac{1}{x_i-x_k}}\right)l_i^2(x) + y'(x-x_i)l_i^2(x)  \right]   \\  R_n=\frac{f^{(2n+2)}(\xi)}{(2n+2)!}^2\omega(x)   \end{cases}               \end{cases}$

#### 2.1.1Lagrange差值
$L_n(x) = \sum_{i=0}^{n}{y_i l_i}$

$R_n = \frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x)$

#### 2.1.2Newton差值

$N_n(x)=f(x_0)+f[x_0,x_1](x-x_0)+\cdots+f[x_0,x_1,\cdots,x_n](x-x_0)\cdots(x-x_{n-1})$

$R_n=f[x,x_0,\cdots,x_n]\omega(x)$

#### 2.1.3Hermite 插值

$$H_{2n+1}(x)=\sum_{i=0}^n\left[y_i\left(1-2(x-x_i)\sum_{\begin{array}{c}k=0 \\k\neq i \end{array}}^n{\frac{1}{x_i-x_k}}\right)l_i^2(x) + y'(x-x_i)l_i^2(x)  \right]$$

$R_n=\frac{f^{(2n+2)}(\xi)}{(2n+2)!}\omega(x)^2$

### 2.2分段差值
#### 2.2.1分段线性差值
$s_1(x)=y_i\frac{x-x_{i+1}}{x_i-x_{i+1}}+y_{i+1}\frac{x-x_i}{x_{i+1}-x_i} \quad\quad\quad\quad x_i\leq x \leq x_{i+1}$

$|f(x)-s_1(x)| \leq \frac{1}{8}h_i^2 max_{a\leq x \leq b}|f''(x)|$

#### 2.2.2Hermite线性插值(不考)

$s_3(x) = y_i\phi_0(\frac{x-x_i}{h_i})+y_{i+1}\phi_1(\frac{x-x_i}{h_i})+h_iy'_0\Phi_0(\frac{x-x_i}{h_i})+h_iy_{i+1}\Phi_1(\frac{x-x_i}{h_i})$

$\begin{cases}\phi_0(x)=(x-1)^2(2x+1) \\ \phi_1(x) = x^2(-2x+3) \\ \Phi_0(x) = x(x-1)^2 \\  \Phi_1(x) = x^2(x-1)   \end{cases}$

$|f(x)-s_3| \leq \frac{h^4}{384}max_{a \leq x \leq b}|f^4(x)| \quad\quad\quad\quad h=max(h_i)$

$:384=2^4\times4!$

#### 2.2.3 三次样条差(不考)
$s_3(x) = y_i\phi_0(\frac{x-x_i}{h_i})+y_{i+1}\phi_1(\frac{x-x_i}{h_i})+m_ih_iy'_0\Phi_0(\frac{x-x_i}{h_i})+m_{i+1}h_iy_{i+1}\Phi_1(\frac{x-x_i}{h_i})	12$

$\begin{cases} \begin{cases} \phi_0(x)=(x-1)^2(2x+1) \\ \phi_1(x) = x^2(-2x+3) \\ \Phi_0(x) = x(x-1)^2 \\  \Phi_1(x) = x^2(x-1) \end{cases}  \\  \begin{cases}\begin{cases} \alpha_i=\frac{h_{i-1}}{h_{i-1}+h_i}   \\  \beta_i=3[(1-a_i)\frac{y_i-y_{i-1}}{h_{i-1}}+\alpha_i\frac{y_{i+1}-y_i}{h_i}]  \end{cases} \\ \begin{cases}(1-\alpha_i) m_{i-1}+2m_i+\alpha_im_{i+1}=\beta_i  \\ m_0=f'(x_0) \\ m_n=f'(x_n)\end{cases} \end{cases} \end{cases}$

### 2.3最小二乘法
#### 2.3.1直线拟合（线性回归）
$min(Q=\sum_{i=0}^n[y_i-(a+bx_i)]^2)$
$\Rightarrow \quad \frac{\partial Q}{\partial a}=0, \frac{\partial Q}{b}=0$
$\Rightarrow \begin{cases} Na + b\sum_{i=1}^Nx_i = \sum_{i=1}^Ny_i    \\   a\sum_{i=1}^Nx_i + b\sum_{i=1}^Nx_i^2=\sum_{i=1}^Nx_iy_i   \end{cases}$
$\Rightarrow \begin{cases}       a=\frac{\sum_{x=1}^Nx_i^2 \sum_{x=1}^Ny_i -(\sum_{x=1}^Nx_i)^2}{N\sum_{x=1}^Nx_i^2-(\sum_{x=1}^Nx_i)^2}      \\     b=\frac{\sum_{x=1}^Nx_i\sum_{x=1}^Ny_i - N\sum_{x=1}^Nx_iy_i}{N\sum_{x=1}^Nx_i^2-(\sum_{x=1}^Nx_i)^2}    \end{cases}$

#### 2.3.2多项式拟合(不考)

$min(\sum_{i=0}^n{(y_i-\sum_{j=0}^ma_jx_i^j)^2})$

****

## 3.积分与微分

### 3.1积分

#### 3.1.1差值型求积公式

$差值型积分\begin{cases}\int_a^bf(x)dx\approx\sum_{i=0}^n{A_if(x_i)} \quad\quad\quad\quad 至少有n+1阶代数精度 \\ A_i = \int_a^bl_i(x)dx\end{cases}$

$Newton-Cotes:\begin{cases}            Newton-Cotes公式:\begin{cases}\int_a^bf(x)dx\approx(b-a)\sum_{i=0}^nC_if(x_i) \quad\quad\quad\quad n为偶数时，代数精度至少为n+1阶 \\ C_i = \frac{(-1)^{n-i}}{n\cdot k!(n-k)!}\int_0^n\prod_{\begin{array}{c} j=0\\j\neq k \end{array}}^n(t-j)dt \end{cases}     \\       Newton-Cotes公式误差: R = \int_a^b\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x)dx       \end{cases}$

$\begin{cases} n>=8时，Newton-Cotes公式数值不稳定   \\   n为偶数时，Newton-Cotes公式的代数精度至少是n+1  \end{cases}$

$\begin{cases} 梯形公式:\begin{cases} \int_a^bf(x)dx\approx\frac{1}{2}(b-a)(f(a)+f(b)) \\代数精度:1 \\ R_T = -\frac{f''(\xi)}{12}(b-a)^3 \end{cases} \\ 中矩形公式(不考):\begin{cases} \int_a^bf(x)dx\approx(b-a)f(\frac{a+b}{2}) \\ 代数精度:1 \end{cases} \\ Simpson公式:\begin{cases}  \int_a^bf(x)dx \approx\frac{1}{6}(b-a)[f(a)+4f(\frac{a+b}{4})+f(b)]  \\ 代数精度:3 \\ R_S=-\frac{f^{(4)}(\xi)}{90}(\frac{b-a}{2})^5 \end{cases} \\ Cotes公式(不考)\begin{cases} \int_a^bf(x)dx\approx\frac{1}{90}(b-a)[7f(a)+32f(a+h)+12f(\frac{a+b}{2})+32f(a+3h)+7f(b)]\quad\quad\quad\quad h=\frac{b-a}{4} \\ 代数精度:5 \\ R_C = -\frac{8f^{(6)}(\xi)}{945}(\frac{b-a}{4})^7\end{cases}   \end{cases}$

#### 3.1.2复化求积公式
$\begin{cases}                     复化梯形公式 \begin{cases}  \int_a^bf(x)dx=\frac{h}{2}[f(a)+2\sum_{i=0}^{n-1}f(x_i)+f(b)] \\ R\approx-\frac{1}{12}(b-a)h^2f''(\eta)\quad\quad\quad\quad\eta\in[a,b]    \end{cases}\\     复化Simpson公式(不考)\begin{cases}  \int_a^bf(x)dx=\frac{h}{3}[f(a)+4\sum_{i=0}^nf(x_{2i-1})+2\sum_{i=1}^{n-1}f(x_{2i})+f(b)]\\ R\approx-\frac{1}{180}(b-a)(\frac{h}{2})^4f^{(4)}(\eta)\end{cases}\\    复化Cotes公式(不考)\begin{cases} \int_a^bf(x)dx=\frac{4h}{90}[7f(a)+32\sum_{i=1}^nf(x_{4i-3})+12\sum_{i=1}^nf(x_{4i-2})+32\sum_{i=1}^nf(x_{4i-1})+14\sum_{i=1}^{n-1}f(x_{4i})+7f(b)] \\ R\approx-\frac{2}{945}(b-a)(\frac{h}{4})^6f^{(6)}(\eta)\end{cases}                     \end{cases}$

#### 3.1.3Romberg求积公式

$\begin{cases}     梯形递推\begin{cases}T_{2n}=\frac{1}{2}T+\frac{h}{2}\sum_{i=0}^{n-1}f(x_{i+\frac{1}{2}})  \\  截断误差:I-T_{2n}\approx\frac{1}{3}(T_{2n}-T_n)\end{cases}               \\ 外推\begin{cases} S_n=\frac{4}{3}T_{2n}-\frac{1}{3}T_n \\ C_n=\frac{16}{15}S_{2n}-\frac{1}{15}S_n \\ R_n=\frac{64}{63}C_{2n}-\frac{1}{63}C_n \end{cases}  \end{cases}$

### 3.2微分(不考)

$Richardson\begin{cases}      G(h)=\frac{f(a+h)-f(a-h)}{2}\\G_1(h)=\frac{4}{3}G(\frac{h}{2})-\frac{1}{3}G(h)\quad\quad\quad\quad\quad4阶 \\ G_2(h)=\frac{16}{15}G_1(\frac{h}{2})-\frac{1}{15}G_1(h)\quad\quad\quad\quad6阶 \\ G_3(h)=\frac{64}{63}G_2(\frac{h}{2})-\frac{1}{63}G_2(h)\quad\quad\quad\quad8阶      \end{cases}$

*****

## 4常微分方程

$初始问题\begin{cases}y'=f(x,y) \\ y(x_0)=y_0\end{cases}$



$收敛条件:|\phi(x,y,h)-\phi(x,\overline{y},h)|<L_\phi|y-\overline{y}|(Lipschitz条件)\quad\quad\quad\quad\phi(x,y,h)=y_{n+1}-y_n$

$稳定条件:|\frac{y_{n+1}}{y_n}|\leq 1$

### 4.1尤拉法

$\begin{cases}      尤拉法: y_{n+1}=y_n+hf(x_n,y_n)\quad\quad\quad\quad精度:1阶 \\             隐式尤拉法:y_{n+1}=y_n+hf(x_{n+1},y_{n+1})\quad\quad\quad\quad精度:1阶 \\  二步尤拉法: y_{n+1}=y_{n-1}+2hf(x_n,y_n)\quad\quad\quad\quad 精度:2阶 \quad y_1由尤拉法求得      \end{cases}$

### 4.2梯形公式

$y_{n+1}=y_n+\frac{h}{2}[f(x_n,y_n)+f(x_{n+1},y_{n+1})]$

### 4.3Runge-Kutta法

$\begin{cases}   二阶龙格库塔法:\begin{cases}y_{n+1}=y_n+h(c_1k_1+c_2k_2) \\ k_1=f(x_n,y_n) \\ k_2=f(x_n+ph,y_n+phk_1)\end{cases}\\三阶龙格库塔法:\begin{cases}y_{n+1}=y_n+c_1k_1+c_2k_2+c3_k3\\ k_1=hf(x_n,y_n)\\ k_2=hf(x_n+a_2h,y_n+b_{21}k_1 \\ k_3=hf(x_n+a_3h,y_n+b_{31}k_1+b_{32}k_2)\end{cases}\\ \vdots   \end{cases}$

#### 4.3.1改进尤拉法

$y_{n+1} = y_n+\frac{h}{2}[f(x_n,y_n),y_n+hf(x_n,y_n)]$

$=\begin{cases}   y_{n+1}=y_n+\frac{h}{2}(k_1+k_2)\\ k_1=f(x_n,y_n) \\ k_2 =f(x_{n+1},y+hk_1)   \end{cases}$

$精度:2阶$

#### 4.3.2变形尤拉法(不考)
$\begin{cases}     y_{n+1}=y_n+hk_2  \\ k_1=f(x_n,y_n) \\ k_2=f(x_n+\frac{h}{2},y_n+\frac{h}{2}k_1)             \end{cases}$

#### 4.3.3四阶龙格库塔法（经典公式）

$\begin{cases}      y_{n+1}=y_n+\frac{1}{6}(k_1+2k_2+2k_3+k_4)\\k_1=hf(x_n,y_n)\\k_2=hf(x_n+\frac{h}{2},y_n+\frac{k_1}{2})\\k_3=hf(x_n+\frac{h}{2},y_n+\frac{k_2}{2})\\k_4=hf(x_n+h,y_n+k_3)        \end{cases}$                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

#### 4.5.4 Gill公式(不考)

$\begin{cases}      y_{n+1}=y_n+\frac{1}{6}[k_1+(2-\sqrt2)k_2+(2+\sqrt2)k_3+k_4]\\k_1 = hf(x_n,y_n)\\k_2=hf(x_n+\frac{h}{2},y_n+\frac{k_1}{2})\\k_3=hf(x_n+\frac{h}{2},y_n+\frac{\sqrt2-1}{2}k_1+\frac{2-\sqrt2}{2}k_2)\\k_4=hf(x_n+h,y_n-\frac{\sqrt2}{2}k_2+\frac{2+\sqrt2}{2}k_3)       \end{cases}$

****

## 5方程求根

### 5.1二分法

$不能求复根以及偶数根$

### 5.2迭代法

$y(x)=0\Rightarrow x=\phi(x)$

#### 5.2.1收敛性

$\phi(x)收敛条件:\phi(x^\ast)存在且|\phi'(x^\ast)|<1\quad且\quad\phi(x)\in[a,b]$

$\phi'(x^\ast)\neq0\Rightarrow线性收敛$

$\phi'(x^\ast)=0\quad且\quad\phi'(x^\ast)\neq0\Rightarrow平方收敛$

$lim_{n\rightarrow\infty}\frac{x_{n+1}-x^\ast}{(x_n-x^\ast)^m}=\frac{\phi^m(x^\ast)}{m!}\Rightarrow m阶收敛$

#### 5.2.2加速迭代

$\begin{cases}   \widetilde{x}_{k+1}=g(x_k)\\x_{k+1}=\widetilde{x}_{k+1}+\frac{a}{1-a}(\widetilde{x}_{k+1}-x_k)    \end{cases}$

$Aitken\begin{cases}       x_{k+1}^{(1)}=g(x_k)\\x_{k+1}^{(2)}=g(x_{k+1}^{(1)}) \\ x_{k+1}=x_{k+1}^{(2)}-\frac{(x_{k+1}^{(2)}-x_{k+1}^{(1)})^2}{x_{k+1}^{(2)}-2x_{k+1}^{(1)}+x_k}       \end{cases}$

### 5.3牛顿法

$x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}$

$初始值:|f'(x_0)|>|\frac{f''(x_0)}{2}||f(x_0)|\quad且\quad f''(x_0)\neq0$

#### 5.3.1 牛顿下山法(不考)

$x_{k+1}=x_k-\lambda\frac{f(x_k)}{f'(x_k)}\quad\quad\quad\quad0<\lambda\leq 1$

#### 5.3.2近似牛顿法(不考)

$x_{k+1}=x_k-\frac{f(x_k)}{c}$

#### 5.3.3弦截法(不考)
$x_{k+1}=x_k-\frac{f(x_k)}{f(x_k)-f(x_0)}(x_k-x_0)$

$线性收敛$

#### 5.3.4快速弦截法(不考)

$x_{k+1}=x_k-\frac{f(x_k)}{f(x_k)-f(x_{k-1})}(x_k-x_{k-1})$



