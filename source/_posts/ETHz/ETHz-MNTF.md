---
title: Mathematics for New Technologies in Finance
index_img: img/geometric_brownian_motion.png
banner_img: img/banner-building.jpg
date: 2023-8-30 00:10:00
category: "Note"
tags: [ETH Zürich, Mathematic, Finance, Deep Learning]
---

<div align="center">   <font size=8 color="#3282F6">MNTF</font>  <font size=6><strong>Mathematics for New Technologies in Finance</strong></font></div>

----

professor : Josef Teichmann

author : walkerchi

----

# Approximation

## Weierstrass 

**Weierstrass Approximation Theorem**

$A$ is dense in $C(\mathcal X,\R^m )=\{f_i|f_i\in C_{pw}^0, f_i\in \mathcal X\to \R^m,\mathcal X\subset \R^n\}$ if 

1. A contains all polynomial functions: $\mathcal P\subset A$
   1. $A$ is vector subspace of $C$ : $A\subset C(\mathcal X,\R^m)\quad $
      - $f_1(x)+f_2(x)=f_3(x)\quad \forall f_1,f_2\in A,\exists f_3\in A$
      - $cf_1(x)=f_2(x)\quad \forall c\in\R,\forall f_1\in A,\exists f_2\in A$
   2. $A$ is closed under multiplication : $f_1(x)f_2(x)=f_3(x)\quad \forall f_1,f_2\in  A,\exists f_3\in A$
   3. $A$ contains constant function : $f(v) = c\quad \forall v\in \mathcal X,\exists f\in A$
2. points seperation : $f(v)\neq f(w)\quad \forall v\neq w\and v,w\in\mathcal X$



for shallow NN with ReLU

- [ ] contains all polynomial functions
  - [ ] vector space
  - [ ] closed under multiplication
  - [x] contains constant function
- [x] points seperation

$\Rightarrow$ NN with ReLU is dense in $C(\mathcal X,\R^m)$



## Faber-Schauder

**Faber-Schauder basis** : $s_{n,k} = 2^{1+\frac{n}{2}}\int_0^t\psi_{n,k}(u)\text du\quad n,k\in\Z$

<img src="faber_schauder_basis.png" alt="img" style="zoom:67%;" />
$$
v = \sum_{n=0}^\infin \alpha_n b_n\quad \forall v\in  \R,\exists\alpha_n\in\R,\exists b_n\in \{s_{*,*}\}
$$
- equivalent to the linear combination of ReLU

**Haar function** : $\psi_{n,k}(t) =2^{n/2}\psi(2^nt-k)\quad n,k\in \Z\quad\psi(t) = \begin{cases}1&t\in[0, \frac{1}{2})\\-1&t\in[\frac{1}{2},1)\\ 0&\text{otherwise}\end{cases}$

<img src="haar_function.png" alt="img" style="zoom:50%;" />

- $\text{supp}(\psi_{n,k}) = [k2^{-n},(k+1)2^{-n})$
- $\int_\R \psi_{n,k}(t)\text dt = 0$
- $\Vert \psi_{n,k}\Vert_{L^2(\R)} = 1$
- $\int_\R \psi_{n_1,k_1}\psi_{n_2,k_2} \text d t=\delta_{n_1n_2}\delta_{k_1k_2}$



## Banach

$A$ is Banach space if :

1. Cauchy sequence : $\Vert f_m-f_n\Vert\le \epsilon\quad \forall \epsilon>0,\exists N_\epsilon\in \N,\forall m,n>N_\epsilon$
2. completeness : $\Vert f-f_m\Vert\le \epsilon \quad \forall \epsilon>0, m\to\infin$





---

# Signature

for path/curve $X_t\in \R^d$, $X_t=\begin{bmatrix}X^1(t)&X^2(t)&\cdots&X^d(t)\end{bmatrix}^\top$ ,  signature could determine the curve in tree like equivalences

