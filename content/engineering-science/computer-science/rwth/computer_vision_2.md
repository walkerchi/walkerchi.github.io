---
title: "[RWTHAachen]Computer Vision 2"
image: https://s2.loli.net/2022/06/18/8XYy9qx5zKhnBmg.png
description: "Outline of Computer Vision 2 :)"
author : "mingyuan chi"
date: 2021-02-01
---



# Single-Object  Tracking

## Background modeling

simple and fast

### Simple Background Models

Assumption: 

- camera is static
- objects that move are important

#### Simple Background Subtraction

$$
threshold(|I(t)-B|)
$$



<img src="https://s2.loli.net/2022/02/04/rNMtfiCAWsTYRqQ.png"/>

1. ghost shadow, object's  moving lead to two objects

   <img src="https://s2.loli.net/2022/02/04/jNmncxYe3X7gaO1.png" height="200px"/>

2. illumination changes

   <img src="https://s2.loli.net/2022/02/04/HzCQrSdJwykxhIj.png" height="200px"/>

3. global threshold is often suboptimal

   <img src="https://s2.loli.net/2022/02/04/RlsK3CXUySPbhcv.png" height="200px"/>

#### Simple Frame  Differencing

$$
threshold(|I(t)-B(t-1)|)
$$

<img src="https://s2.loli.net/2022/02/04/IKHSukRe8Btza5W.png"/>

Props:

- quick to adapt to change of lighting, camera motion

Cons:

- only detect uniform color object
- cannot detect an object moving toward or away from camera

#### Temporal Scale

$$
D(N)=threshold(|I(t)-I(t+N)|)
$$

#### Three Frame Differencing

$$
D(N)\&D(-N)
$$

#### Adaptive Background Subtraction

$$
threshold(|\alpha I(t)+(1-\alpha)B(t-1)|)
$$

<img src="https://s2.loli.net/2022/02/07/3YDz1FoPHajBWNG.png"/>

### Statistical Background Models

#### Single Gaussian

$$
\begin{aligned}
\hat{\mu}&=\frac{1}{N}\sum^Nx_n\\
\sigma^2 &= \frac{1}{N-1}\sum^N(x_n-\hat\mu)^2
\end{aligned}
$$

**online adaptation**

running estimation
$$
\begin{aligned}
\hat\mu^{t+1}&=\hat\mu^t+\frac{1}{N}x^{t+1}-\frac{1}{N}x^{t+1-T}\\
{\hat\sigma^2}^{t+1}&={\hat\sigma^2}^t+\frac{1}{N-1}(x^{t+1}-\hat\mu^{t+1})^2-\frac{1}{N-1}(x^{t+1-T}-\hat\mu^{t+1-T})^2
\end{aligned}
$$
exponential moving average filter
$$
\begin{aligned}
\hat\mu^{t+1}&=(1-\alpha)\hat\mu^t+\alpha x^{t+1}\\
{\hat\sigma^2}^{t+1}&=(1-\alpha){\hat\mu^2}^t+
\alpha (x^{t+1}-\hat\mu^{t+1})^2
\end{aligned}
$$
Cons:

- a single gaussian is insufficient
- sensitivity

#### Mixture  of  Gaussian 

**Stauffer-Grimson Background Model**

$M_{k,t}$ : $M_{k,t}=1$ iff $k$ is the gaussian that match, else 0
$$
\begin{aligned}
p(x)&=\sum_{k=1}^K\pi_k\mathcal N(x|\mu_k,\Sigma_k)\\
\Sigma_k&=\sigma_k^2I
\end{aligned}
$$

- if $|x_i-\mu_k|>2.5\sigma_k$ replace least probable gaussian with  $\mathcal N(x_i,\sigma_k)$ , high $\sigma_k$ small $\pi_k$

- else 
  $$
  \begin{aligned}
  \pi_k&=(1-\alpha)\pi_k^t+\alpha M_{k,t}\\
  \mu_k^{t+1}&=(1-\rho)\mu_k^t+\rho x^{t+1}\\
  \Sigma_k^{t+1}&=(1-\rho)\Sigma_k^t+\rho(x^{t+1}-\mu_k^{t+1})^2\\
  \rho&=\alpha\mathcal N(x_n|\mu_k,\Sigma_k)
  \end{aligned}
  $$

