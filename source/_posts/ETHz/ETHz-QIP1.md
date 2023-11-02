---
title: Quantum Information Processing:Concept
index_img: img/surface_code.png
banner_img: img/banner-bone.jpg
date: 2023-08-25 16:04:00
category: "Note"
tags: [ETH Zürich, Physics, Quantum Physics, Quantum Computing]
---
<div align="center"><font color="#7E84F7" size=8>QIP1</font><font size=6>Quantum Information Processing:Concept</font></div>

---

<div align="center">professor : Jonathan Home</div>

<div align="center"> author : walkerchi </div> 

---

# Quantum State

- **unitary** : $S^\dagger S = SS^\dagger= I$
- **Hermitian** : $S^\dagger=S$
- **projector** : $SS=S$
- $\otimes$ : tensor product

## Bloch Sphere

$$
\begin{aligned}
\ket \psi &=\alpha \ket 0  + \beta \ket 1 & \Vert \alpha \Vert^2 + \Vert \beta \Vert^2 = 1\\
&= \text{cos}(\theta/2)\ket 0 + e^{i\phi}\text{sin}(\theta/2)\ket 1
\\
&= \text{cos}(\theta/2)\ket  0 + (\text{cos}\phi + i~\text{sin}\phi) \text{sin}(\theta/2)\ket 1
\end{aligned}
$$



<img src="./README.assets/bloch_sphere.png" alt="img" style="zoom:30%;" />

- $z$ axis :  $\ket 0 = \begin{bmatrix}1\\0\end{bmatrix}\quad \ket 1 = \begin{bmatrix}0\\1\end{bmatrix}$
- $x$ axis : $\ket + = \frac{1}{\sqrt 2}\begin{bmatrix}1\\1\end{bmatrix}\quad \ket - = \frac{1}{\sqrt 2}\begin{bmatrix}1\\-1\end{bmatrix}$
- $y$ axis : $\ket +_y=\frac{1}{\sqrt 2}\begin{bmatrix}1\\i\end{bmatrix}\quad\ket -_y= \frac{1}{\sqrt 2}\begin{bmatrix}1\\-i\end{bmatrix}$

  **pauli matrices** : $\hat \sigma_x = \begin{bmatrix}0&1\\1&0\end{bmatrix}\quad \hat \sigma_y=\begin{bmatrix}0&-i\\i&0\end{bmatrix}\quad \hat \sigma_z = \begin{bmatrix}1&0\\0&-1\end{bmatrix}$

## No-cloning theorem

$$
\not \exists \hat U ~\forall \psi,\phi  \quad U(\ket \psi\otimes \ket 0) = \ket \psi \otimes \ket\psi\quad U(\ket\phi\otimes \ket 0)=\ket  \phi\otimes\ket \phi
$$

## Entanglement

$$
\ket {\Psi}_{AB} \neq \ket \alpha_A \otimes \ket \beta_B
$$

- **Bell states** : maximally entangled states for two qubits

$$
\begin{matrix}
\ket {\Phi^+} = \frac{1}{\sqrt 2}(\ket {00}+\ket {11})&
\ket {\Psi^+} = \frac{1}{\sqrt 2}(\ket {01}+\ket {10})\\
\ket {\Phi^-} = \frac{1}{\sqrt 2}(\ket {00} - \ket {11})&
\ket {\Psi^-} = \frac{1}{\sqrt 2}(\ket {01} - \ket {10})
\end{matrix}
$$

- **identify entanglement** : more than 1 non-zero eigen values $\exist \lambda_1,\lambda_2 \neq 0$

- **product state** : $\ket \Psi_{AB} = \ket \alpha_A \otimes \ket \beta_B$ no entanglement

- **Schmidt decomposition** : $\ket\Psi\in \mathcal H_1\otimes  \mathcal H_2\to \ket\Psi = \sum_{i=1}^m \lambda_i\ket  {u_i}\otimes \ket{v_i}\quad \ket {u_i}\in \mathcal H_1,\ket{v_i}\in \mathcal H_2$

  - *Schmidt rank* : $m$

    - independent from the choice of basis of $\mathcal H_A$ and $\mathcal H_B$

  - *Schmidt coefficient* : $\alpha_i$
  
    > <font color="lightblue"> Example</font>
    >
    > $\Psi = \frac{\ket {00}+\ket{11}+2\ket{++}}{\sqrt {10}} = \frac{3\ket{00}+2\ket{01}+2\ket{10}+3\ket{11}}{\sqrt{10}}$
    >
    > schmidt  rank : $4$
    >
    > schmidt coefficient : $\frac{1}{\sqrt{10}}[3,2,2,3]$

## Bell Inequality

|                   | location $A$                                                 | location $B$                                                 |                                                              |
| ----------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| CHSH  inequatlity | $Q=\pm 1\quad R=\pm 1$                                       | $S=\pm 1\quad T=\pm 1$                                       | $\langle QS\rangle+\langle RT\rangle+\langle RS\rangle-\langle QT\rangle\le 2$ |
| Quantum Violation | $\hat Q = \hat\sigma_z\otimes I\\\hat R=\hat \sigma_x\otimes I\\ $ | $\hat S=\frac{-1}{\sqrt 2}\hat I\otimes(\hat \sigma_z+\hat \sigma_x)\\ \hat T = \frac{1}{\sqrt 2}\hat I\otimes (\hat \sigma_z -\hat \sigma_x)$ | $\langle QS\rangle+\langle RT\rangle+\langle RS\rangle-\langle QT\rangle =2\sqrt 2>2$ |



---

# Quantum Gate



## Rotation

