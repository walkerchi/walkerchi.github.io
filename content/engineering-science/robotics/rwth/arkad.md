---
title : "[RWTHAachen]Advanced Robotic Kinematics and Dynamics"
image : "https://s2.loli.net/2022/06/18/f64j5BMt8h32nPC.png"
description : "outline for the content covered in ARKaD course :)"
author: "mingyuan chi"
date: 2022-02-01
---

# Position and Orientation 

## Basic

- rotate by axis
  $$
  R_x(\alpha)=\left\{\begin{matrix}1&0&0\\0&cos\alpha&-sin\alpha\\0&sin\alpha&cos\alpha\end{matrix}\right\}
  \\
  R_y(\beta)=\left\{\begin{matrix}cos\beta&0&sin\beta\\0&1&0\\-sin\beta&0&cos\beta\end{matrix}\right\}
  \\
  R_z(\gamma)=\left\{\begin{matrix}cos\gamma&-sin\gamma&0\\sin\gamma&cos\gamma&0\\0&0&1\end{matrix}\right\}
  $$

- cross product 
  $$
  \begin{aligned}
  \left[\begin{matrix}u_x\\u_y\\u_z\end{matrix}\right]\cross
  \left[\begin{matrix}v_x\\v_y\\v_z\end{matrix}\right]&=
  \left[\begin{matrix}0&-u_z&u_y\\u_z&0&-u_x\\-u_y&u_x&0\end{matrix}\right]
  \left[\begin{matrix}v_x\\v_y\\v_z\end{matrix}\right]
  \\
  &=\left[\begin{matrix}u_yv_z-u_zv_y\\u_zv_x-u_xv_z\\u_xv_y-u_yv_x\end{matrix}\right]
  \end{aligned}
  $$

- reverse rotate
  $$
  R^{-1}=R^T
  $$
  
- inverse matrix 
  $$
  A^{-1} = \frac{
  \left[\begin{matrix}
  A_{11}^*&\cdots &A_{1n}^*\\
  \vdots &\ddots & \vdots \\
  A_{n1}^*&\cdots & A_{nn}^*\\
  \end{matrix}\right]
  }{|A|}
  $$
  $A_{ij}^*$ : element of row $i$ column $j$ in Adjugate matrix 
  $$
  A_{ij}^* = (-1)^{i+j}\left|\begin{matrix}
  a_{1,1}&\cdots&a_{1,i-1}&a_{1,i+1}&\cdots&a_{1,n}\\
  \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\
  a_{j-1,1}&\cdots&a_{j-1,i-1}&a_{j-1,i+1}&\cdots&a_{j-1,n}\\
  a_{j+1,1}&\cdots&a_{j+1,i-1}&a_{j+1,i+1}&\cdots&a_{j+1,n}\\
  \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\
  a_{n,1}&\cdots&a_{n,i-1}&a_{n,i+1}&\cdots&a_{n,n}
  \end{matrix}\right|
  $$

##  Rotation

### Euler Angels 

​	12  combinations : $A_3^3+C_3^2A_2^2$ out of 27 possibles

- current frame 
  $$
  R_{cur}=R_xR_yR_z
  $$

- fix frame 
  $$
  \begin{aligned}
  R_{fix} &= R_x(R_x^TR_yR_x)(R_x^TR_y^TR_zR_yR_x)
  \\
  &=R_zR_yR_x
  \end{aligned}
  $$

**Roll-Pitch-Yaw**

**rotate by fix frame $x$ ,$y$ ,$z$**
$$
\begin{aligned}
R_{RPY}&=R_z(\varphi)R_y(\theta)R_x(\psi)
\\
&=\left[\begin{matrix}
c_\varphi c_\theta & 
c_\varphi s_\theta s_\psi-s_\varphi c_\psi&
c_\varphi s_\theta c_\psi+s_\varphi s_\psi\\
s_\varphi c_\theta &
s_\varphi s_\theta s_\psi + c_\varphi c_\psi&
s_\varphi s_\theta c_\psi - c_\varphi s_\psi\\
-s_\theta &
c_\theta s_\psi&
c_\theta c_\psi\\
\end{matrix}\right]
\end{aligned}
$$
**properties**:

- solution is always a pair

- singularity situation : 

  ​	example : $[\gamma_1,\beta_1,\gamma_2]$ $\beta_1=\{0,\pm\pi\}$ $\rightarrow$ **gimble lock**

  

### Axis&Angle

rotate by vector $\left[\begin{matrix}r_x\\r_y\\r_z\end{matrix}\right]$ by $\theta$

with constraint : $r_x^2+r_y^2+r_z^2=1$
$$
R(\theta,r)=\left[\begin{matrix}
r_x^2(1-cos\theta)+cos\theta&
r_xr_y(1-cos\theta)-r_zsin\theta&
r_xr_z(1-cos\theta)+r_ysin\theta
\\
r_xr_y(1-cos\theta)+r_zsin\theta&
r_y^2(1-cos\theta)+cos\theta&
r_yr_z(1-cos\theta)-r_xsin\theta
\\
r_xr_z(1-cos\theta)-r_ysin\theta&
r_yr_z(1-cos\theta)+r_xsin\theta&
r_z^2(1-cos\theta)+cos\theta
\end{matrix}\right]
$$

$$
\begin{aligned}
cos\theta &= \frac{r_{11}+r_{22}+r_{33}-1}{2}\\
sin\theta &= \frac{r_{32}-r_{23}}{2r_x}\\
&=\frac{r_{13}-r_{31}}{2r_y}\\
&=\frac{r_{21}-r_{12}}{2r_x}\\
r &= \left[\begin{matrix}
\pm\sqrt{\frac{r_{11}-cos\theta}{1-cos\theta}}\\
\pm\sqrt{\frac{r_{22}-cos\theta}{1-cos\theta}}\\
\pm\sqrt{\frac{r_{33}-cos\theta}{1-cos\theta}}
\end{matrix}\right]
\end{aligned}
$$

### Unit Quaternion

**compared to Euler Angle**

- better computational performance
- yeilds less ambiguous solutions

rotate by vector $\epsilon$ by $\theta$

with constraint : $\eta^2+\epsilon_x^2+\epsilon_y^2+\epsilon_z^2=1$
$$
\mathcal Q(\theta,r)=\{\eta,\epsilon\}=\{\frac{cos\theta}{2},r\cdot sin\frac{\theta}{2}\}
$$

$$
\begin{aligned}
R(\eta,\epsilon)&=\left\{\begin{matrix}2(\eta^2+\epsilon_x^2)-1&2(\epsilon_x\epsilon_y-\eta\epsilon_z)&2(\epsilon_x\epsilon_z+\eta\epsilon_y)\\2(\epsilon_x\epsilon_y+\eta\epsilon_z)&2(\eta^2+\epsilon_y^2)-1&2(\epsilon_y\epsilon_z-\eta\epsilon_x)\\2(\epsilon_x\epsilon_z-\eta\epsilon_y)&2(\epsilon_y\epsilon_z+\eta\epsilon_x)&2(\eta^2+\epsilon_z^2)-1\end{matrix}\right\}
\end{aligned}
$$

$$
\begin{aligned}
\eta &= \frac{1}{2}\sqrt{r_{11}+r_{22}+r_{33}+1}
\\
\epsilon&=\frac{1}{2}\left[\begin{matrix}
sgn(r_{32}-r_{23})\sqrt{r_{11}-r_{22}-r_{33}+1}\\
sgn(r_{13}-r_{31})\sqrt{r_{22}-r_{33}-r_{11}+1}\\
sgn(r_{21}-r_{12})\sqrt{r_{33}-r_{11}-r_{22}+1}
\end{matrix}\right]
\end{aligned}
$$



## Transform

$$
\begin{aligned}
^iT_j &= \left\{\begin{matrix}^iR_j&^ir_{j_o,i_o}\\0^T&1\end{matrix}\right\}
\\
^jT_i &= \left\{\begin{matrix}^iR_j^T&-^iR_j^T~^ir_{j_o,i_o}\\0^T&1\end{matrix}\right\}
\end{aligned}
$$

$R$ : rotation matrix