- order the component by $\frac{\pi_k}{\sigma_k}$, background $B=argmin_b(\sum_{k=1}^b\frac{\pi_k}{\sigma_k}\gt\tau)$

#### Kernel Background Model

$x^t$ : pixel at time $t$

$K$ : kernel function

$\tau$ : threshold
$$
p(x^t)=\frac{1}{N}\sum_{i=1}^NK(x^t-x^i)
$$
foreground if $p(x^t)<\tau$





## Template-based tracking

wrap and match

### Lucas Kanade Optical Flow Estimation

#### Assumption&Symbols

- Brightness constancy: the same point looks same everywhere $I(x,y,t)=I(x+dx,y+dy,t+dt)$
- Small motion: points do not move very  far 
- Spatial coherence: points move like their neighbors (why we should define a window)

$I$ : current image  

$I_x$ : current image derivative in row

$I_y$ : current image derivative  in column

$u$ : small movement in row direction

$v$ : small movement in column direction

$T$ : Template image 

$W$ : warpping 

$p$ : warpping parameters

$x$ : pixel

#### Analytical Solution

take a $2\times2$ window for an example $I_x$ represent direvative of all pixels in the window here:
$$
\left[\begin{matrix}
I_x(x_0)&I_y(x_0)\\
I_x(x_1)&I_y(x_1)\\
I_x(x_2)&I_y(x_2)\\
I_x(x_3)&I_y(x_3)
\end{matrix}\right]
\left[\begin{matrix}
u\\v
\end{matrix}\right]=
-
\left[\begin{matrix}
I_t(x_0)\\I_t(x_1)\\
I_t(x_3)\\I_t(x_4)
\end{matrix}\right]
$$
normalize as 
$$
\left[\begin{matrix}
I_x^TI_x&I_x^TI_y\\
I_x^TI_y&I_y^TI_y
\end{matrix}\right]
\left[\begin{matrix}
u\\v
\end{matrix}\right]=
-\left[\begin{matrix}
I_x^TI_t\\
I_y^TI_t
\end{matrix}\right]
$$

problems:

1. Errors from non-linear $\rightarrow$ iterative LK refinement
2. large motions $\rightarrow$ coarse-to-fine

#### Numerical Solution

$$
L(p)=argmin_p\sum _x\left[I(W(x;p))-T(x)\right]^2\\
\frac{\partial L(p+\Delta p)}{\partial \Delta p}\rightarrow  0
$$

$$
\begin{aligned}
\Delta p &= H^{-1}\sum_{x}[\gradient I\frac{\partial W}{\partial p}]^T[T(x)-I(W(x;p))]\\
J &= \frac{\partial W}{\partial p} 
\\
H&=\sum_x[\gradient I\frac{\partial W}{\partial p}][\gradient I \frac{\partial W}{\partial p}]
\\
p&\leftarrow p+\Delta p
\end{aligned}
$$

<img src="https://s2.loli.net/2022/01/28/e1o9RWcMri4KEDJ.png" height="550px"/>

#### Warping Functions

Translation : $W([x,y];p)=\left[\begin{matrix}x+p_1\\y+p_2\end{matrix}\right]$

Affine: $W([x,y];p)=\left[\begin{matrix}x+p_1x+p_3y+p_5\\y+p_2x+p_4y+p_6\end{matrix}\right]$

Perspective : $W([x,y];p)=\frac{1}{p_7x+p_8y+1}\left[\begin{matrix}x+p_1x+p_3y+p_5\\y+p_2x+p_4y+p_6\end{matrix}\right]$

#### Shapes

Steepest Descend Image : $[H_{template},W_{template},|p|]$

Jacobian at $p_0$ : $[H_{template},W_{template},2,|p|]$

Hessian : $[|p|,|p|]$



#### Improvement&Cons

**Iterative LK Refinement** 

- estimate velocity at each pixel using one iteration of LK estimation
- warp one image toward the other using the estimated flow field
- refine estimate by repeating the process

**Coarse-to-fine** overcome temporal aliasing