n-th level of  signature : $S(X)_{a,b}^{i_1,i_2,\cdots,i_n}=\int_a^b\int_{a}^{t_{n-1}}\cdots \int_a^{t_2}\text dX_{t_1}^{i_1}\cdots \text dX_{t_n}^{i_n}\quad n \le d$

- $S(X)_{a,b}^{i_1,i_2,\cdots,i_n}\in \R^{n^{\otimes d}}$, it's a $d$ dimension tensor with each dimension  of span  $n$

signature : $S(X)_{a,b} = (1,S(X)_{a,b}^{i_1},S(X)_{a,b}^{i_1,i_2},\cdots,S(X)_{a,b}^{i_1,i_2,\cdots,i_d})$

- the maximum length of $S(X)_{a,b}$ is $d^0+d^1+d^2 + \cdots + d^d = \frac{d^{d+1}-1}{d-1}$
- the length of depth $M$ is $d^0 +  \cdots +d^{M} = \frac{d^{M+1} - 1}{d-1}$

normally we got : $X_a^i$ denotes $i$-th component at time  $a$ of vector of function $X$

- $S(X)_{a,b}^i = \int_a^b dX = X_b^i-X_a^i$

- $S(X)_{a,b}^{i,j} = \int_a^b\int_a^{t_2}dX_{t_1}^{i}dX_{t_2}^{j} =\int_a^b (X_{t_2}^i-X_a^i)dX_{t_2}^j\overset{X=\alpha t+\beta}{=} \frac{1}{2}(X_b^{i}-X_a^{i})(X_b^{j}-X_a^{j})$

- $S(X)_{a,b}^{i,j,k} = \int_a^b\int_a^{t_3}\int_a^{t_2}dX_{t_1}^{i}dX_{t_2}^{j}dX_{t_3}^{k} \overset{X=\alpha t+\beta}{=} \frac{1}{6}(X_b^{i}-X_a^{i})(X_b^{j}-X_a^{j})(X_b^{k}-X_a^{k})$

- shuffle product rule : $S(X)_{a,b}^IS(X)_{a,b}^J = \underset{K=\text{shuff}([I_1,\cdots,J_1,\cdots])}{\sum}S(X)_{a,b}^K$

  - example : $S(X)^{1}_{a,b} S(X)^2_{a,b} = S(X)^{1,2}_{a,b}+S(X)^{2,1}_{a,b}$

  



----

# Financial Market

> Notation
>
> - $S_t^i$ : $i$-th asset prices at time $t$, $S\in\R^{N\times {d+1}}$, normally $S^0$ represent bank account
> - $\phi_t^i$ : holdings/strategy in $i$-th assets at time $t$  
> - $V_t$ : value of portfolio at time $t$ , $V_t = \sum_i \phi_t^i S_t^i$

self-financing : $\text dV(t) = \sum_{i=1}^n \phi^i(t)\text dS^i(t)$

- $\sum_i \phi^i_{t+1}S_t^i = \sum_i\phi_t^i S_t^i\quad\forall t\in[0,N)$

value process : $V_{t+1}-V_t = \sum_i\phi_t^i(S_{t+1}^i-S_t^i)\quad \forall t\in[0,N)$

martingale : $\mathbb E[X_{n+1}|X_1,\dots,X_n] = X_n$

arbitrage : $\underbrace{P(V_t\ge  0 )=1}_{\text{no risk of losing money}}\and \underbrace{P(V_t\neq 0) >0}_{\text{portfolio value > 0}}\quad t\in (0,T),\underbrace{V_0=0}_{\text{requires no initial value}}$

## Stochastic Differential Equation

**Brownian motion/Wiener process** : $W_{t+1} - W_t \sim \mathcal N(0,1)\quad W_0=0\rightarrow W_t$

**Geometric Brownian motion** : $dS_t = \mu ~S_t~ dt + \sigma~ S_t~ dW_t\Leftrightarrow S_t = S_0 e^{\left(\mu - \frac{\sigma^2}{2}\right)t+\sigma W_t}$

- $W_t$ is brownian motion/wiener process
- $\mu,\sigma$ is the expectation/variance for the GBM