- $
  R_x(\theta) = e^{-i\theta X/2}= \text{cos}(\theta/2)I - i~sin(\theta/2)X=\begin{bmatrix}\text{cos}(\theta/2)&-i~\text{sin}(\theta/2)\\-i~\text{sin}(\theta/2)&\text{cos}(\theta/2)\end{bmatrix}
  $
- $
  R_y(\theta) &= e^{-i\theta Y/2}= \text{cos}(\theta/2)I - i~sin(\theta/2)Y=\begin{bmatrix}\text{cos}(\theta/2)&-~\text{sin}(\theta/2)\\\text{sin}(\theta/2)&\text{cos}(\theta/2)\end{bmatrix}
  $
- $R_z(\theta) &= e^{-i\theta Z/2}= \text{cos}(\theta/2)I - i~sin(\theta/2)Z=\begin{bmatrix}e^{-i\theta/2}&0\\0&e^{i\theta/2}\end{bmatrix}$

## Pauli Gates

$\sigma_{\{x,y,z\}}$ rotate around $\{x,y,z\}$ axis by $\pi$ in Bloch sphere

## Hadamard Gate

$H$ rotation about axis $\frac{1}{\sqrt 2}(\hat x +\hat z)$ by $\pi$

- $H\ket 0 =  \frac{1}{\sqrt 2}(\ket 0 + \ket 1) = \ket +$
- $H\ket 1 = \frac{1}{\sqrt 2}(\ket 0 - \ket 1) = \ket -$
- $H \ket  x = \frac{1}{\sqrt 2} (\ket 0 + (-1)^x\ket  1)$
- $H^{\otimes n}\ket x = \frac{1}{\sqrt{2^n}}\sum_{y\in\{0,1\}^n}(-1)^{x\cdot y}\ket y$

## Two qubits Gate

- $\text{CNOT} = \ket 0_c\bra 0_c  \otimes \hat I_t + \ket 1_c \bra 1_c \otimes \hat X_t$

  <img src="./README.assets/cnot.png" alt="img" style="zoom:33%;" />

- $\text{CPAHSE} = \ket 0_c\bra0_c \otimes \hat I_t + \ket 1_c\bra 1_c\otimes \hat Z_t$

  <img src="./README.assets/cz.png" alt="img" style="zoom:33%;" />

## Matrix Table