run the LK algorithm iteratively on each image scale in the gaussian pyramid from small to large

<img src="https://s2.loli.net/2022/01/28/zVg92Y5yke6wjCs.png" height="400" />

- Prone to local minima (why window cannot be big )
- Relatively small movement (why window cannot be small)
- Taylor expansion only valid in a small neighborhood around $p$



## Tracking by online classification

shift and learn

### Online Boosting

<img src="https://s2.loli.net/2022/02/07/SmM3Wxd8jLwo1yN.png" height="400px"/>

**adaboost**

### Online Classification

<img src="https://s2.loli.net/2022/02/07/Rv4lnEYfVxeaJyW.png"  height="400px"/>

**problem**: drift

when the change is slow enough, the classifier adapt to new objects, it still confident about it.

**solution**: 

1. match against initialization

   can't follow appearance changes

2. semi supervised learning

3. using additional cues



## Tracking by detection

detect and locate

<img src="https://s2.loli.net/2022/02/07/6woLIntCqzpBKJY.png" height="300px"/>

### SVM based Detectors

#### HOG

<img src="https://s2.loli.net/2022/02/07/ER6zprcLuDon1Ai.png" height="200px"/>

#### DPM

<img src="https://s2.loli.net/2022/02/07/XicJZuLI3GhpRNB.png" height="400px"/>

### AdaBoost based Detectors

#### Viola-Jones

<img src="https://s2.loli.net/2022/02/07/GRCip6DchAEyXfL.png" height="250px"/>

#### VeryFast

<img src="https://s2.loli.net/2022/02/07/jCIa4BkvgzQeld8.png"  height="200px"/>

<img src="https://s2.loli.net/2022/02/07/OcVFGKM5N83SWn2.png" height="300px"/>

### CNN-based Detectors

#### R-CNN

<img src="https://s2.loli.net/2022/02/07/43DerfvEHx8W5Qz.png"  height="300px"/>

<img src="https://s2.loli.net/2022/02/07/8dMmj3hXuWPepI5.png" height="300px"/>

# Bayesian Filtering

$$
\begin{aligned}
x_t &=f(x_{t-1},\epsilon_{t})\\
y_t &=h(x_t,\delta_{t})
\end{aligned}
$$

<img src="https://s2.loli.net/2022/01/28/mjSKPotUd7ZXwxY.png" height="150px"/>

## Kalman Filters

predict and correct

### Symbols

$x_t$ :  state at time $t$

$y_t$ : observation at time $t$

$x_t^-$ : predicted state at time $t$

$x_t^+$ : corrected  state at time $t$

$D_t$ : state transition matrix 

$M_t$ : observation matrix

$\Sigma_t$ : state transition covariance at time  $t$

$\Sigma_{d_t}$ : uncertainty of $D_t$, usually diagonal

$\Sigma_{M_t}$ : uncertainty of $M_t$, usually diagonal

$K_t$ : Kalman gain

### Solution

Assumption:
$$
\begin{aligned}
x_t &= D_tx_{t-1}+\epsilon_t
\\
y_t &= M_tx_t+\delta_t
\end{aligned}
$$
Predict:
$$
\begin{aligned}
x_t^- &= D_tx_{t-1}^+\\
\Sigma_t^-&=D_t\Sigma_{t-1}^+D_t^T+\Sigma_{d_t}
\end{aligned}
$$
Correct:
$$
\begin{aligned}
K_t &= \Sigma_t^-M_t^T(M_t\Sigma_t^-M_t^T+\Sigma_{m_t})^{-1}
\\
x_t^+&=x_t^-+K_t(y_t-M_tx_t^-)
\\
\Sigma_t^+&=(I-K_tM_t)\Sigma_t^-
\end{aligned}
$$

some example of $D_t$

- constant velocity $\left[\begin{matrix}I&\Delta tI\\\bold 0&I\end{matrix}\right]$
- constant acceleration $\left[\begin{matrix}I&\Delta tI&\frac{1}{2}\Delta t^2I\\\bold 0&I&\bold \Delta tI\\\bold 0&\bold 0&I\end{matrix}\right]$



Dynamics model : $x_t\sim \mathcal N(D_tx_{t-1},\Sigma_{d_t})$
Observation model : $y_t\sim \mathcal N(M_tx_t,\Sigma_{m_t})$