<img src="geometric_brownian_motion.png" alt="img" style="zoom:50%;" />

## Utility

utility function $u$ : the additional utility or satisfaction from consuming one more unit of a good decreases as more of the good is consumed.

- concave : $f''(x)<0$
- monotone increase : $f'(x)>0$

<img src="utility.png" alt="img" style="zoom:80%;" />

expected utility optimization problem : $\underset{\phi_t^i}{\text{argmax}}\mathbb~E[u(V_N)]$

**Local Volatility Model** : $\text  d S_t = rS_t\text d t+\sigma(S_t,t)S_t\text dW_t$

- $S_t$ : underlying asset  price at time $t$

- $r$ risk-free interesting rate

- $\sigma(S_t,t)$ : local volatility function

- $W_t$ is the Brownian motion/ Wiener  process

**Local Stochastic volatility model** : $\begin{aligned}\text d S_t &= \mu S_t \text d t+\sqrt{\nu_t}  S_t \text dW_t\\ \text d\nu_t &= \alpha_{t}(\nu)\text dt + \beta_{t}(\nu)\text d W'_t\end{aligned}$

- $\alpha_{t}(\nu),\beta_{t}(\nu)$ : functions based on $\nu$
- $W_t,W'_t$ : Wiener process with correlation factor $\rho$
- $\nu_t$ : model the variance of $S_t$, it relies on another stochastic process, so LSV is not a standard SDE

**Heston model** : $\text d\nu_t = \kappa(\theta-\nu_t)\text dt +\xi \sqrt{\nu_t}\text d W'_t$

- $\theta$ : long term variance
- $\kappa$ : rate of variance reverts toward it's long  term
- $\xi$ :  volatility of volatility, the variance of $\nu_t$

- ambitious approach
  - modeling $\theta,\kappa,\xi,\rho,\mu$ where $\rho$ is the correlation between $W_t,W'_t$
- modest approach
  - modeling $\theta, \kappa,\xi$ , and $\rho,\mu$ from emperical

**Ito's lemma** : $\text d f(S,t) =  \left(\frac{\partial f}{\partial t} + \mu\frac{\partial f}{\partial S}+\frac{1}{2}\sigma^2\frac{\partial^2 f}{\partial S^2}\right)\text dt + \sigma\frac{\partial f}{\partial S}\text dW_t\quad \underbrace{\text dS(t)=\mu \text dt+\sigma \text d W_t}_{\text{Stochastic Differential Equation}}$

**Black Scholes equation** : $\frac{\partial C}{\partial t}  + rK\frac{\partial C}{\partial K} +\frac{1}{2}\sigma^2 K^2\frac{\partial^2  C}{\partial K^2}-rC= 0$ : derive from Ito's lemma

- $C(K,t)$ : European call option price, equivalent  to value $V$
- $K$ : strike price, equivalent to assets/stock price $S$

**Dupire's formula** : $-\frac{\partial C}{\partial T}-rK\frac{\partial C}{\partial  K}+\frac{1}{2}\sigma^2K^2\frac{\partial^2  C}{\partial  K^2}-\Delta C=0$ 

- when $r=0$ , $\sigma^2 = \frac{2\partial_T C}{K^2\partial^2_K  C}$

**Breeden-Litzenberger fromula** : $\partial^2_K C(T,K)\text dK = p_T(K)\text d K$

- $p_T(K)\text dK$ is the risk neural  probability, $p_T(K) = p(S_t\in[K,K+\text dK])$

----

# Deep  portfolio optimization

$$
\text d S_t = S_t\mu \text d t+S_t\sigma\text d W_t
\\
\text dX_t = \alpha_t X_t\frac{\text dS_t}{S_t} + (1-\alpha) X_t r\text dt\quad 
\\
\underset{\alpha}{\text{max}}~\mathbb E[u(X_T)]
$$