$r$ : translation vector 

$T$ : transform matrix

# Direct Kinematics

$$
q\rightarrow x_E
$$

$q$ : vector of parameter of each joint 

$x_E$ : vector of end state in task space,	

​		PRY-Representation : $x_E=[p_x \quad p_y \quad p_z \quad \varphi \quad \theta \quad \psi]^T$ 

​		Axis&Angle Representation : $x_E=[p_x \quad p_y \quad p_z \quad r_x \quad r_y \quad \theta]^T$

​		Unit Quaternion Representation : $x_E=[p_x\quad p_y\quad p_z\quad \epsilon_x\quad \epsilon_y\quad \epsilon_z]^T$

 

## Joint

**Prismatic Joint**

<img src="https://s2.loli.net/2022/02/18/yfrbHilsa2CXuZq.png" style="zoom:20%;" />

**revolute joint**

<img src="https://s2.loli.net/2022/02/18/hApHum1bXzG2tIO.png" style="zoom:20%;" />

## DH Convention

**Denavit-Hartenberg(DH) Convention**

joint transformation can be represented as : 
$$
\begin{aligned}
^iT_j
&=\left\{\begin{matrix}
cos\delta&-sin\delta&0&0\\
sin\delta&cos\delta&0&0\\
0&0&1&d\\
0&0&0&1
\end{matrix}\right\}
\cdot
\left\{\begin{matrix}
1&0&0&l\\
0&cos\lambda&-sin\lambda&0\\
0&sin\lambda&cos\lambda&0\\
0&0&0&1
\end{matrix}\right\}
\\
&=\left\{\begin{matrix}
cos\delta&-sin\delta cos\lambda&sin\delta sin\lambda &lcos\delta\\
sin\delta&cos\delta cos\lambda&-cos\delta sin\lambda&lsin\delta\\
0&sin\lambda&cos\lambda&d\\
0&0&0&1
\end{matrix}\right\}
\\
p_E &= {^E}r_0
\\
e_{z,E}&={^E}R_0
\left[\begin{matrix}
0\\0\\1
\end{matrix}\right]
\end{aligned}
$$

# Inverse Kinematics

$$
x_E\rightarrow p
$$

## Analytical 

### Position 

solve  vector $q$ through 
$$
p_E=
{^e}r_0(q)
$$

### Orientation

solve the vector $q$ through 
$$
{^E}R_0 
$$

## Numerical

**Gradient Descend**

$$
q_{k+1}=q_k+\alpha\cdot J_{AP}^T(q_k)(p_d-p_e)
$$

$p_e$ : actual end position

$p_d$ : desired end position

$J_A$ : Jacobian matrix defined by $\frac{\partial  p_e}{\partial q}$

$\alpha$ : learning rate



# Differential Kinematics

$$
\dot q \rightarrow v_E/\dot x_E
$$

$v_E$ : end velocity of shape $v_E\in\mathbb R^6$

$\dot x_E$ : differential of end state $\dot x_E\in\mathbb R^6$

$\dot q$ : differential of joint parameter 

$\sigma_i$ : whether joint $i$ is prismatic joint

## Geometric Jacobian 

$$
\begin{aligned}
v_E&=
\left[\begin{matrix}
\dot{p_E}\\
\omega_E
\end{matrix}\right]\\
&=
\left[\begin{matrix}
\dot{J}_{GP_1}&\cdots&\dot{J}_{GP_n}\\
\dot{J}_{GO_1}&\cdots&\dot{J}_{GO_n}
\end{matrix}\right]
\dot q\\
&=
J_G\dot{q}
\end{aligned}
$$

$J_G$ : geometric jacobian of shape $J_G\in \mathbb R^{6\times|q|}$

$J_{GP_i}$ : geometric position jacobian matrix at joint  $i$

$J_{GO_i}$ : geometric orientation jacobian matrix at joint $i$

$\omega$ : vector of angular velocity of shape $\omega\in \mathbb R^3$ 

$\dot p_E$ : differential of end position of shape $p_E\in \mathbb R^3$

- prismatic joint
  $$
  \begin{aligned}
  {^0}\omega_i &= {^0}\omega_{i-1}
  \\
  {^0}\dot r_{i,^0O}&={^0}\dot r_{i-1,^0O}
  +{^0}\omega_{i-1}\times{^0}r_{{^i}O,{^{i-1}}O}
  +\left[\begin{matrix}
  0\\0\\\dot q_i
  \end{matrix}\right]
  \end{aligned}
  $$

  $$
  \left[\begin{matrix}
  \dot J_{GP_i}\\
  \dot J_{GO_i}
  \end{matrix}\right]
  =
  \left[\begin{matrix}
  {^0}e_{z,^{i-1}O}\\
  0
  \end{matrix}\right]
  $$

  ​	${^0}e_{z,{^{i-1}}O}$ : $z$ axis unit vector of coordinate ${^{i-1}}O$ in coordinate ${^0}O$
  
- revolute joint
  $$
  \begin{aligned}
  {^0}\omega_i
  &=
  {^0}\omega_{i-1}
  +\left[\begin{matrix}
  0\\0\\\dot q_i
  \end{matrix}\right]
  \\
  {^0}\dot r_{{^i}O,{^0}O}
  &=
  {^0}\dot r_{{^{i-1}}O,{^0}O}+
  {^0}\omega_i\times{^0}r_{{^i}O,{^{i-1}}O}
  \end{aligned}
  $$

  $$
  \left[\begin{matrix}
  \dot J_{GP_i}\\
  \dot J_{GO_i}
  \end{matrix}\right]=
  \left[\begin{matrix}
  {^0}e_{z,{^{i-1}}O}\times({^0}r_{E,{^0}O}-{^0}r_{{^{i-1}}O,{^0}O})\\
  {^0}e_{z,{^{i-1}}O}
  \end{matrix}\right]
  $$

  

## Analytical Jacobian

refers to differential quantities of variables in the operational space
$$
\begin{aligned}
\dot x_E
&=
\left[\begin{matrix}
\dot p_E\\
\dot \Phi_E
\end{matrix}\right]\\
&=
\left[\begin{matrix}\dot J_{AP1}&\cdots&\dot J_{AP_n}\\\dot J_{AO1}&\cdots&\dot J_{AOn}\end{matrix}\right]\\
&=
J_A\dot q
\end{aligned}
$$

$J_{AP_i}$ : analytical position jacobian at joint $i$

$J_{AO_i}$ : analytical orientation jacobian at joint $i$

$\dot \Phi_E$ : differential of end orientation
$$
\begin{aligned}
\omega_E &= J_R(\Phi_E)\dot \Phi_E\\
J_R&=\left[\begin{matrix}
			\frac{\partial r_{E,x}}{\partial \phi}&
			\frac{\partial r_{E,x}}{\partial \theta}&
			\frac{\partial r_{E,x}}{\partial \psi}\\
			\frac{\partial r_{E,y}}{\partial \phi}&
			\frac{\partial r_{E,y}}{\partial \theta}&
			\frac{\partial r_{E,y}}{\partial \psi}\\
			\frac{\partial r_{E,z}}{\partial \phi}&
			\frac{\partial r_{E,z}}{\partial \theta}&
			\frac{\partial r_{E,z}}{\partial \psi}
			\end{matrix}\right]
\\
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial R_E(\Phi_E)}{\partial \varphi/\theta/\psi}R_E(\Phi_E)^T&=\left[\begin{matrix}
	0&
	-\frac{\partial r_{E,z}}{\partial \varphi/\theta/\psi}&
	\frac{\partial r_{E,y}}{\partial \varphi/\theta/\psi}\\
	\frac{\partial r_{E,z}}{\partial \varphi/\theta/\psi}&
	0&
	-\frac{\partial r_{E,x}}{\partial \varphi/\theta/\psi}\\
	-\frac{\partial r_{E,y}}{\partial \varphi/\theta/\psi}&
	\frac{\partial r_{E,x}}{\partial \varphi/\theta/\psi}&
	0
\end{matrix}\right]
\\
R_E(\Phi_E)&=R_{z,\varphi}R_{y,\theta}R_{z,\psi}\\
&=\left[\begin{matrix}
cos\varphi&-sin\varphi&0\\
sin\varphi&cos\varphi&0\\
0&0&1
\end{matrix}\right]
\left[\begin{matrix}
cos\theta&0&sin\theta\\
0&1&0\\
-sin\theta&0&cos\theta
\end{matrix}\right]
\left[\begin{matrix}
cos\phi&-sin\phi&0\\
sin\phi&cos\phi&0\\
0&0&1
\end{matrix}\right]
\end{aligned}
$$