### Improvement

**Extended Kalman Filter**

Assumption:
$$
\begin{aligned}
x_t &= g(x_{t-1})+\epsilon_t
\\
y_t &= h(x_t)+\delta_t
\end{aligned}
$$
Prediction:
$$
\begin{aligned}
x_t^- &= g(x_{t-1}^+)
\\
\Sigma_t^- &= G_t\Sigma_{t-1}^+G_t^T+\Sigma_{d_t} 
\\
G_t &= \left.\frac{\partial g(x)}{\partial x}\right|_{x=x_{t-1}^+}
\end{aligned}
$$
Correction:
$$
\begin{aligned}
K_t &= \Sigma_t^-H_t^T(H_t\Sigma_t^-H_t^T+\Sigma_{m_t})^{-1}
\\
x_t^+&=x_t^-+K_t(y_t-h(x_t^-))
\\
\Sigma_t^+&=(I-K_tH_t)\Sigma_t^-
\\
H_t&=\left.\frac{\partial h(x)}{\partial x}\right|_{x=x_t^-}
\end{aligned}
$$



## Particle Filters

predict and correct

<img src="https://s2.loli.net/2022/01/29/NXCbVFjGhAx5ilt.png" height='300px'/>

### Symbols

$x_t$ :  state at time $t$

$y_t$ : observation at time $t$

$y_{1:t-1}$ : observations from time $1$ to time $t-1$

$w_t^i$ : weight  of particle $i$ at time $t$

$\tilde{w_t^i}$ : unnormalized weight of particle $i$ at time $t$

$p(x_t|x_{t-1}^i)$ : probability density function of $x_t$ under the condition of $x_{t-1}^i$

$N_{eff}$ : effective sample size $N_{eff}\propto\frac{1}{\sum(w_t^i)^2}$

### Solution

Assumption:
$$
\begin{aligned}
P(x_t|y_{1:t-1}) &= \int_{dx_{t-1}}P(x_t|x_{t-1})P(x_{t-1}|y_{1:t-1})dx_{t-1}\\
P(x_t|y_{1:t})&\propto P(y_t|x_t)P(x_t|y_{1:{t-1}})
\end{aligned}
$$
Monte-Carlo sampling
$$
E(f(x))\approx\frac{1}{N}\sum_{n=1}^Nf(x_n)
$$
Sequence Importance Sampling (if not most particles have negligible weights)
$$
\begin{aligned}
\tilde{w_t^i}&=w_{t-1}^ip(y_t|x_t^i)\\
x_t^i&\sim p(x_t|x_{t-1}^i)\\
w_t^i&=\frac{\tilde{w_t^i}}{\sum_{i=1}^N \tilde{w_t^i}}
\end{aligned}
$$
Sampling Importance Resampling
$$
\hat{x_t^i}\sim p(x_t|x_{t-1}^i)\\
x_t^{1:N}=\{\hat{x_t^i}|i\sim p(y_t|\hat{x_t^i})\}
$$
Particle Filtering

1. $x_t^{1:N},w_t^{1:N}=SIS(x_{t-1}^{1:N},w_{t-1}^{1:N},y_t)\\$
2. $if\quad N_{eff}<N_{thr}\quad x_t^{1:N},w_t^{1:N}=resample(x_t^{1:N},w_t^{1:t})$ 

### discussion

pros:

- represent arbitrary distribution compared to KF
- keep track of as many hypotheses as there are particles
- multimodal support

# Multi-Object Tracking

predict and match

## NN Assignment

<img src="https://s2.loli.net/2022/02/04/aFNI8sOVeAqow5h.png" height="200px"/>

### Symbols

$x_l$ : track $l$

$x_l^{(k)}$ : prediction

$\Sigma_{p,l}^{(k)}$ : covariance of $x_l^{(k)}$

### Solution

innovation : $v_{j,l}^{(k)}=(y_j^{(k)}-x_{p,l}^{(k)})$

gating or validation volumne : $V^{(k)}(\gamma)=\{y|(y-x_{p,l}^{(k)})^T\Sigma_{p,l}^{(k)-1}(y-x_{p,l}^{(k)})\le\gamma\}$