- $X_t$ is the money at time $t$
- $\alpha_t$ is strategy how much portion of money in the stock rather than in the bank at time $t$
- $S_t$ is the stocks prices, governed by parameter $\mu$ and $\sigma$ ,  with $W_t$ a brownian motion or wiener process
- $r$ is the interest rate saved in bank
- $u$ is the utility function ,normally $u(x)=\frac{x^\gamma -1}{\gamma}$

**analytical solution** : $\alpha^* = \frac{\mu-r}{\sigma^2(1-\gamma)}$

----

# Deep Hedging

$$
\text d S_t = S_t\mu \text d t+S_t\sigma\text d W_t
\\
\underset{H,\pi}{\text{min}}~\mathbb E\left[\left\Vert f(S_T) - \pi - \int_0^T H_t\text dS_t\right\Vert^2\right]
$$

- $S_t$ is the risky stocks prices, governed by parameter $\mu$ and $\sigma$ ,  with $W_t$ a brownian motion or wiener process
- $f(S_t)$ is financial claim, the payoff is $f(S_T)=\text{max}(S_T-K,0)$  for European call, $K$ is the strike price
- $\pi$ the price of the option, the upfront payment you received
- $H_t$ is the hedge strategy at time $t$
- $T$ is the expire date

----

# Deep Calibration

## Heston Calibration

$$
\text dX_t = \left((q-r)-\frac{1}{2}Y_t\right)\text d  t +\sqrt  {Y_t}\text d W_t^1
\\
\text dY_t = (\theta-\kappa Y_t)\text d  t +\sigma\sqrt{Y_t}\text  dW^2_t
\\
\underset{\theta,\kappa,\sigma}{\text{argmin}}\sum_{t=0}^T\Vert X_t-\text {log}(S_t)\Vert^2
$$

- $r$ : interest rate
- $q$ : dividend
- $S_t$ : price of assets
- $X_t$ : predicted log price : $X_0 = \text{log}(S_0)$
- $Y_t$ : variance of Heston model : $Y_0 = \nu_0$

## Utility Calibration

$$
dS_t = S_t\alpha_t l(t,S_t)\text dW_t
\\
\underset{l}{\text{argmin}} \left\Vert\mathbb E\left[\text{max}(S_T-K,0) - C(K,T)- \int_0^T H_t\text dS_t\right]\right\Vert^2
$$

- $\alpha_t$ is exogenous process at time
- $l(t, S_t)$ is  leverage function
- $S_t$ is the stocks prices,  with $W_t$ a brownian motion or wiener process
- $H_t$ is the hedge strategy at time $t$
- $K$ is the strike price of European call
- $C$ is the European call option market price

----

# Deep Simulation

model controlled  differential equation
$$
\text d X_t = \sum_{i=0}^d  \sigma(A_iX_t+b_i)\text du_i(t)
$$

- $A_i, b_i$ are randomly generated matrices/vectors
- $u_i$  is control coefficient learned by network
- $\sigma$ is the sigmoid//tanh function

----

# Reinforcement  Learning

- $a,s$ : action $a\in A$, state $s\in  S$
- $V,V^*$ : value function, optimal value function, $V\in S\times T\to\R$
- $\pi(s)$ : policy , $\pi \in S\to A$
- $c(t,s,a)$ : cost function , $c\in T\times S\times A\to \R$
- $r,R(s,a)$ : reward, reward function , $r\in \R, R\in S\times  A\to \R$
- $Q(s,a)$ ：Q/state action function, return  the priority for each state and action, $Q\in S\times A\to \R$

**[DPP] Dynamic programming principle** : $V^*(t,s)=\underset{a}{\text{max}}\left\{\int_t^T c(\tau,s(\tau),a(\tau))\text d\tau+V*(T,s(T))\right\}$