| Operator                       | Matrix                                                       | Operator                                 | Matrix                                                       | Operator             | Matrix                                                       |
| ------------------------------ | ------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| Pauli-x ($\sigma_x$)           | $\begin{bmatrix} 0 & 1 \\ 1 & 0\end{bmatrix}$                | Pauli-Y ($\sigma_y$)                     | $\begin{bmatrix}0 &-i\\ i & 0\end{bmatrix}$                  | Pauli-Z ($\sigma_z$) | $\begin{bmatrix}1 & 0\\0 &-1\end{bmatrix}$                   |
| Hadamard ($H$)                 | $\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\ 1 & -1\end{bmatrix}$ | Identity ($I$)                           | $\begin{bmatrix}1&0\\0&1\end{bmatrix}$                       |                      |                                                              |
| Phase ($S$,$P$)                | $\begin{bmatrix}1 & 0 \\0 & i\end{bmatrix}$                  | $\frac{\pi}{8}$ ($T$, not Clifford gate) | $\begin{bmatrix}1 & 0 \\ 0 & e^{i\pi / 4} \end{bmatrix}$     |                      |                                                              |
| Controlled Not ($CNOT$,  $CX$) | $\begin{bmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0\\ 0& 0 & 0 & 1\\ 0 & 0 & 1 & 0\end{bmatrix}$ | Controlled Z ($CZ$, $CSIGN$, $CPHASE$)   | $\begin{bmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&-1\end{bmatrix}$ | SWAP                 | $\begin{bmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{bmatrix}$ |

## Universal quantum gates

- Rotation gates $R_x(\theta),R_y(\theta),R_z(\theta)$, phase gate $P(\phi)$, CNOT
- $\{\text{CNOT},H,T\}$
- $\{\text{CNOT}\}\cup \mathcal U(2)$ 
- $\{\text{Toffoli(CCNOT)},H\}$

**Clifford group** : $\mathcal C_n = \left\{U\in \mathcal U(2^n):\forall P\in\mathcal P_n:UPU^{\dagger}\in \mathcal P_n\right\}$ where $\mathcal U$ means unitary

---

# Algorithms

## Complexity

| complexity class | problem                                               | polynomial in time/space | classical / quantum |
| ---------------- | ----------------------------------------------------- | ------------------------ | ------------------- |
| **P**            | decision problem                                      | time                     | classical           |
| **BPP**          | probabilistic algorithm failure at most $\frac{1}{3}$ | time                     | classical           |
| **NP**           | proof the answer is yes                               | time                     | classical           |
| **PSPACE**       | decision problem                                      | space                    | classical           |
| **BQP**          | decision problem failure at most $\frac{1}{3}$        | time                     | quantum             |

- $\text{BPP}\subset \text{BQP}$ : quantum simulation of classical circuits
- $\text P\subset \text{BPP}$
- $\text P\subset \text{NP}\subset \text{PSAPCE}$

## Oracle 

- Phase oracle : $U_f\ket x = (-1)^{f(x)}\ket x$

  <img src="./README.assets/phase_oracle.png" alt="img" style="zoom:50%;" />
  $$
  \begin{aligned}
  O_f\ket y\ket x  &= \ket {y\oplus f(x)}\ket x\\
  O_f\ket -\ket x &= O_f\frac{1}{\sqrt 2}(\ket 0 - \ket 1)\ket x\\
  &= \frac{1}{\sqrt 2}(\ket {f(x)} - \ket{1\oplus f(x)})\ket x\\
  &= (-1)^{f(x)}\ket -\ket x
  \end{aligned}
  $$

- Bit oracle : $O_f\ket y\ket x = \ket {y\oplus f(x)}\ket x$

  <img src="./README.assets/bit_oracle.png" alt="img" style="zoom:40%;" />


$$

$$

## Deutsch-Josza

<img src="./README.assets\deutsch-josza.png" alt="img" style="zoom:50%;" />

Distinguish $f(x)$ whether is **constant** function or **balanced** function. $\mathcal O(N) \to \mathcal O(1)$

- **constant**: evaluates to the same value regardless of input

- **balanced**: the number of inputs which output $1$ equals the number of inputs which output $0$

$$
\begin{aligned}
\bra 0 ^{\otimes n} H^{\otimes n}U_f H^{\otimes n}\ket 0^{\otimes n}
&= \bra 0 ^{\otimes n}H^{\otimes n} \textcolor{orange}{U_f}\underbrace{\left(\frac{1}{\sqrt {2^n}}\sum_{x\in\{0,1\}^n}\ket x\right)}_{H^{\otimes n}\ket 0^{\otimes n}}\\
&= \bra 0 ^{\otimes n}\textcolor{#9FFCFD}{H^{\otimes n}}\left(\frac{1}{\sqrt{2^n}}\sum_{x\in\{0,1\}^n}\textcolor{orange}{(-1)^{f(x)}}\ket x\right)\\
&= \bra 0 ^{\otimes n}\textcolor{#9FFCFD}{\frac{1}{\sqrt{2^n}}\sum_{x\in\{0,1\}^n}}\textcolor{orange}{(-1)^{f(x)}}\left(\frac{1}{\sqrt {2^n}}\sum_{y\in\{0,1\}^n}\textcolor{#9FFCFD}{(-1)^{x\cdot y}}\ket y\right)\\
&= \frac{1}{2^n}\sum_{x, y \in\{0,1\}^n}\textcolor{orange}{(-1)^{f(x)}} (-1)^{x\cdot y} \bra {0^{\otimes n}} \ket {y}\\
& = \frac{1}{2^n}\sum_{x\in\{0,1\}^n}\textcolor{orange}{(-1)^{f(x)}}\\
&=\begin{cases}
0 & f(x)~\text{is balanced}
\\
\pm 1 & f(x)~\text{is constant}
\end{cases}
\end{aligned}
$$
> Notation : 
>
> 1. $n$ : length of bit string
> 2. $N$ : total number of quantum state $N = 2^n$
> 3. $H$ : Hadamard gate

## Grover

<img src="./README.assets\grover.png" alt="img" style="zoom:40%;" />

find the unique $x_0$ that $f(x_0)=1\quad f:\{1,\cdots,N\}\to \{0,1\}$, $O(N)\to O(\sqrt N)$

- **oracle operator** : $U_f = I - 2\ket {x_0}\bra{x_0}\quad U_0 = I  -2\ket 0 ^{\otimes n}\bra 0^{\otimes n}$
- **grover diffusion **: $U_s = H^{\otimes n}(-U_0)H^{\otimes n} = 2\ket {+^n}\bra{+^n} - I$

**Reflection** 

- Reflection about $\ket{\psi_\perp}$: $R_{\psi_\perp} \ket{\phi} = (I-2\ket \psi\bra\psi)~(\alpha\ket \psi +\beta \ket {\psi_\perp})
  =-\alpha\ket\psi +\beta \ket {\psi_\perp}$
  - $U_f=R_{x_{0}^\perp}$  reflect about $\ket {x_0^\perp}$
- Reflection about $\ket {\psi}$ : $R_{\psi} \ket\phi =(2\ket \psi\bra\psi-I)~(\alpha\ket \psi +\beta\ket{\psi_\perp})
  =\alpha\ket\psi -\beta\ket{\psi_\perp}$
  - $U_s=R_{+}$ : reflection about $\ket {+^n}$


$$
\begin{aligned}
\bra{x_0} U_sU_f\ket \phi  &= \text{cos}\left(\text{arccos}(\bra{x_0}\ket{\phi})-2\text{arcsin}(\bra{x_0}\ket {+})\right)
\\
\bra{x_0}(U_sU_f)^r\ket {+^n} &=
\text{cos}(\text{arccos}(\bra{x_0}\ket{+})-2r~\text{arcsin}(\bra{x_0}\ket{+}))
\end{aligned}
$$

$$
\Rightarrow r = \frac{\text{arccos}(\frac{1}{\sqrt N})}{2~\text{arcsin}(\frac{1}{\sqrt N})}\approx  \frac{\pi\sqrt N}{4}
$$

> <font color="orange">Algorithm</font>	
>
> 1. $\ket \Psi\gets  H^{\otimes  n}\ket 0^{\otimes n}$ : after this step $\ket\Psi = \ket {+^n}$
> 2. for $r$ times, $r=\frac{\text{artcos}(\frac{1}{\sqrt N})}{2\text{arcsin}(\frac{1}{\sqrt N})}$
>    1. $\ket\Psi \gets U_sU_f\ket  \Psi$
> 3. measure $\ket \Psi$, the greatest probability will be $x_0$

> Notation
>
> - $n$ : length of bit string
> - $N$ : total number of quantum state $N = 2^n$
> - $\ket {+^n} = \frac{1}{\sqrt {2^n}}\underset{x=\{0,1\}^n}{\sum} \ket x = \frac{1}{\sqrt N} \underset{x=\{0,1\}^n}{\sum}\ket x$



## [QFT] Quantum  Fourier  transform

<img src="./README.assets\QFT.png" alt="img" style="zoom:40%;" />

$Q_N \ket x = \frac{1}{\sqrt N}\overset{N-1}{\underset{y=0}{\sum}}e^{2\pi ixy /N}\ket y$ : $\mathcal O(N\text{log}N)\to  \mathcal  O(n^2)$
$$
\begin{aligned}
Q_N \ket x &= \frac{1}{\sqrt N}\sum_{y\in\{0,1\}^n}e^{2\pi ixy/N}\ket y
\\
&= \frac{1}{\sqrt N}\sum_{y\in\{0,1\}^n}\underbrace{e^{2\pi ix\sum_k^n 2^k y_k/N}\ket {y_{n-1}}\cdots\ket {y_0}}_{\text{single bits of } e^{2\pi i xy/ N} }
\\
&= \frac{1}{\sqrt N}\otimes_{j=1}^n\left(\sum_{y_{n-j}\in\{0,1\}}e^{2\pi ixy_{n-j}/2^j}\ket{y_{n-j}}\right)
\\
&=\frac{1}{\sqrt N}(\ket {0_{n-1}} + e^{.x_02\pi i}\ket {1_{n-1}})\otimes(\ket {0_{n-2}}+e^{.x_1x_0 2\pi i }\ket {1_{n-2}})\cdots(\ket {0_0}+e^{.x_{n-1}\cdots x_0 2\pi i}\ket {1_0})
\\
& = \frac{1}{\sqrt N}(H\ket {x_0})\otimes (R_1 H\ket {x_1}) \dots(R_{n-1}\dots R_1H\ket {x_{n-1}})
\end{aligned}
$$

Number of gates in QFT of $n$ bit string 

- $CR_j$ (Controled-$R_j$) : $\frac{n(n-1)}{2}$
- SWAP : $\frac{n}{2}$ used to reverse the qubit, $\ket{y_0y_1y_2y_3}\to\ket{y_3y_2y_1y_0}$
- $H$ : $n$

> Notation
>
> - $n$ : length of bit string
> - $N$ : total number of quantum state $N = 2^n$
> - $R_d$ : rotation matrix : $R_d = \begin{bmatrix}
>   1 & 0\\
>   0 & e^{\pi i/2^{d}}
>   \end{bmatrix}$
> - $H$ : Hadamard gate : $H = \frac{1}{\sqrt 2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}$ $H\ket {x_k} = \frac{1}{\sqrt 2}(\ket 0 + e^{.x_k2\pi i}\ket 1)$
> - $e^{.x_1x_0 }$ : $e^{\frac{1}{2}x_1+\frac{1}{4}x_0}$

> <font color="lightblue"> Example</font>
> $$
> Q_2 = \frac{1}{\sqrt 2}\begin{bmatrix} 
> 1&1\\
> 1&-1
> \end{bmatrix} = H
> & Q_3 = \frac{1}{\sqrt 3}\begin{bmatrix}
> 1 & 1 & 1\\
> 1 & e^{2\pi i/3} & e^{-2\pi i/3}\\
> 1 & e^{-2\pi i /3} & e^{2\pi i /3}
> \end{bmatrix}
> & Q_4 = \frac{1}{2}\begin{bmatrix}
> 1&1&1&1\\
> 1&i&-1&-i\\
> 1&-1&1&-1\\
> 1&-i&-1&i
> \end{bmatrix}
> $$



## Shor  factoring

<img src="./README.assets/shor_factoring.png" alt="img" style="zoom:40%;" />

given a non-prime integer $N$ represented as a bit string, find a non-trivial factor $a^x\text{mod} ~N$, $a^r\text{mod} N = 1\to(a^{r/2}+1)(a^{r/2}-1) \text{mod} N = 0$
$$
\begin{aligned}
\ket {\Phi} &= O_f(\text{id}^{\otimes n}\otimes H^{\otimes n})\ket {0}^{\otimes n}\ket {0}^{\otimes n}
\\
&=O_f\frac{1}{\sqrt N}\sum_{x\in\{0,1\}^n}\ket {0}^{\otimes n}\ket x
\\
&=\frac{1}{\sqrt N}\sum_{x\in\{0,1\}^n}\ket {f(x)}\ket x
\\

\ket {\Psi_z} 
&= \sqrt{\frac{r}{N}}\sum_{t=0}^{N/r-1}\ket{x_0 + rt}
\quad \propto \sum_{x:f(x)=z}\ket x
\\

\ket {\tilde \Psi_z} &= Q_{N}^\dagger\ket {\Psi_z}
\\
&= \sqrt{\frac{r}{N^2}}\sum_{t=0}^{N/r-1}\sum_{y=0}^{N-1}e^{-2\pi i(x_0+rt)y/N}\ket y
\\
&= \sqrt{\frac{r}{N^2}}\sum_{y=0,ry\text{mod}=0}^{N-1}e^{-2\pi ix_0 y/N}\frac{N}{r}\ket y
\\
&= \frac{1}{\sqrt r}\sum_{y=0,ry\text{mod}=0}^{N-1}e^{-2\pi ix_0 y/N}\ket y
\end{aligned}
$$

> <font color="orange">Algorithm</font>
>
> 1. find the order $r$ that $a^x~\text{mod}~N= a^{x+r}~\text{mod}~N$ using **period finding** in $\mathcal O(\text{poly}(n))$
>    1. $\ket \Psi = I^{\otimes n} \otimes H^{\otimes n} \ket 0^{\otimes n}\otimes  \ket 0^{\otimes n } =\ket {0}^{\otimes n}\otimes \left(\frac{1}{\sqrt N}\underset{x\in\{0,1\}}{\sum}\ket x\right)$
>    2. $\ket \Phi = O_f\ket \Psi = \frac{1}{\sqrt N}\underset{x\in\{0,1\}}{\sum}\ket {f(x)}\ket x$
>    3. measure $f(x)=z$ then $\ket{\Psi_z} = \sqrt{\frac{r}{N}}\overset{N/r-1}{\underset{t=0}{\sum}}\ket{x_0 + rt}
>       \quad \propto \sum_{x:f(x)=z}\ket x$
>    4. $\tilde {\ket \Phi} = Q_N^\dagger  \ket \Psi_z = \sqrt{\frac{r}{N^2}}\overset{N/r-1}{\underset{t=0}{\sum}}\overset{N-1}{\underset{y=0}{\sum}}e^{-2\pi i(x_0+rt)y/N}\ket y = \frac{1}{\sqrt r}\overset{N-1}{\underset{y=0,ry\text{mod}N=0}{\sum}}e^{-2\pi ix_0 y/N}\ket y$
>    5. measure $\tilde {\ket \Phi}$ multiple times $s_1,\cdots,  s_i$, the results are multiples of $r$, use **euclid algorithm** to compute the $r = N / \text{gcd}(s_1,\cdots,s_i)$
> 2. if $r~\text{mod}~2 = 0$ and $a^{r/2}\pm1~\text{mod}~N\neq 0$ 
>    1. candidate factor  $\tilde p=\text{gcd}(a^{r/2}-1,N)$ using **euclid algorithm**
> 3. else go to 1


```python
@classical
def euclid_gcd(a, b):
    # O(logn)
    return b if a==0 else euclid_gcd(b%a, a)
@quantum
def period_finding(a, n, N):
    # a^r mod N = 1, O(N)
    Of = lambda x: a**x % N
    s0, s1 = None, None
    while True:
        x0, x1 = zeros(n), zeros(n)
        x0, x1 = I(x0), H(x1)
        x0, x1 = Of(x0, x1)
        if not measure(x0).all_equals(): # O(2^n/n) = O(N/n) fail
            continue
        x1 = IQFT(x1)
        if s0 is None:  # fail O(1)
            s0 = measure(x1)
            continue
        s1 = measure(x1)
        N_r= euclid_gcd(s0, s1) # N/r if k coprime k'
        s0, s1 = None, None
        r = N / N_r
        break
        
    return r

def shor_factoring(N):
    # find a factor of N
    n = ceil(log2(N))
    
    while True:
        a = random(N)
        K = euclid_gcd(a, N):
        if K != 1:
            return K 
  
        r = period_finding(a, n, N)
        if is_odd(r): continue 
        g = eulid_gcd(N, a**(r//2 + 1))
        if g != 1: 
            return g
```



---

# Error Correction

## Quantum operations

- **Density operator** : $\hat \rho = \underset{i,j}{\sum}\rho_{i,j}\ket i\bra j$
  - diagonal gives the probability of the state
- **Partial trace** : $\text{Tr}_B(\ket {a_1}\bra {a_2}\otimes \ket {b_1}\bra{b_2}) = \ket {a_1}\bra{a_2}\text{Tr}(\ket {b_1}\bra{b_2})$
- **Purification** : $\rho^A =  \text{Tr}_R(\ket{AR}\bra{AR})$
- **Evolution** : $\rho_t = U\rho_0U^\dagger$
- **Trace Preserving CP map** : $\rho(t)=\tau_A(\rho_A(0))$
  - trace preserving : $\text{Tr}(\rho) = 1$
  - positive : $\lambda_\rho\ge 0$
  - complete positivity 
- **Kraus Operator** : $\rho'  = \sum_i\hat E_i \rho_0\hat E_i^\dagger\quad \hat E_i =  \bra {e_i}\hat U\ket {e_0}$

##  Damping channel

- **Amplitude Dampling** ：$\hat E_1 = \begin{bmatrix}
  0 & \sqrt \gamma  \\
  0 & 0
  \end{bmatrix}
  &
  \hat E_0 = \begin{bmatrix}
  1 & 0 \\
  0 & \sqrt{1-\gamma}
  \end{bmatrix}$

  <img src="./README.assets/amplitude_dampling.png" alt="img" style="zoom:33%;" />

  - excited state $\ket 1$ damping to $\ket 0$ due to loss of energy

    

- **Phase Damping** : $\hat E_1 = \begin{bmatrix}
  0 & 0 \\
  0 & \sqrt r 
  \end{bmatrix} &
  \hat E_0  = \begin{bmatrix}
  1 & 0\\
  0 & \sqrt{ 1- r}
  \end{bmatrix}$

  <img src="./README.assets/phase_damping.png" alt="img" style="zoom:33%;" />

  - lossing phase information, energy conserved

## Error Channels

- **Bit Flip** : $\hat E_1 = \sqrt p X 
  \quad E_0 = \sqrt{1-p} I$
- **Phase Flip** : $\hat E_1 = \sqrt p Z \quad 
  E_0 = \sqrt {1-p}I$
- **Phase+Bit Flip** : $\hat E_1 = \sqrt p Y\quad 
  \hat E_0 = \sqrt {1-p} I$
- **Depolarizing(Bit/Phase/Bit+Phase Flip)** : $\hat E_1 = \frac{p}{4}X\quad
  \hat E_2 = \frac{p}{4}Y\quad
  \hat E_3 = \frac{p}{4}Z\quad
  \hat E_0 = \left(1-\frac{3p}{4}\right)I$

- if code can  correct Pauli  $X$ and Pauli $Z$ errors then it can correct all the Pauli operator errors

## Tomography

- **Process tomography** : determine the effect of a quantum operation $\mathcal E(\hat \rho)=\underset{i,j}{\sum}\rho_{i,j}\mathcal E(\ket i\bra j)$
  - the map $\mathcal E$ is linear
  - $4$ inputs ($\ket 1\bra 1,\ket 0 \bra 0,\ket {+_x}\bra{+_x},\ket{+_y}\bra{+_y}$) for $1$ qubit, measure output  $\rho$ for each input
- **State tomography** : determine the state of a quantum system $\rho = \frac{I+ \vec r \cdot \vec \sigma}{2}$
  - $3$ measurement for $1$ qubit
  - $d^2-1$ ($4^n-1$?) measure  for $n$-qubit state



## Classical Error Correction

**classical coding theory** :

- number of physical bits : $n$
- number of logical bits : $k$ 
- minimal bit flip to change the code : $d$
- number of errors can be corrected : $t=\frac{d-1}{2}$

## Quantum Error Correction

**Fidelity** : distance between quantum states

- two pure states : $F(\ket\psi ,\ket \phi) = |\bra \psi\ket {\phi}|^2$
- two mixed state : $F(\rho,\sigma)=\sqrt \sigma \rho \sqrt \sigma$
- one pure state one mixed state : $F(\rho,\ket \psi) = \bra \psi \rho \ket \psi$

**3-qubit bit-flip code** : $(\alpha\ket 0 + \beta  \ket 1)\otimes \ket 0 \otimes \ket 0 \to \alpha\ket {000}+\beta \ket{111}$

<img src="./README.assets/3-qubit-bit-flip-code.png" alt="img" style="zoom:40%;" />

syndrome extraction

<img src="./README.assets/3-qubit-bit-flip-syndrome.png" alt="img" style="zoom:40%;" />

- no error
  $$
  (\alpha\ket{000}+\beta\ket{111})\ket{00}\to  (\alpha\ket{000}+\beta\ket{111})\ket{00}
  $$

- one error
  $$
  \begin{aligned}
  (\alpha\ket{001}+\beta\ket{110})\ket{00}\to  (\alpha\ket{001}\beta\ket{110})\ket{01}
  \\
  (\alpha\ket{010}+\beta\ket{101})\ket{00}\to  (\alpha\ket{010}\beta\ket{101})\ket{11}
  \\
  (\alpha\ket{100}+\beta\ket{011})\ket{00}\to  (\alpha\ket{100}\beta\ket{011})\ket{10}
  \end{aligned}
  $$

| error | state                            | probability | syndrome | correction |
| ----- | -------------------------------- | ----------- | -------- | ---------- |
| $III$ | $\alpha\ket{000}+\beta\ket{111}$ | $(1-p)^3$   | $0,0$    | $III$      |
| $XII$ | $\alpha\ket{100}+\beta\ket{011}$ | $p(1-p)^2$  | $1,0$    | $XII$      |
| $IXI$ | $\alpha\ket{010}+\beta\ket{101}$ | $p(1-p)^2$  | $1,1$    | $IXI$      |
| $IIX$ | $\alpha\ket{001}+\beta\ket{110}$ | $p(1-p)^2$  | $0,1$    | $IIX$      |



 **3-qubit phase-flip code** : $(\alpha\ket 0 + \beta\ket 1)\otimes \ket 0 \otimes \ket 0 \to  \alpha\ket{+++}+\beta\ket{---}$

<img src="./README.assets/3-qubit-phase-flip-code.png" alt="img" style="zoom:45%;" />

syndrome extraction

<img src="./README.assets/3-qubit-phase-flip-syndrome.png" alt="img" style="zoom:40%;" />
$$
\ket +\ket +\overset{\text{CNOT}}{\to}\ket +\ket+
\\
\ket +\ket - \overset{\text{CNOT}}{\to}\ket -\ket -
$$

- no error
  $$
  \ket {+++}\ket{++}\to \ket{+++}\ket {++}\\
  \ket {---}\ket{++}\to \ket{---}\ket{++}
  $$

- one error
  $$
  \ket {++-}\ket{++}\to\ket{++-}\ket{+-}\\
  \ket {+-+}\ket{++}\to\ket{+-+}\ket{--}\\
  \ket {-++}\ket{++}\to\ket{-++}\ket{-+}
  $$

| error | state                            | probability | syndrome | correction |
| ----- | -------------------------------- | ----------- | -------- | ---------- |
| $III$ | $\alpha\ket{+++}+\beta\ket{---}$ | $(1-p)^3$   | $0,0$    | $III$      |
| $ZII$ | $\alpha\ket{-++}+\beta\ket{+--}$ | $p(1-p)^2$  | $1,0$    | $ZII$      |
| $IZI$ | $\alpha\ket{+-+}+\beta\ket{-+-}$ | $p(1-p)^2$  | $1,1$    | $IZI$      |
| $IIZ$ | $\alpha\ket{++-}+\beta\ket{--+}$ | $p(1-p)^2$  | $0,1$    | $IIZ$      |



**Shor 9-qubit concatenated code** : $\alpha\ket 0_L+\beta\ket 1_L= \alpha(\ket{111}+\ket{000})^{\otimes 3}+\beta(\ket{111}-\ket{000})^{\otimes 3}$

<img src="./README.assets/9-qubit-concatenated-code.png" alt="img" style="zoom:40%;" />

syndrome

- Bit errors : $Z_1Z_2,Z_2Z_3,~Z_4Z_5,Z_5Z_6,~Z_7Z_8,Z_8Z_9$
- Phase errors : $X_1X_2X_3X_4X_5X_6,X_4X_5X_6X_7X_8X_9$



- shor code can correct any single-qubit error that can be expressed as a linear combination of Pauli matrices

### Knill-Laflamme condition

different errors lead to orthogonal states, $E_{\{a,b\}}$ are error operators
$$
\bra {\Phi_i}E_a^\dagger E_b\ket{\Phi_j} = C_{ab}\delta_{ij}
$$
error operators are linearly independent
$$
\text{if}\quad E_a^\dagger E_b = I\quad \text{then} \quad C_{ab}=\sigma_{ab}
$$

> Notation
>
> - $\delta_{ij}$ : $\delta_{ij}=\begin{cases}1&i=j\\0&\text{otherwise}\end{cases}$
> - $C_{ab}$ : constant independent of $i,j$

## Stabilizer

applying any of the stabilizer operators to a codeword returns the same codeword
$$
S\ket \phi =\ket\phi
$$
> <font color="lightblue">Example</font>	:  Bell state $\ket {\Phi^+}$ stabilized by two operators
>
> - $ZZ\ket {\Phi^+}=\ket{\Phi^+}$
> - $XX\ket{\Phi^+}=\ket{\Phi^+}$

> Notation
>
> - $\mathcal P$ : pauli group : $\mathcal P =\{\pm I,\pm iI,\pm \sigma_x,\pm i \sigma_x,\pm \sigma_y,\pm i\sigma_y,\pm \sigma_z,\pm i\sigma_z\}$
>
>   - $\mathcal P_n = \mathcal P^{\otimes n}$
>
>   - $\mathcal P_n\mathcal P'_n=\bigotimes (\mathcal P_{n,i}\cdot \mathcal P'_{n,i})$
>
>     - $A\cdot A = I\quad A\in\{X,Y,Z\}$
>     - $A\cdot B = \epsilon_{ABC}iC\quad A,B,C\in\{X,Y,Z\}$
>
>     > <font color="lightblue"> Example</font>
>     >
>     > $XZZXI\cdot IXZZX = X(iY)I(-iY)X$
>
>   - $[\mathcal P_n,\mathcal P'_n]=0\Leftrightarrow \forall i~[\mathcal P_{n,i},\mathcal P'_{n,i}]=0$ 
>
>     commute if all element commute
>
>   - $[\mathcal P_n,\mathcal P_n']=0 \Leftrightarrow \sum_i\mathbb 1_{\{\mathcal P_{n,i},\mathcal P'_{n,i}\}=0}~\text{mod}~2=0$ 
>
>     commute if even number of elements anti commute
>
>   - $\{\mathcal P_n,\mathcal P'_n\}=0\Leftrightarrow \sum_i\mathbb 1_{\{\mathcal P_{n,i},\mathcal P'_{n,i}\}=0}~\text{mod}~2=1$ 
>
>     anti commute if odd number of elements anti commute
>
> - $\sigma_x,\sigma_y,\sigma_z$ : pauli matrices, $\sigma_x = \begin{bmatrix}0&1\\1&0\end{bmatrix}\quad \sigma_y = \begin{bmatrix}0&-i\\i&0\end{bmatrix}\quad \sigma_z = \begin{bmatrix}1&0\\0&-1\end{bmatrix}$
>
>   - ${[\sigma_i,\sigma_j]} = 2i\epsilon_{ijk}\sigma_k$, e.g.$[\sigma_i,\sigma_i] = 0\quad [\sigma_i, I] = 0$
>   - $\{\sigma_i,\sigma_j\} = 2\delta_{ij}$, e.g.$\{\sigma_i,\sigma_j\} = 0\quad i\neq j$
>   - $\sigma_i^2 = 1$ 
>
> - $[\cdot,\cdot]$ : commute $[A,B]=AB-BA$
>
>   - $A,B \text{ commute}\Leftrightarrow [A,B]=0$
>
> - $\{\cdot,\cdot\}$ : anti commute $\{A,B\}=AB+BA$
>
>   - $A,B \text{ anti-commute}\Leftrightarrow \{A,B\}=0$
>
> - $\epsilon_{ijk}$ : Levi-Civita symbol
>
>   - even permutation : $\epsilon_{\{123,231,312\}} = 1$
>   - odd permutation : $\epsilon_{\{213,132,321\}} = -1$
>   - two of $i,j,k$ equal : $\epsilon_{ijk} =0$
>   
> - $k$ : number  of element in stabilizer generator
>
> - $n$ : number of element in the pauli  group
>
> 

**Stabilizer group** : 

- all elements commute with each other
- does not contain $I^{\otimes n}$

**Stabilizer generator** : minimal set of operators  generate all members by multiplication $\langle  S_1,\cdots,S_k\rangle\to \{ S_1^{a_1}\cdots S_k^{a_k}\} \quad a_i\in\{0,1,2\}$

> <font color="lightblue"> Example</font>	
>
> $\underbrace{\langle ZZI,IZZ\rangle}_{\text{stabilizer generator}}\to \underbrace{\{III,ZZI,ZIZ,IZZ\}}_{\text{stabilizer group}}\quad \begin{matrix}k=2\\n=3\end{matrix}$

> <font color="lightblue">Example</font> : 
>
> - 3-qubit bit-flip code : $\begin{array}{c|ccc}S_1&Z&Z&I\\S_2&I&Z&Z\\\hline Z_L&Z&Z&Z\\X_L&X&X&X\end{array}$
> - 3-qubit phase-flip code : $\begin{array}{c|ccc}S_1&X&X&I\\S_2&I&X&X\\\hline Z_L&X&X&X\\X_L&Z&Z&Z\end{array}$
> - shor code : $\begin{array}{c|ccccccccc}S_1&Z&Z&I&I&I&I&I&I&I\\S_2&I&Z&Z&I&I&I&I&I&I\\S_3&I&I&I&Z&Z&I&I&I&I\\S_4&I&I&I&I&Z&Z&I&I&I\\S_5&I&I&I&I&I&I&Z&Z&I\\S_6&I&I&I&I&I&I&I&Z&Z\\S_7&X&X&X&X&X&X&I&I&I\\S_8&I&I&I&X&X&X&X&X&X\\\hline Z_L&X&X&X&I&I&I&I&I&I&\\X_L&Z&I&I&Z&I&I&Z&I&I\end{array}$
> - stean code :  $\begin{array}{c|ccccccc}S_1&I&I&I&Z&Z&Z&Z\\S_2&I&Z&Z&I&I&Z&Z\\S_3&Z&I&Z&I&Z&I&Z\\S_4&I&I&I&X&X&X&X\\S_5&I&X&X&I&I&X&X\\S_6&X&I&X&I&X&I&X\\\hline Z_L&Z&Z&Z&Z&Z&Z&Z\\X_L&X&X&X&X&X&X&X\end{array}$
> - 5-qubit code : $\begin{array}{c|ccccc}S_1&X&Z&Z&X&I\\S_2&I&X&Z&Z&X\\S_3&X&I&X&Z&Z\\S_4&Z&X&I&X&Z\\\hline Z_L &Z&Z&Z&Z&Z\\X_L&X&X&X&X&X\end{array}$

**Stabilizer subspace dimension** : $2^{n-k}$

- code subspace e.g. $\ket 0_L$
- orthogonal projector in subspace  : $P_S\ket 0_L = \ket 0_L \quad P_S\ket 1_L = \ket 1_L \quad P_S\ket \psi=0$

**Stabilizer group element** : $2^k$

**Error-Syndrome** : $\begin{aligned}{[}E,S_i]&=0\Leftrightarrow \text{error not detected $(1)$}\\\{E,S_i\}&=0\Leftrightarrow \text{error detected $(-1)$} \end{aligned}$

> ​	<font  color="lightblue">Example</font> : bit flip error ($X$ error) at position $1$ 
>
> $S=\{XZZXI,IXZZX,XIXZZ,ZXIXZ,ZZXIX\}\quad E = XIIII$
>
> result : $\{1,1,1,-1,-1\}$

*stabilizer + EC* : $\text{for}~[E_b^\dagger E_a ,S_k]=0\quad\bra jE_b^\dagger E_a S_k\ket i = \lambda$

*projector into subspace* ：$P_j = \frac{I^{\otimes n}+S_j}{2}$ , the eigen value of projected state will only contains $\{0,1\}$

*complexity* : $O(n)$ stabilizer operators with $O(n)$ Paulis -  $O(n^2)$ updates per gate

**Gottesman-Knill theorem** :  A quantum circuit performing

1. Clifford gates (exception : T-gate, Toffoli gate)
2. measurement of the Pauli group operators
3. conditional Clifford group operations

can be simulated efficiently on a classical computer

## surface code

<img src="./README.assets/surface_code.png" alt="img" style="zoom:50%;" />

syndrome

<img src="README.assets/surface_code_syndrome.png" alt="img" style="zoom:40%;" />

# Hamiltonian Simulation

**$k$-local Hamiltonian** : $H = \sum_{i=1}^m H_i \quad \text{$H_i$ acting on no more than $k$ qubits}$

> <font color="lightblue">Example</font>	: $X-Y$ model 
> $$
> H = \sum_{i=1}^n (J_xX_iX_{i+1}+J_yY_iY_{i+1}+J_zZ_iZ_{i+1}+hZ_i)
> $$
> $2$-local hamiltonian

**Solovay-Kitaev theorem** ：unitary  operator $U\in \mathcal U(2^n)$ which acts non-trivially on $k$ qubits,  a universal set of gates $\mathcal S$ and $\varepsilon>0$, $\exists \tilde U\in \mathcal U(2^n)$ composed of $\mathcal O(\text{log}^c(1/\varepsilon))$ gates  from $\mathcal S$ such that $\Vert \tilde U-U\Vert<\varepsilon$ with $c<4$

- if all $H_i$  commute, $e^{-i\sum H_i t}=\prod_{i=1}^m e^{-iH_it}$

**Suzuki-Trotter decomposition** : $e^{iHt} = (e^{iH_1t/K}e^{iH_2t/K}\cdots e^{iH_mt/K})^K + \mathcal O(m^2h^2\frac{t^2}{K})$

- total error :$\epsilon_T  = m\epsilon_L K +\mathcal O\left(\frac{m^2h^2t^2}{K}\right)$
- **Lie-Trotter** decomposition : $e^{(A+B)x} = e^Ae^B -\frac{1}{2}x^2[A,B]+\mathcal O(x^3)$, if $[A,B]=0$ then $\Vert  e^{x(A+B)}-e^Ae^B\Vert \le \epsilon$
- number of local terms in a  $k$-local n-qubit Hamiltonian : $n^k$

> Notation
>
> - $m$ : number of terms for Hamiltonian decomposition $H = \sum_{i=1}^m H_i$
> - $h$ : maximal norm of Hamiltonian term : $\Vert H_i\Vert\le h$
> - $K$ : Trotter step, $\Delta t  =\frac{t}{K}$
> - $\epsilon_T,\epsilon_L$ : total error, local error for Trotter step