### Discussion

1. too small validation volume $\rightarrow$ permaturly end tracks
2. too big validation volume $\rightarrow$ tracks may not end

## Track Splitting Filter

$$
\lambda_l(k)=\lambda_l(k-1)+{v_{i_k,l}^k}^T{\Sigma_l^k}^{-1}v_{i_k,l}^k
$$

### pruning

- delete unlike tracks
- marge track nodes
- keep most likely N tracks



## Multi Hypothesis Tracking

Linear Assignment Problem

### Solution

Nearest Neighbor Matching

find nearest neighbor within gating $\gamma$

- Greedy Algorithm

  cannot find the optimal solution

- Hungarian Algorithm

  Also known as **Kuhn-Munkres Algorithm** 

  complexity: $O(n^3)$



## Network Flow Optimization

<img src="https://s2.loli.net/2022/01/29/o3XfvSeAr5kgCda.png" height="300px"/>

### Symbols

$\beta$ : false alarm rate 

$C_i$ : $C_i=log\frac{\beta_i}{1-\beta_i}$ likelihood of detection of edge $i$ 

### Solution

$$
\tau = argmin(\sum_i C_{in,i}f_{in,i}+\sum_i C_{i,out}f_{i,out}+\sum_{i,j}C_{i,j}f_{i,j}+\sum_i C_if_i)
$$



### Pros&limitations

- Pros
  1. efficient algorithms available
  2. global optimal solution
- Limitations
  1. $C_{in},C_{out}$ too low $\Rightarrow$ fragmentations
  2. $C_{in},C_{out}$ too high $\Rightarrow$ ID switches

   

# Visual Odometry

sensor type:

- monocular cameras
- stereo camera (left+right)
- RGB-D sensors (depth)

## Lie Group

### Definition&Symbols

$w$ : vector of elements in $\hat{w}$, $w\in \mathbb R^3$ , 

$so(3)$ : space of skew-symmetric matrices $so(3)=\left\{\hat{w}\in \mathbb R^{3\times3}|w\in \mathbb R^3\right\}$

$SO(3)$ : special orthogonal group $SO3=\left\{R\in\mathbb R^3|R^TR=I,|R|=1\right\}$

$\hat{\xi}$ : twist , $\hat{\xi}\in se(3)$ , $\hat{\xi} \in \mathbb R^{3\times 3}$

$SE(3)$ : special euclidean transformation (rigid body motion)$SE(3)=\{g=\left[\begin{matrix}R&T\\0&1\end{matrix}\right]|R\in SO(3),T\in\mathbb R^3\}$

$se(3)$ : tangent space (Le algebra) $se(3)=\left\{\left.\hat{\xi}\in\left[\begin{matrix}\hat{w}&v\\0&0\end{matrix}\right]\right|\hat{w}\in so(3),v\in\mathbb R^3\right\}$

### Formula

$$
\begin{aligned}
R(t)&=e^{\hat{w}t}\\
\hat{w} &= log(R)\\
g(t)&=e^{\hat{\xi}t}
=\left[\begin{matrix}
e^{\hat{w}}&\frac{(I-e^{\hat{w}})\hat{w}v+ww^Tv}{||w||}\\
0&1
\end{matrix}\right]
\end{aligned}
$$

$$
||w||=cos^{-1}(\frac{trace(R)-1}{2})\\
\frac{w}{||w||}=\frac{1}{2sin(||w||)}\left[\begin{matrix}r_{32}-r_{23}\\r_{13}-r_{31}\\r_{21}-r_{12}\end{matrix}\right]
$$

$R$ could be considered as rotation around vector $w$ by angle $||w||$ 
$$
R=I+\frac{\hat{w}}{||w||}sin(||w||)+\frac{\hat{w}^2}{||w||}\left(1-cos(||w||)\right)
$$

$$
\begin{aligned}
\hat{w}^2 &= ww^T-I\\
\hat{w}^3 &=-\hat w
\end{aligned}
$$

transition
$$
\begin{aligned}
se(3)\rightarrow se(3)&:\hat{\xi}\rightarrow g\hat{\xi}g^{-1}\\
so(3)\rightarrow so(3)&:\hat{w}\rightarrow R\hat{w}R^T
\end{aligned}
$$