- $V(s) = \underset{a}{\text{max}}\left(R(s,a)+\gamma\underset{s'\in S}{\sum}P(s'|s,a)V(s')\right)$

**[HJB] Hamiton-Jacobi-Bellman equation** : $\frac{\partial V(s,t)}{\partial t} + \underset{a}{\text{max}}\left(\frac{\partial V(s,t)}{\partial s}\cdot  f(t,s,a)+c(t,s,a)\right)=0$

- $f(t,s,a)$ : system dynamics, how state change over time, $\frac{\text d s(t)}{\text dt} = f(t,s,a)$
- $V^*(s) = \underset{a\in A}{\text{max}}  \left(R(s,a)+\gamma  \underset{s'\in S}{\sum}P(s'|s,a)V^*(s')\right)$

**Bellman equation** : $Q(s,a) = r+\gamma~\underset{a'}{\text{max}}~Q(s',a')$

**Value  Iteration** : $V^{(n+1)}=\underset{a}{\text{max}}\left\{R(s,a)+\gamma \sum_{s'}P(s'|s,a)V^{(n)}(s')\right\}$

**Policy Iteration** : $\begin{aligned}V^{\pi^{(n)}}(s)  &= R(s,\pi(s))+\gamma\sum_{s'}P(s'|s,\pi(s))V^{\pi^{(n)}}(s')\\\pi^{(n+1)}&=\underset{\pi}{\text{argmax}}\left\{R(s,a)+\gamma\sum_{s'} P(s'|s,a)V^{\pi^{(n)}}(s')\right\}\end{aligned}$

**Q learning**_(environment-known/model-based)_ : $Q(s,a)\gets R(s,a)+\sum_{s'} P(s'|s,a)\left[\gamma~\underset{a'}{\text{max}}~Q(s',a')\right] $

**Q learning**_(environment-unknown/model-free)_ : $Q(s,a)\gets (1-\alpha)Q(s,a)+\alpha\left[r+\gamma~\underset{a'}{\text{max}}~Q(s',a')-Q(s,a)\right]$

----

# Optimization

**inverse calibration** : $\underset{\theta}{\text{argmin}}\Vert \textbf d - \mathcal {NN}_\theta\Vert^2$

- $\textbf  d$  is the observed data
- $\mathcal {NN}_\theta\quad \theta\in\Theta$ is the pool of  the model 

**optimization approach**  : $\underset{\theta}{\text{argmin}}\Vert \textbf d-\mathcal{NN}_\theta\Vert^2 +  \lambda R_\theta$

- $\theta$ model parameters
- $R_\theta$ : regularization term ($|\cdot|$ : lasso(L1) or $\Vert\cdot\Vert^2$ :  ridge(L2))

## bayesian optimization : 

$$
P(M_i|\textbf d)  = \frac{P(\textbf d|M_i)P(M_i)}{P(\textbf d)}\propto P(d|M_i)P(M_i)
$$

- $P(M_i|\textbf d)$ posterior probability of model $M_i$ given data  $\textbf d$
- $P(\textbf d|M_i)$ likelihood of  data given model  $M_i$
- $P(M_i)$ : prior probability of model $M_i$
- $P(\textbf d)$ : evidence likelihood

for  linear  model $Y\sim \mathcal N(\theta  X,\sigma^2\textbf I), \theta\sim\mathcal N(0,\tau^2\textbf I)$, the maximizing posterior of $p(\theta|x,y)$ is ridge regression:
$$
\begin{aligned}
\underset{\theta}{\text{argmax}} ~p(\theta|x,y) &\propto \underset{\theta}{\text{argmax}}~p(\theta)p(y|x,\theta)
\\
&\propto \underset{\theta}{\text{argmax}}~\text{exp}\left(-\theta^\top \textbf I\theta /\tau^2 \right)~\text{exp}\left(-(y-\theta x)^\top \textbf I(y-\theta x)/\sigma^2\right)
\\
&\propto \underset{\theta}{\text{argmin}}~\frac{\sigma^2}{\tau^2}\Vert\theta\Vert^2 + \Vert y-\theta x\Vert^2
\end{aligned}
$$
**[SGLD] Stochastic Gradient Langevin Dynamics** : gradient descent plus noise : 
$$
\text d\theta_t = \frac{1}{2}\nabla\text{log}~p(\theta_t|x_1,\dots,x_n)\text dt + \text  dW_t
$$

- escape from local minimal 