## Singularity

$$
|J_{G}|=0
$$

- boundary singularity

  - elbow singularity

    ![](https://s2.loli.net/2022/02/12/lKyvj7ebd2QgIiZ.png)

- internal singularity
  - wrist singularity
    ![](https://s2.loli.net/2022/02/12/RDH2gK7z6oQ3hYF.png)
    
  - shoulder singularity
  
    ![](https://s2.loli.net/2022/02/12/drESAtY19WFgOjZ.png)

​    

# Inverse Differential Kinematics

$$
v_E / \dot x_E \rightarrow \dot q
$$

## Analytical 

$$
\dot q = J_A^{-1}\dot x_E
\\
\dot q = J_G^{-1}\dot v_E
$$

## Inverse Kinematics Algorithm

**Newton  Method**

1. $\dot q = J_A^{\textdagger}(\dot x_d+K(\dot x_d- J_A(q)\dot q))$
2. $q\leftarrow q+\dot q \Delta t$
3. goto 1

$K$ : diagonal weight matrix , usually $I$

$J_A^\textdagger$ : pseudo inverse of $J_A$
$$
J_{A}^{\textdagger}=J_{A}^T(J_{A}J_{A}^T)^{-1}\\
$$


## Static Equilibrium

$$
\tau = J_G^T\gamma_E
$$

$\tau$ :  torque of each joint of shape $\tau\in \mathbb R^{|q|}$

$\gamma_E$ : general force of the end, $\gamma_E=\left[\begin{matrix}f_E\\\mu_E\end{matrix}\right]$

$f_E$ : force of the end  of shape $f_E\in \mathbb R^3$

$\mu_E$ : torque of the end  of shape $\mu_E \in \mathbb R^3$

## Manipulability  Ellipsoid

purpose:

- find the most suitable joint configurations for a given task

- velocity manipulability 
  $$
  v_E^T(J_GJ_G^T)^{-1}v_E=1
  $$
  <img src="https://s2.loli.net/2022/02/12/GBT2yrX4OfMUPqp.png" style="zoom:50%;" />

- force manipulability
  $$
  \gamma_E^T(J_GJ_G^T)\gamma_E=1
  $$
  <img src="https://s2.loli.net/2022/02/12/elfxciYwQKkhW2u.png" style="zoom:50%;" />

# Lagrange

## Lagrange Equation

$$
\begin{aligned}
\mathcal L(q,\dot q) &= E_{kin}(q,\dot q)-E_{pot}(q)
\\
\xi  &= \frac{\partial}{\partial t}(\frac{\partial \mathcal L}{\partial \dot q})-(\frac{\partial L}{\partial q})
\end{aligned}
$$

$E_{kin}$ : kinetic energy

$E_{pot}$ : potential energy

$\xi$ : non-conservatives generalized forces acting on the system

## Equation of Motion

$$
\mathcal L=\frac{1}{2}\dot q^TM\dot q + \sum_{i=1}^{|q|}m_{link_i}{^0}g_0^T{^0}r_{CG_{link_i},{^0}O}
$$

$$
\begin{aligned}
E_{kin,link_i}&=\frac{1}{2}m_{link_i}
{^0}\dot r_{CG_{link_i},{^0}O}^T
{^0}\dot r_{CG_{link_i},{^0}O}+
\frac{1}{2}
{^0}\omega_i^T
{^0}R_i
{^i}I_{link_i}
{^0}R_i^T
{^0}\omega_i
\\
&=\frac{1}{2}m_{link_i}
\dot q^T
J_{GP_{link_i}}^T
J_{GP_{link_i}}
\dot q
+\frac{1}{2}
\dot q^T
J_{GO_{link_i}}^T
{^0}R_i
{^i}I_{link_i}
{^0}R_i^T
J_{GO_{link_i}}
\dot q
\\
E_{kin,mot_i}&=\frac{1}{2}m_{mot_i}
{^0}\dot r_{CG_{mot_i},{^0}O}^T
{^0}\dot r_{CG_{mot_i},{^0}O}+
\frac{1}{2}
{^0}\omega_{mot_i}^T
{^0}I_{mot_i}
{^0}\omega_{mot_i}
\\
&=\frac{1}{2}m_{mot_i}
\dot q^T
J_{GP_{mot_i}}^T
J_{GP_{mot_i}}
\dot q+
\frac{1}{2}
\dot q^T
J_{GO_{mot_i}}^T
{^0}R_{mot_i}
{^{mot_i}}I_{mot_i}
{^0}R_{mot_i}^T
J_{GO_{mot_i}}
\dot q
\\
E_{kin} &= \sum_{i=1}^{|q|}
(E_{kin,link_i}+E_{kin,mot_i})
\end{aligned}
$$

no friction and no external forces
$$
M(q)\ddot q+G(q,\dot q)\dot q+g(q) = \tau
$$
$\tau$ : torque applied on each joint , $\tau \in \mathbb R^{|q|}$

$M$ : inertia matrix , $M\in \mathbb R^{|q|\times |q|}$
$$
M(q)=\sum_{i=1}^n(m_{link_i}J_{GP_{link_i}}^TJ_{GP_{link_i}}+
J_{GO_{link_i}}^T{^0}R_i{^i}I_{link_i}{^0}R_i^TJ_{GO_{link_i}})
$$
$m_{link_i}$ : mass of link $i$ , $m_{link_i}\in \mathbb R_+$

$I_{link_i}$ : inertia of link $i$ , $I_{link_i}\in \mathbb R^3$, usually represent as a diagonal matrix of $\mathbb R^{3\times 3}$

$J_{GP_{link_i}}$ : position jacobian matrix of link $i$ , $J_{GP_{link_i}}\in \mathbb R^{3\times|q|}$
$$
J_{GP_{link_i}} = [\dot J_{GP1_{link_i}}\cdots\dot J_{GPi_{link_i}} 0\cdots 0]
$$
$\dot J_{GPj_{link_i}}$ : position jacobian component of joint $j$ toward link $i$
$$
\dot J_{GPj_{link_i}} = 
\begin{cases}
\begin{aligned}
prismatic:&
{^0}e_{z,{^{j-1}}O}
\\
revolute:&
{^0}e_{z,{^{j-1}}O}\times({^0}r_{CG_{link_i,{^0}O}}-{^0}r_{{^{j-1}}O,{^0}O})
\end{aligned}
\end{cases}
$$
${^0}r_{CG_{link_i,{^0}O}}$ : vector from origin of coordinate $0$ to center gravity point of link $i$ presented in coordinate $0$

$J_{GO_{link_i}}$ : orientation jacobian matrix of link $i$ , $J_{GO_{link_i}}\in \mathbb R^{3\times|q|}$
$$
J_{GO_{link_i}} = [\dot J_{GO1_{link_i}}\cdots\dot J_{GOi_{link_i}} 0\cdots 0]
$$
$\dot J_{GOj_{link_i}}$ : orientation jacobian component of joint $j$ toward link $i$
$$
\dot J_{GOj_{link_i}} = 
\begin{cases}
\begin{aligned}
prisimatic :& 0
\\
revolute : &{^0}e_{z,{^{j-1}}O}
\end{aligned}
\end{cases}
$$
$G$ : gyroskopic forces matrix , $G\in\mathbb R^{|q|\times|q|}$, $G=\dot M\dot q-\frac{1}{2}(\frac{\partial (\dot q^TM\dot q)}{\partial q})^T$
$$
g_{ij}=\sum_{k=1}^{|q|}\frac{1}{2}(
\frac{\partial m_{ij}}{\partial q_k}+
\frac{\partial m_{ik}}{\partial q_j}-
\frac{\partial m_{jk}}{\partial q_i}
)\dot q_k
$$
$g_{ij}$ : item in $G$ of row $i$ column $j$

$m_{ij}$ : item in $M$ of row $i$ column $j$

$g$ : gravity matrix , $g\in \mathbb R^{|q|}$
$$
g_i = -\sum_{j=1}^{|n|}(
m_{link_j}
{^0}g_0^T
\frac{\partial {^0}r_{CG_{link_j},{^0}O}}{\partial q_i}
)
$$
$g_i$ : $i$ th item of vector $g$ 

${^0}g_{0}$ : gravitational forces vector, ${^0}g_0\in\mathbb R^3$, usually ${^0}g_0=-\left[\begin{matrix}0\\0\\-9.81\end{matrix}\right]$

# Newton-Euler

$$
q,\dot q,\ddot q,h_E\rightarrow f,\mu
$$

$h_E$ : generalized forces from the end-effector 

$f$ : force exterted

$\mu$ : torque extered 

![](https://s2.loli.net/2022/02/13/H2x9Tsa4q5SLbI8.png)

## Kinematics Forward

$$
\begin{aligned}

{^i}\omega_i &= 
\begin{cases}\begin{aligned}
prismatic:& {^{i-1}}R_i^T {^{i-1}}\omega_{i-1}
\\
revolute:&
{^{i-1}}R_i^T({^{i-1}}\omega_{i-1}+\left[\begin{matrix}0\\0\\\dot q_i\end{matrix}\right])
\end{aligned}\end{cases}

\\

{^i}\dot \omega_i &=
\begin{cases}\begin{aligned}
prismatic:&{^{i-1}}R_i^T {^{i-1}}\dot \omega_{i-1}
\\
revolute:& 
{^{i-1}}R_i^T(
{^{i-1}}\dot \omega_{i-1}+
\left[\begin{matrix}
0\\0\\\ddot q_i
\end{matrix}\right]+
{^{i-1}}\omega_{i-1}\times
\left[\begin{matrix}
0\\0\\\dot q_i
\end{matrix}\right]
)
\end{aligned}\end{cases}

\\

{^i}\ddot r_{{^i}O,{^0}O}&=
\begin{cases}\begin{aligned}
prismatic:&
{^{i-1}}R_i^T(
{^{i-1}}\ddot r_{{^{i-1}}O,{^0}O}
\left[\begin{matrix}
0\\0\\\ddot q_i
\end{matrix}\right])+
2\dot q_i{^i}\omega_i\times(
{^{i-1}}R_i^T
{^{i-1}}e_{z,{^{i-1}}O})+
{^i}\dot \omega_i\times
{^i}r_{{^i}O,{^{i-1}}O}+
{^i}\omega_i\times(
{^i}\omega_i\times
{^i}r_{{^i}O,{^{i-1}}O}
)
\\
revolute:&
{^{i-1}}R_i^T
{^{i-1}}\ddot r_{{^{i-1}}O,{^0}O}+
{^i}\dot \omega_i\times
{^i}r_{{^i}O,{^{i-1}}O}+
{^i}\omega_i\times(
{^i}\omega_i\times
{^i}r_{{^i}O,{^{i-1}}O}
)
\end{aligned}\end{cases}

\\

{^i}\ddot r_{CG_{link_i},{^0}O}&=
{^i}\ddot r_{{^i}O,{^0}O}+
{^i}\dot \omega_i\times
{^i}r_{CG_{link_i},{^i}O}+
{^i}\omega_i\times(
{^i}\omega_i\times
{^i}r_{CG_{link_i},{^i}O}
)
\end{aligned}
$$

## Dynamics Backward

$$
\begin{aligned}

{^i}f_{i,i-1} &=
{^i}R_{i+1}
{^{i+1}}f_{i+1,i}+
m_i
{^i}\ddot r_{CG_i,{^0}O}+
c_{vi}\dot d_i^{i-1}
e_{z,mot_i}+
F_{di}
sgn(\dot d_i)
{^{i-1}}e_{z,mot_i}
\\

{^i}\mu_{i,i-1} &= -
{^i}f_{i,i-1}\times(
{^i}r_{{^i}O,{^{i-1}}O}+
{^i}r_{CG_i,{^i}O})+
{^i}R_{i+1}
{^{i+1}}\mu_{i+1,i}+(
{^i}R_{i+1}
{^{i+1}}f_{i+1,i})\times
{^i}r_{CG_i,{^i}O}+
{^i}I_i
{^i}\dot \omega_i+
{^i}\omega_i \times(
{^i}I_i
{^i}\omega_i)
\\
&+i_{mot_{i_1}}
\ddot q_{i+1}
I_{mot_{i+1}}
{^0}e_{z,mot_{i+1}}+
i_{mot_{i+1}}
\dot q_{i+1}
I_{mot_{i+1}}
{^0}\omega_i\times
{^0}e_{z,mot_{i+1}}+
c_{vi}\dot \delta_i^{i-1}
e_{z,mot_i}+
F_{di}
sgn(\dot \delta_i)
{^{i-1}}e_{z,mot_i}
\\

\tau_i &= \begin{cases}\begin{aligned}
prismatic:&
({^{i-1}}R_{i+1})^T
{^{i+1}}f_{i+1,i}
{^{i-1}}e_{z,{^{i-1}}O}+
i_{mot_i}I_{mot_i}
{^{i-1}}e_{z,mot_i}+
c_{vi}\dot d_i+
F_{di}sgn(\dot d_i)
\\
revolute:&
({^{i-1}}R_{i+1})^T
{^{i+1}}\mu_{i+1,i}
{^{i-1}}e_{z,{^{i-1}}O}+
i_{mot_i}I_{mot_i}
{^{i-1}}e_{z,mot_i}+
c_{vi}\dot d_i+
F_{di}sgn(\dot d_i)
\end{aligned}\end{cases}
\end{aligned}
$$

## Parameter Identification

$$
q,\dot q,\ddot q\rightarrow m,I,c,f
$$

$m$ : mass of each link 

$I$ : inertia of each link and motor

$c,f$ : viscous/dry friction parameter

- CAD modeling

  simple but inaccurate

- Heuristic Approach

  cumbersome

- Linear  Approach

  accurate
  $$
  \begin{aligned}
  \tau &= 
  \xi+C_v\dot q+F_dsgn(\dot q) \\&=
  Y(q,\dot q,\ddot q)\pi
  \end{aligned}
  $$
  $\tau_i$ : torque at joint $i$  
  $$
  \tau_i=
  \begin{cases}\begin{aligned}
  prismatic:&
  {^i}f_{i,i-1}^T
  {^{i-1}}R_i^T
  {^{i-1}}e_{z,{^{i-1}}O}+
  i_{mot_i}
  I_{mot_i}
  {^{i-1}}\dot \omega_{mot_i}^T
  {^{i-1}}e_{z,mot_i}+
  c_{ii}
  \dot q_i+
  f_{ii}
  sgn(\dot q_i)
  \\
  revolute:&
  {^i}\mu_{i,i-1}^T
  {^{i-1}}R_i^T
  {^{i-1}}e_{z,{^{i-1}}O}+
  i_{mot_i}
  I_{mot_i}
  {^{i-1}}\dot \omega_{mot_i}^T
  {^{i-1}}e_{z,mot_i}+
  c_{ii}
  \dot q_i+
  f_{ii}
  sgn(\dot q_i)
  \end{aligned}\end{cases}
  $$
  $Y(q(t_i),\dot q(t_i),\ddot q(t_i))$ : regressor  matrix measured at $i$ th times, 

  $\pi_i$ : $i$th element of $\pi$ 
  $$
  \pi_i = \left[\begin{matrix}
  m_i&
  m_i{^i}r_{x;CG_i,{^i}O}&
  m_i{^i}r_{y;CG_i,{^i}O}&
  m_i{^i}r_{z;CG_i,{^i}O}&
  {^i}I_{xx;i}&
  {^i}I_{xy;i}&
  {^i}I_{xz;i}&
  {^i}I_{yy;i}&
  {^i}I_{yz;i}&
  {^i}I_{zz;i}&
  I_{mot_i}&
  c_{ii}&
  f_{ii}
  \end{matrix}\right]^T
  $$
  $m_i$ : mass of link $i$

  $^ir_{CG_i,{^0}O}$ : relative position vector to center of mass of link $i$

  ${^i}I_i$ : symmetric intertia matrix of link $i$

  $I_{mot_i}$ : intertia of acuator

  $c_{ii}$ : viscous friction parameter 

  $f_{ii}$ ：dry friction parameter  

  **requirements**

  - kinematics parameters (e.g. ${^i}r_{{^i}O,{^{i-1}}O}$) 
  - position $q$ and velocity $\dot q$ and acceleration $\ddot q$
  - joint torque $\tau$ 
  
  **least-squares method** needs the $\overline Y^T\overline Y$ to be full rank
  $$
  \begin{aligned}
  \overline \tau &= \overline Y\pi
  \\
  \pi &= (\overline Y^T\overline Y)^{-1}\overline Y^T\overline\tau
  \end{aligned}
  $$
  $\overline Y\in\mathbb R^{N|q|\times13|q|}$

  $\overline \tau\in \mathbb R^{N|q|}$

  $\pi\in \mathbb R^{13|q|}$
  
  $N$ : times of measruement
  
  **dampled least squares** use an initial guess $\pi_0$ , so the problem could be solved when $\overline Y^T\overline T$ is not full rank
  $$
  \begin{aligned}
  \tilde \tau  =& \overline Y(\pi-\pi_0)
  \\
  \pi=&(\overline Y^T\overline Y+\lambda^2I)^{-1}\overline Y^T\tilde\tau -\pi_0
  \end{aligned}
  $$
  $\lambda$ : damping factor,  the more confidence in the $\pi_0$, the higher $\lambda$

# Application in Dynamics

**Equation of motion**
$$
M(q)\ddot q  + G(q,\dot q)\dot q+C_v\dot q + F_d sgn(\dot q)+g(q)=\tau - J^T(q)h_e
$$

$C_v\dot q$ : viscous friction in the joints 

$F_dsgn(\dot q)$ : Coulomb (dry) friction in the joints 

$h_e$ : end-effector generalized forces induced from environment influences

## Direct and Inverse Dynamcis

### Torque Contribution

$$
\tau' = G(q,\dot q)\dot q+C_v\dot q+F_dsgn(\dot q)+g(q)+J^T(q)h_e
$$

$\tau'$ : torque contribution 

**in $\tau '$ , $\dot \omega=0$**

set $\ddot q=0$

![](https://s2.loli.net/2022/02/13/Thgpec8RCzjoMJO.png)

### Mass Matrix

$$
M(q)\ddot q= (\tau-\tau')
$$

$M$ : inertia matrix , $M\in \mathbb R^{|q|\times |q|}$

$m_i$ : $i$th column of $M$

![](https://s2.loli.net/2022/02/13/3TJawkXZf8hDCQG.png)

## Dynamic Scaling

$$
\tau_s(t) = \dot r^2\tau_s(r)+\ddot rM(q(r))  q'(r)
$$

$r(t)$ : scaling linear function, usually $r(t)=c1\cdot t+c2$ 

$q'$ : $q$ derivation with respect to $r$ $\frac{\partial q}{\partial r}$

## Dynamic Manipulability Ellipsoid

<img src="https://s2.loli.net/2022/02/13/plPXKqLR6uzCFGv.png" style="zoom:50%;" />

based on the unit norm torque ：$||\tau||=1$
$$
(\dot v_E+J_GM^{-1}d)^T\tilde J_G^TM^TM\tilde J_G(\dot v_E+J_GM^{-1}d)=1
$$
$d(q)$ : abbreviation of $d=g(q)+J^T(q)h_e$ 

$\tilde J_G^TM^TMJ_G$ : determines the volume and principle axes of ellipsoid

$-J_GM^{-1}d$ : determines the influence of gravity  and end-effector generalized forces

# Parallel Kinematics

pros:

- high carrying capability
- high positioning accuracy

cons:

- small workspace

## Direct and Inverse Kinematics

![](https://s2.loli.net/2022/02/13/OrYUEopKCVqZf83.png)

## Velocity Mapping

![](https://s2.loli.net/2022/02/13/fdU2yrmRisLu791.png)

## Singularity

$$
f(q,x_E)=0
\\
\rightarrow_{\partial t} B(q,x_E)\dot q + A(q,x_E)\dot x_E = 0
$$

- serial singularity

  $B(q,x_E)$ is singular

- parallel singularity

  $A(q,x_E)$ is singular

- architectural singularity

  $f(q,x_E)=0$ degnerate

# Trajectory Planning

**trajectory composition** 

- path (geometry)
  - prescribed orientation
  - regions of workspace that must not be reached
- timing law
  - maximum velocity
  - maximum acceleration
  - total trajectory time

## Joint Space Trajectories

**steps**

1. Inverse Kinematics
2. Path Planning
3. Trajectory Planning

**categories**

- Cubic Polynomial
  $$
  \left[\begin{matrix}
  t_{i,k}^3 & t_{i,k}^2 & t_{i,k} & 1\\
  t_{i,k+1}^3 & t_{i,k+1}^2 & t_{i,k+1} & 1\\
  3t_{i,k}^2& 2t_{i,k}  & 1 & 0\\
  3t_{i,k+1}^2& 2t_{i,k+1}  & 1 & 0\\
  \end{matrix}\right]
  \left[\begin{matrix}
  a_{i,3}\\a_{i,2}\\
  a_{i,1}\\a_{i,0}
  \end{matrix}\right]
  =
  \left[\begin{matrix}
  q_{i,k}\\q_{i,k+1}\\
  \dot q_{i,k}\\\dot q_{i,k+1}\\
  \end{matrix}\right]
  $$
  <img src="https://s2.loli.net/2022/02/13/cHwqzBxMSmsR7Tn.png" style="zoom:50%;" />
  
- Fifth Order Polynomial
  
  **finite jerk**
  $$
  \left[\begin{matrix}
  t_{i,k}^5 & t_{i,k}^4 & t_{i,k}^3 & t_{i,k}^2 & t_{i,k} & 1\\
  t_{i,k+1}^5 & t_{i,k+1}^4 & t_{i,k+1}^3 & t_{i,k+1}^2 & t_{i,k+1} & 1\\
  5t_{i,k}^4 & 4t_{i,k}^3 & 3t_{i,k}^2 & 2t_{i,k} & 1 & 0\\
  5t_{i,k+1}^4 & 4t_{i,k+1}^3 & 3t_{i,k+1}^2 & 2t_{i,k+1} & 1 & 0\\
  20t_{i,k}^3 & 12t_{i,k}^2 & 6t_{i,k} & 2 & 0 & 0\\
  20t_{i,k+1}^3 & 12t_{i,k+1}^2 & 6t_{i,k+1} & 2 & 0 & 0\\
  \end{matrix}\right]
  \left[\begin{matrix}
  a_{i,5}\\a_{i,4}\\a_{i,3}\\
  a_{i,2}\\a_{i,1}\\a_{i,0}\\
  \end{matrix}\right]
  =
  \left[\begin{matrix}
  q_{i,k}\\q_{i,k+1}\\
  \dot q_{i,k}\\\dot q_{i,k+1}\\
  \ddot q_{i,k}\\\ddot q_{i,k+1}
  
  \end{matrix}\right]
  $$
  <img src="https://s2.loli.net/2022/02/13/ZpXC9ejxyT6trIl.png" style="zoom:50%;" />
  
- Trapezoid Acceleration Profile

  **finite jerk**

  **mandatory** : $\dot q_{i,max}$ , $\ddot q_{i}$

  <img src="https://s2.loli.net/2022/02/13/bJElHvQcsOPexrG.png" style="zoom:50%;" />

-  Polynomials with imposed velocities
  $$
  \left[\begin{matrix}
  t_{i,k}^3 & t_{i,k}^2 & t_{i,k} & 1\\
  t_{i,k+1}^3 & t_{i,k+1}^2 & t_{i,k+1} & 1\\
  3t_{i,k}^2& 2t_{i,k}  & 1 & 0\\
  3t_{i,k+1}^2& 2t_{i,k+1}  & 1 & 0\\
  \end{matrix}\right]
  \left[\begin{matrix}
  a_{i,3}\\a_{i,2}\\
  a_{i,1}\\a_{i,0}
  \end{matrix}\right]
  =
  \left[\begin{matrix}
  q_{i,k}\\q_{i,k+1}\\
  \dot q_{i,k}\\\dot q_{i,k+1}\\
  \end{matrix}\right]
  $$
  <img src="https://s2.loli.net/2022/02/13/DCZYNVGzSjOwgxI.png" style="zoom:50%;" />
  
  only the continuity of the velocity but not of the acceleration is guaranteed
  
- Spline
  $$
  \left[\begin{matrix}
  a_{11}&a_{12}&\cdots&0&0\\
  a_{21}&a_{22}&\cdots&0&0\\
  \vdots&\vdots&\ddots&\vdots&\vdots\\
  0&0&\cdots&a_{N-1,N-1}&a_{N-1,N}\\
  0&0&\cdots&a_{N,N-1}  &a_{N,N}
  \end{matrix}\right]
  \left[\begin{matrix}
  \ddot \Pi_{i,2}(t_2)\\
  \vdots\\
  \ddot \Pi_{i,N+1}(t_{N+1})\\
  \end{matrix}\right]
  = b 
  $$
  $\Pi_{i,j}$ : cubic polynomial of joint $i$ at timestamp $j$
  
  ![](https://s2.loli.net/2022/02/13/acPJrsXe8k2n4hB.png)
  
  initial and final conditions $q_{i,in},q_{i,fin},\dot q_{i,in},\dot   q_{i,fin},\ddot q_{i,in},\ddot  q_{i,fin}$ can be imposed
  
  **virtual points**:
  
  - locations are irrelevant
  - to have enough equation
  - max acceleration $\ddot q$ and velocity $\dot q$ will change
  
  **special form**:
  
  - solve more effciently

## Operation Space Trajectories

**Frenet Frame**
$$
\begin{aligned}
t(s)&=\frac{\partial r_P(s)}{\partial s} 
\\
n(s)&=\frac{1}{||\frac{\partial^2r_P(s)}{\partial s^2}||}\frac{\partial^2 r_P(s)}{\partial s^2}
\\
b(s)&=t(s)\times n(s)
\end{aligned}
$$

**examples**

- Rectilinear Path
  $$
  \begin{aligned}
  r_P(s)&=r_{P_{start}}+\frac{s}{||r_{P_{end}}-r_{P_{start}}||}(r_{P_{end}}-r_{P_{start}})
  \\
  t(s)&=\frac{(r_{P_{end}}-r_{P_{start}})}{||r_{P_{end}}-r_{P_{start}}||}
  \\
  n(s)&=0
  \\
  b(s)&=0
  \end{aligned}
  $$
  the frenet frame is not unique here.

- Circular Arc
  $$
  \begin{aligned}
  {^0}e_{z,C_0} &= \frac{
  {^0}r_{P_{mid},P_{start}}\times 
  {^0}r_{P_{end},P_{start}}}{|
  {^0}r_{P_{mid},P_{start}}\times 
  {^0}r_{P_{end},P_{start}}|}
  \\
  {^0}e_{H_1} &= \frac{
  {^0}e_{z,C_0}\times
  {^0}r_{P_{mid},P_{start}}
  }{|
  {^0}e_{z,C_0}\times
  {^0}r_{P_{mid},P_{start}}
  |}
  \\
  {^0}e_{H_2} &= \frac{
  {^0}e_{z,C_0}\times
  {^0}r_{P_{end},P_{start}}
  }{|
  {^0}e_{z,C_0}\times
  {^0}r_{P_{end},P_{start}}
  |}
  \end{aligned}
  $$

  $$
  \begin{aligned}
  r_{P}(s)&=r_{C_O}+R_C{^C}r_{P,C_O}(s)
  \\
  &=r_{C_O}+[e_{x,C_O},e_{y,C_O},e_{z,C_O}]
  \left[\begin{matrix}
  r_Ccos(s/r_C)\\
  r_Csin(s/r_C)\\
  0
  \end{matrix}\right]
  \\
  b(s)&=e_{z,C_O}
  \\
  n(s)&=R_C(\frac{{^C}r_{P,C_O}'}{|{^C}r_{P,C_O}'|})
  \\
  t(s)&=n(s)\times b(s)
  \end{aligned}
  $$

  $r_{C_O}$ : position of origin of the circle

  $r_C$ : radius of the circle

  ${^Cr_{P,C_O}}'$ : $\frac{\partial {^C}r_{P,C_O}(s)}{\partial s}$ 

- Spline Path



# [Equation]

## [Matrix Manipulate]

- **Cross Product**
  $$
  \begin{aligned}
  \left[\begin{matrix}u_x\\u_y\\u_z\end{matrix}\right]\cross
  \left[\begin{matrix}v_x\\v_y\\v_z\end{matrix}\right]&=
  \left[\begin{matrix}0&-u_z&u_y\\u_z&0&-u_x\\-u_y&u_x&0\end{matrix}\right]
  \left[\begin{matrix}v_x\\v_y\\v_z\end{matrix}\right]
  \\
  &=\left[\begin{matrix}u_yv_z-u_zv_y\\u_zv_x-u_xv_z\\u_xv_y-u_yv_x\end{matrix}\right]
  \end{aligned}
  $$

- **Inverse**
  $$
  A^{-1} = \frac{
  \left[\begin{matrix}
  A_{11}^*&\cdots &A_{1n}^*\\
  \vdots &\ddots & \vdots \\
  A_{n1}^*&\cdots & A_{nn}^*\\
  \end{matrix}\right]
  }{|A|}
  $$

  $$
  A_{ij}^* = (-1)^{i+j}\left|\begin{matrix}
  a_{1,1}&\cdots&a_{1,i-1}&a_{1,i+1}&\cdots&a_{1,n}\\
  \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\
  a_{j-1,1}&\cdots&a_{j-1,i-1}&a_{j-1,i+1}&\cdots&a_{j-1,n}\\
  a_{j+1,1}&\cdots&a_{j+1,i-1}&a_{j+1,i+1}&\cdots&a_{j+1,n}\\
  \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\
  a_{n,1}&\cdots&a_{n,i-1}&a_{n,i+1}&\cdots&a_{n,n}
  \end{matrix}\right|
  $$

## [Trigonometric Functions]

$$
\begin{aligned}
sin(\alpha+\beta) &= 
sin\alpha\cdot cos\beta + 
cos\alpha\cdot sin\beta \\
sin(\alpha-\beta) &= 
sin\alpha\cdot cos\beta - 
cos\alpha\cdot sin\beta \\
cos(\alpha+\beta) &=
cos\alpha\cdot cos\beta - 
sin\alpha\cdot sin\beta\\
cos(\alpha-\beta) &=
cos\alpha\cdot cos\beta +
sin\alpha\cdot sin\beta\\
tan(\alpha+\beta) &=
\frac{
tan\alpha + tan\beta
}{1-tan\alpha\cdot tan\beta}\\
tan(\alpha-\beta) &= 
\frac{
tan\alpha - tan\beta
}{1+tan\alpha\cdot tan\beta}
\end{aligned}
$$

## [Orientation]

- **RPY**
  $$
  \begin{aligned}
  R_{RPY}&=R_z(\varphi)R_y(\theta)R_x(\psi)
  \\
  &=\left[\begin{matrix}
  c_\varphi c_\theta & 
  c_\varphi s_\theta s_\psi-s_\varphi c_\psi&
  c_\varphi s_\theta c_\psi+s_\varphi s_\psi\\
  s_\varphi c_\theta &
  s_\varphi s_\theta s_\psi + c_\varphi c_\psi&
  s_\varphi s_\theta c_\psi - c_\varphi s_\psi\\
  -s_\theta &
  c_\theta s_\psi&
  c_\theta c_\psi\\
  \end{matrix}\right]
  \end{aligned}
  $$
  
- **Axis and Angle** 
  $$
  R(\theta,r)=\left[\begin{matrix}
  r_x^2(1-cos\theta)+cos\theta&
  r_xr_y(1-cos\theta)-r_zsin\theta&
  r_xr_z(1-cos\theta)+r_ysin\theta
  \\
  r_xr_y(1-cos\theta)+r_zsin\theta&
  r_y^2(1-cos\theta)+cos\theta&
  r_yr_z(1-cos\theta)-r_xsin\theta
  \\
  r_xr_z(1-cos\theta)-r_ysin\theta&
  r_yr_z(1-cos\theta)+r_xsin\theta&
  r_z^2(1-cos\theta)+cos\theta
  \end{matrix}\right]
  $$
  
  $$
  \begin{aligned}
  cos\theta &= \frac{r_{11}+r_{22}+r_{33}-1}{2}\\
  sin\theta &= \frac{r_{32}-r_{23}}{2r_x}\\
  &=\frac{r_{13}-r_{31}}{2r_y}\\
  &=\frac{r_{21}-r_{12}}{2r_x}\\
  r &= \left[\begin{matrix}
  \pm\sqrt{\frac{r_{11}-cos\theta}{1-cos\theta}}\\
  \pm\sqrt{\frac{r_{22}-cos\theta}{1-cos\theta}}\\
  \pm\sqrt{\frac{r_{33}-cos\theta}{1-cos\theta}}
  \end{matrix}\right]
  \end{aligned}
  $$
  
- **Unit Quaternion**
  $$
  \begin{aligned}
  R(\eta,\epsilon)&=\left\{\begin{matrix}2(\eta^2+\epsilon_x^2)-1&2(\epsilon_x\epsilon_y-\eta\epsilon_z)&2(\epsilon_x\epsilon_z+\eta\epsilon_y)\\2(\epsilon_x\epsilon_y+\eta\epsilon_z)&2(\eta^2+\epsilon_y^2)-1&2(\epsilon_y\epsilon_z-\eta\epsilon_x)\\2(\epsilon_x\epsilon_z-\eta\epsilon_y)&2(\epsilon_y\epsilon_z+\eta\epsilon_x)&2(\eta^2+\epsilon_z^2)-1\end{matrix}\right\}
  \end{aligned}
  $$

  $$
  \begin{aligned}
  \eta &= \frac{1}{2}\sqrt{r_{11}+r_{22}+r_{33}+1}
  \\
  \epsilon&=\frac{1}{2}\left[\begin{matrix}
  sgn(r_{32}-r_{23})\sqrt{r_{11}-r_{22}-r_{33}+1}\\
  sgn(r_{13}-r_{31})\sqrt{r_{22}-r_{33}-r_{11}+1}\\
  sgn(r_{21}-r_{12})\sqrt{r_{33}-r_{11}-r_{22}+1}
  \end{matrix}\right]
  \end{aligned}
  $$

  

## [Direct Kinematics]

- DH Convention

  $$
  ^iT_j=\left\{\begin{matrix}
  cos\delta&-sin\delta cos\lambda&sin\delta sin\lambda &lcos\delta\\
  sin\delta&cos\delta cos\lambda&-cos\delta sin\lambda&lsin\delta\\
  0&sin\lambda&cos\lambda&d\\
  0&0&0&1
  \end{matrix}\right\}
  $$

## [Inverse Kinematics]

- **Gradient Descend**
  $$
  q_{k+1}\leftarrow q_k+\alpha\cdot J_{AP}^T(q_k)(p_d-p_e)
  $$
## [Differential Kinematics]

- **Geometric Jacobian**
  $$
  \left[\begin{matrix}
  \dot J_{GP_i}\\
  \dot J_{GO_i}
  \end{matrix}\right]=
  \begin{cases}\begin{aligned}
  prismatic:&
  \left[\begin{matrix}
  {^0}e_{z,{^{i-1}}O}\\
  0
  \end{matrix}\right]
  \\
  revolute:&
  \left[\begin{matrix}
  {^0}e_{z,{^{i-1}}O}\times
  (p_E-{^0}r_{{^{i-1}}O,{^0}O})\\
  {^0}e_{z,{^{i-1}}O}
  \end{matrix}\right]
  \end{aligned}\end{cases}
  $$

- **Angular Velocity**
  $$
  {^0}\omega_i={^0}\omega_{i-1}+(1-\sigma_i){^0}R_{i-1}
  \left[\begin{matrix}
  0\\0\\\dot q_i
  \end{matrix}\right]
  $$

- **Linear Velocity**
  $$
  {^0}\dot r_{{^i}O,{^0}O}=
  {^0}\dot r_{{^{i-1}}O,{^0}O}+
  {^0}\omega_i\times 
  {^0}r_{{^i}O,{^{i-1}}O}+
  \sigma_i{^0}R_{i-1}
  \left[\begin{matrix}
  0\\0\\\dot q_i
  \end{matrix}\right]
  $$

## [Inverse Differential Kinematics]

- **Pseudo Inverse**
  $$
  J^{\textdagger} = J^T(JJ^T)^{-1}
  $$

- **Newton Method**
  $$
  q_{k+1}\leftarrow q_k + \alpha\cdot J_A^{\textdagger}(\dot x_d+(I-J^\textdagger J)\dot q_0)
  $$
  

## [Lagrange]

- **Kinematic Energy**
  $$
  \begin{aligned}
  E_{kin,link_i}&=\frac{1}{2}m_{link_i}
  {^0}\dot r_{CG_{link_i},{^0}O}^T
  {^0}\dot r_{CG_{link_i},{^0}O}+
  \frac{1}{2}
  {^0}\omega_i^T
  {^0}R_i
  {^i}I_{link_i}
  {^0}R_i^T
  {^0}\omega_i
  \\
  &=\frac{1}{2}m_{link_i}
  \dot q^T
  J_{GP_{link_i}}^T
  J_{GP_{link_i}}
  \dot q
  +\frac{1}{2}
  \dot q^T
  J_{GO_{link_i}}^T
  {^0}R_i
  {^i}I_{link_i}
  {^0}R_i^T
  J_{GO_{link_i}}
  \dot q
  \\
  E_{kin,mot_i}&=\frac{1}{2}m_{mot_i}
  {^0}\dot r_{CG_{mot_i},{^0}O}^T
  {^0}\dot r_{CG_{mot_i},{^0}O}+
  \frac{1}{2}
  {^0}\omega_{mot_i}^T
  {^0}I_{mot_i}
  {^0}\omega_{mot_i}
  \\
  &=\frac{1}{2}m_{mot_i}
  \dot q^T
  J_{GP_{mot_i}}^T
  J_{GP_{mot_i}}
  \dot q+
  \frac{1}{2}
  \dot q^T
  J_{GO_{mot_i}}^T
  {^0}R_{mot_i}
  {^{mot_i}}I_{mot_i}
  {^0}R_{mot_i}^T
  J_{GO_{mot_i}}
  \dot q
  \\
  E_{kin} &= \sum_{i=1}^{|q|}
  (E_{kin,link_i}+E_{kin,mot_i})
  \end{aligned}
  $$
  
- **Inertia Matrix**
  $$
  M(q)=\sum_{i=1}^n(m_{link_i}J_{GP_{link_i}}^TJ_{GP_{link_i}}+
  J_{GO_{link_i}}^T{^0}R_i{^i}I_{link_i}{^0}R_i^TJ_{GO_{link_i}})
  $$
  
- **Geometric Jacobian for link**
  $$
  \left[\begin{matrix}
  J_{GP_{link_i}}\\
  J_{GO_{link_i}}
  \end{matrix}\right]=
  \left[\begin{matrix}
  \dot J_{GP1_{link_i}}&\cdots&\dot J_{GPi_{link_i}}&\textbf 0&\cdots&\textbf 0\\
  \dot J_{GO1_{link_i}}&\cdots&\dot J_{GOi_{link_i}}&\textbf 0&\cdots&\textbf 0\\
  \end{matrix}\right]
  $$

  $$
  \left[\begin{matrix}
  \dot J_{GPj_{link_i}}\\
  \dot J_{GOj_{link_i}}
  \end{matrix}\right]=
  \begin{cases}\begin{aligned}
  prismatic:&
  \left[\begin{matrix}
  {^0}e_{z,{^{j-1}}O}\\
  \textbf 0
  \end{matrix}\right]\\
  revolute:&
  \left[\begin{matrix}
  {^0}e_{z,{^{j-1}}O}\times
  ({^0}r_{CG_{link_i},{^0}O}-{^0}r_{{^{j-1}}O,{^0}O})
  \\
  {^0}e_{z,{^{j-1}}O}
  \end{matrix}\right]
  \end{aligned}\end{cases}
  $$

  

## [Newton-Euler]

- **Angular velocity**
  $$
  {^i}\omega_i &= 
  \begin{cases}\begin{aligned}
  prismatic:& {^{i-1}}R_i^T {^{i-1}}\omega_{i-1}
  \\
  revolute:&
  {^{i-1}}R_i^T({^{i-1}}\omega_{i-1}+\left[\begin{matrix}0\\0\\\dot q_i\end{matrix}\right])
  \end{aligned}\end{cases}
  $$

- **Angular Acceleration**
  $$
  {^i}\dot \omega_i &=
  \begin{cases}\begin{aligned}
  prismatic:&{^{i-1}}R_i^T {^{i-1}}\dot \omega_{i-1}
  \\
  revolute:& 
  {^{i-1}}R_i^T(
  {^{i-1}}\dot \omega_{i-1}+
  \left[\begin{matrix}
  0\\0\\\ddot q_i
  \end{matrix}\right]+
  {^{i-1}}\omega_{i-1}\times
  \left[\begin{matrix}
  0\\0\\\dot q_i
  \end{matrix}\right]
  )
  \end{aligned}\end{cases}
  $$

- **Angular Acceleration for motor**
  $$
  {^{i-1}}\dot \omega_{mot_i}=
  {^{i-1}}\dot \omega_{i-1}+
  i_{mot_i}\ddot q_{i}
  {^{i-1}}e_{z,mot_i}+
  i_{mot_i}\dot q_i
  {^{i-1}}\omega_{i-1}\times
  {^{i-1}}e_{z,mot_i}
  $$

- **Linear Acceleration**
  $$
  {^i}\ddot r_{{^i}O,{^0}O}&=
  \begin{cases}\begin{aligned}
  prismatic:&
  {^{i-1}}R_i^T(
  {^{i-1}}\ddot r_{{^{i-1}}O,{^0}O}
  \left[\begin{matrix}
  0\\0\\\ddot q_i
  \end{matrix}\right])+
  2\dot q_i{^i}\omega_i\times(
  {^{i-1}}R_i^T
  {^{i-1}}e_{z,{^{i-1}}O})+
  {^i}\dot \omega_i\times
  {^i}r_{{^i}O,{^{i-1}}O}+
  {^i}\omega_i\times(
  {^i}\omega_i\times
  {^i}r_{{^i}O,{^{i-1}}O}
  )
  \\
  revolute:&
  {^{i-1}}R_i^T
  {^{i-1}}\ddot r_{{^{i-1}}O,{^0}O}+
  {^i}\dot \omega_i\times
  {^i}r_{{^i}O,{^{i-1}}O}+
  {^i}\omega_i\times(
  {^i}\omega_i\times
  {^i}r_{{^i}O,{^{i-1}}O}
  )
  \end{aligned}\end{cases}
  $$

- **Linear Acceleration for link**
  $$
  {^i}\ddot r_{CG_{link_i},{^0}O}=
  {^i}\ddot r_{{^i}O,{^0}O}+
  {^i}\dot \omega_i\times
  {^i}r_{CG_{link_i},{^i}O}+
  {^i}\omega_i\times(
  {^i}\omega_i\times
  {^i}r_{CG_{link_i},{^i}O}
  )
  $$

- **Force**
  $$
  {^i}f_{i,i-1} =
  {^i}R_{i+1}
  {^{i+1}}f_{i+1,i}+
  m_i
  {^i}\ddot r_{CG_i,{^0}O}+
  c_{vi}\dot d_i^{i-1}
  e_{z,mot_i}+
  F_{di}
  sgn(\dot d_i)
  {^{i-1}}e_{z,mot_i}
  $$

- **Moment**
  $$
  \begin{aligned}
  {^i}\mu_{i,i-1} &= -
  {^i}f_{i,i-1}\times(
  {^i}r_{{^i}O,{^{i-1}}O}+
  {^i}r_{CG_i,{^i}O})+
  {^i}R_{i+1}
  {^{i+1}}\mu_{i+1,i}+(
  {^i}R_{i+1}
  {^{i+1}}f_{i+1,i})\times
  {^i}r_{CG_i,{^i}O}+
  {^i}I_i
  {^i}\dot \omega_i+
  {^i}\omega_i \times(
  {^i}I_i
  {^i}\omega_i)
  \\
  &+i_{mot_{i_1}}
  \ddot q_{i+1}
  I_{mot_{i+1}}
  {^0}e_{z,mot_{i+1}}+
  i_{mot_{i+1}}
  \dot q_{i+1}
  I_{mot_{i+1}}
  {^0}\omega_i\times
  {^0}e_{z,mot_{i+1}}+
  c_{vi}\dot \delta_i^{i-1}
  e_{z,mot_i}+
  F_{di}
  sgn(\dot \delta_i)
  {^{i-1}}e_{z,mot_i}
  \end{aligned}
  $$

- **Torque**
  $$
  \tau_i = \begin{cases}\begin{aligned}
  prismatic:&
  ({^{i-1}}R_{i+1})^T
  {^{i+1}}f_{i+1,i}
  {^{i-1}}e_{z,{^{i-1}}O}+
  i_{mot_i}I_{mot_i}
  {^{i-1}}e_{z,mot_i}+
  c_{vi}\dot d_i+
  F_{di}sgn(\dot d_i)
  \\
  revolute:&
  ({^{i-1}}R_{i+1})^T
  {^{i+1}}\mu_{i+1,i}
  {^{i-1}}e_{z,{^{i-1}}O}+
  i_{mot_i}I_{mot_i}
  {^{i-1}}e_{z,mot_i}+
  c_{vi}\dot d_i+
  F_{di}sgn(\dot d_i)
  \end{aligned}\end{cases}
  $$
  
- **Linear Approach**
  $$
  \tau = Y(q,\dot q,\ddot q)\pi
  $$
  

## [Application in Dynamics]

- **Scaling Function**
  $$
  r(t)=c1\cdot t+c2
  $$

## [Trajectory Planning]

- **RectLinear  Path**
  $$
  r_P(s)=r_{P_{start}}+\frac{s}{||r_{P_{end}}-r_{P_{start}}||}(r_{P_{end}}-r_{P_{start}})
  $$

- **Circular Arc**
  $$
  \begin{aligned}
  {^0}e_{z,C_0} &= \frac{
  {^0}r_{P_{mid},P_{start}}\times 
  {^0}r_{P_{end},P_{start}}}{|
  {^0}r_{P_{mid},P_{start}}\times 
  {^0}r_{P_{end},P_{start}}|}
  \\
  {^0}e_{H_1} &= \frac{
  {^0}e_{z,C_0}\times
  {^0}r_{P_{mid},P_{start}}
  }{|
  {^0}e_{z,C_0}\times
  {^0}r_{P_{mid},P_{start}}
  |}
  \\
  {^0}e_{H_2} &= \frac{
  {^0}e_{z,C_0}\times
  {^0}r_{P_{end},P_{start}}
  }{|
  {^0}e_{z,C_0}\times
  {^0}r_{P_{end},P_{start}}
  |}
  \\
  {^0}r_{C_0,{^0}O}&=
  {^0}r_{P_{start},{^0}O}+
  \frac{1}{2}{^0}r_{P_{mid},P_{start}}+
  h_1 {^0}e_{H_1}
  \\&=
  {^0}r_{P_{start},{^0}O}+
  \frac{1}{2}{^0}r_{P_{end},P_{start}}+
  h_2 {^0}e_{H_2}
  \end{aligned}
  $$