## Indirect Visual Odometry

$E(\xi)=\sum_i|y_{1,i}-w(y_{2,i},\xi)|$

reprojection error

### Symbols

$E(\xi)$ : Error function with parameter $\xi$

$u$ : pixel

$w(u,\xi)$ : warp operation on pixel $u$ with parameter $\xi$  



### 2D-to-2D(eight point algorithm)

#### Definition&Symbols

given corresponding image point observations 

$Y_t = \{y_{t,1:N}\}$

$Y_{t-1}=\{y_{t-1,1:N}\}$

of unknown 3D points $X=\{x_{1:N}\}$

determine the relative motion $T_t^{t-1}$



$E$ : essential matrix

$y$ : observation

$t$ : transition vector

$R$ : rotation matrix

#### Solution

**epipolar constraint** : $\tilde{y}^T(t\times R\tilde y')=0$

1. obtain the approximate essential matrix $\tilde{E}$ 
   
   $E=t\times R=\hat{t}R$ 
   $\tilde{y_i}\tilde{E}\tilde{y_i}'=AE_s\rightarrow0$
   
   Lagrange multipliers：(set constraint  as $||E_s||=1$)
   
   $L(E_s,A)=||AE_s||^2+\lambda(1-||E_s||^2)$
   
   $\because \frac{\partial L}{\partial E_s}\Rightarrow A^TAE_s=\lambda E_s$
   
   $\therefore$  $E_s$ is the eigen vector correspondent to singular value $\lambda$ for $A$
   
   $\because ||AE_s||^2=\lambda$ 
   
   $\therefore$ $\lambda$ is the smallest singular value of $A$
   
2. project $\tilde{E}$ to Lie group, let $(R,t)\in SE(3)$

   $\tilde E = Udiag(\sigma_1,\sigma_2,\sigma_3)V^T$

   $E=Udiag(1,1,0)V^T$

3. restore $R$ and $t$

	$R=UR_z^T(\pm\frac{\pi}{2})V^T$
	
	$\hat{t}=UR_z(\pm\frac{\pi}{2})diag(1,1,0)U^T$
	
4. calc depth $d$

   $\lambda' y'=\lambda Ry+\gamma t$
   
   $\lambda \hat{y}'Ry+\gamma\hat{y}'t\rightarrow 0$
   
   $\left[\begin{matrix}\hat{y_1}'Ry_1&0&0&\hat{y_1}'t\\0&\hat{y_2}'Ry_2&0&\hat{y_2}'t\\0&0&\ddots&\vdots\\0&0&\hat{y_n}'Ry_n&\hat{y_n}'t\end{matrix}\right]\left[\begin{matrix}\lambda_1\\\lambda_2\\\vdots\\\lambda_n\\\gamma\end{matrix}\right]\rightarrow 0$
   
   $d_i=\frac{\lambda_i}{\gamma}$
   
   filter  with positive depth

#### Drift

errors accumulate

select keyframes to solve this problem

<img src="https://s2.loli.net/2022/01/30/bnSrWQuV5vR2FBl.png" height="400px"/> 

### 2D-to-3D(Perspective-n-Points)

#### Definition&Symbols

given 3D points $X=\{x_{1:N}\}$ 

and corresponding image $Y_t=\{y_{t,1:N}\}$

determine camera  pose $T_t$



$P$ : projection matrix $P=(\begin{matrix}R&t\end{matrix})\in \mathbb R^{3\times4}$

#### Solution

**constraint** : $\tilde y_i\times(P\tilde x_i)$

### 3D-to-3D



## Direct Methods

$E(\xi)=\int_{u}|I_1(u)-I_2(w(u,\xi))|du$

photometric error

don't need to extract keypoint, but need depth

### Symbols

$\xi$ : twist parameters of transformation, $\xi \in \mathbb R^6$

$C$ : camera projection matrix, $C\in \mathbb R^{3\times3}$ 

$d_{ij}$ :  depth of pixel at row $i$  column  $j$  , $d_{ij}\in \mathbb R$

$p_{ij}$ : 3D position of pixel at row $i$ column $j$, $p_{ij}\in \mathbb R^3$

$I_{ij}$ : 2D pixel value at row $i$ column $j$, $I_{ij}\in \mathbb R^2$  

$X_{i}$ : x position of $p_{ij}$ in projected image

$Y_i$ : y position of $p_{ij}$ in the projected image

$W$ : weight, given diagonal matrix

### Solution

twist coordinate to $SE(3)$ : $T=\left[\begin{matrix}0&-\xi_6&\xi_5&\xi_1\\\xi_6&0&\xi_4&\xi_2\\-\xi_5&\xi_4&0&\xi_3\\0&0&0&1\end{matrix}\right]$

location of pixel in image to 3D points in image : $p_{ij}=d_{ij}C^{-1}\left[\begin{matrix}i\\j\\1\end{matrix}\right]$

location of 3D point of image1 in image2: $\left[\begin{matrix}\lambda X_i'\\\lambda Y_j'\\\lambda\\1\end{matrix}\right]=CT\left[\begin{matrix}p_{ij}\\1\end{matrix}\right]$

residual value : $r=I'-interpolate(X',Y',I)$

geometric error : compare in depth  

photometric error : compare in $I$

optimize  residual:
$$
\xi_{i+1}=\xi_i-H_i^{-1}J_i^TWr(\xi_i)\\
J_i=\nabla_\xi r(\xi_i)\\
H_i=J_i^TWJ_i
$$

# Visual SLAM

<img src="https://s2.loli.net/2022/02/04/Sole19mqMypHXZj.png">

## EKF SLAM

### Symbols

$u$ : uncertain action

$\xi$ : actual pose, composed of position $p\in\mathbb R^2$ and direction $\theta\in\mathbb R^1$ (take 2D for example)

$x$ : hidden status

$g$ : transition function

$m$ : landmarks

$y$ : observations

### Solution

$$
x_t = g(x_{t-1},u_t)+\epsilon_t,
\epsilon_t\sim \mathcal N(0,\Sigma_{d_t,\xi})
\\
g(x_{t-1},u_t) = \left(\begin{matrix}
g_\xi(\xi_{t-1},u_t)\\g_m(m_{t-1})
\end{matrix}\right)
\\
\Sigma_{d_t}=\left(\begin{matrix}
\Sigma_{d_t,\xi}&0\\
0&0
\end{matrix}\right)
$$

$$
y_t = h(\xi_t,m_{t,c_t})+\delta_t,\delta_t\sim\mathcal N(0,\Sigma_{m_t})
\\
h(\xi_t,m_{t,c_t})=\left(\begin{matrix}
||m_{t,c_t}^{rel}||_2\\
atan2(m_{t,c_t,y}^{rel},m_{r,c_t,x}^{rel})\\
m_{t,c_t}^rel=R(-\theta_t)(m_{t,c_t}-p)
\end{matrix}\right)
$$

### Discussion

shape  of state vector : $|\xi|+|m|\times n\_landmark$

for MonoSLAM : $(3+3+2)+3*n\_landmark$

Cons:

- covariance matrix is huge

## Full SLAM

optimize for whole trajectory  and all landmarks at once

SLAM graph optimization

pose graph optimization

# Deep Learning

## Siamese network

<img src="https://s2.loli.net/2022/02/18/agVFJuU485EAb1h.jpg" style="zoom:25%;" />



## Loss

for learning similarity (**Siamese network**)

### contrastive loss

$$
||f(x)-f(x_+)||\rightarrow 0
\\
||f(x)-f(x_-)||\ge m
$$

### triplet loss

group positive examples closer to the anchor than the negative one 
$$
||f(x_i^a)-f(x_i^p)||_2^2\lt ||f(x_i^a)-f(x_i^n)||_2^2
$$

### FlowNet

compare to LK-flow

\+ more precise

\+ no need to design window and warping function

\- need trainig dataset



![img](https://img-blog.csdn.net/20171007194106462)

<img src="https://s2.loli.net/2022/02/09/sX41LHhVZTxP23j.png"/>

**refinement**

- refine coarse pooled representation by upconvolution layers
- skep connections to preserve high-res information from early layers