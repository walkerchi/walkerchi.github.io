
---
title: "Neural Operators and Operator Networks vs Parametric Approach: A General Comparison"
index_img: img/wave_K=4.gif
banner_img: img/banner-china.jpg
date: 2023-07-14 02:39:00
category: "Project"
tags: [ETH Zürich, Deep Learning, AI for Science, PINN]
---


# Neural Operators and Operator Networks vs Parametric Approach: A General Comparison


We explore the use of different neural operator architectures for solving partial differential equations (PDEs). Specifically, it investigates the performance of the Feed-Forward Network (FFN), Deep Operator Network (DeepONet), Fourier Neural Operator (FNO), Convolutional Neural Operator (CNO), and Koopman Neural Operator (KNO) in solving the heat, wave, and Poisson equations. The models are trained and evaluated based on their ability to accurately predict the solutions of these PDEs under varying parameters

## Introduction
Partial differential equations (PDEs) play a crucial role in describing various physical phenomena and are widely used in many scientific and engineering domains. Solving PDEs accurately is essential for understanding and predicting the behavior of complex systems. Traditional numerical methods for solving PDEs often rely on discretization techniques and iterative algorithms, which can be computationally expensive and time-consuming. In recent years, there has been a growing interest in leveraging neural networks and deep learning techniques to solve PDEs more efficiently.

Neural operators have emerged as a promising approach for solving PDEs using neural networks. These architectures aim to learn the underlying equations directly from data, enabling faster and more accurate predictions of PDE solutions. In this paper, we compare and evaluate several neural operator architectures, namely the Feed-Forward Network (FFN), Deep Operator Network (DeepONet), Fourier Neural Operator (FNO), Convolutional Neural Operator (CNO), and Koopman Neural Operator (KNO), in the context of solving the heat, wave, and Poisson equation.

The heat equation describes the diffusion of heat in a medium, while the wave equation models the propagation of waves. On the other hand, the Poisson equation represents a static equation that does not depend on time. These equations have different characteristics and require different approaches for accurate solution approximation. By examining the performance of various neural operator architectures on these equations under varying parameters, we can gain insights into their strengths and weaknesses. Our code can be publicly accessed by[https://github.com/walkerchi/DeepLearning-in-ScientificComputing-PartB](https://github.com/walkerchi/DeepLearning-in-ScientificComputing-PartB)


## Equations
### Heat Equation

The heat equation is a fundamental partial differential equation (PDE) that describes the behavior of heat distribution over time. It can be expressed as follows:

$$
\frac{\partial u (t, \vec x)}{\partial t} = \Delta u
$$

Here, $\vec x$ represents the position vector, which lies within the domain $\mathcal D^{2}_{\text{heat},\vec x} = [-1,1]^2$, indicating that both elements $x_1$ and $x_2$ reside in the interval $[-1,1]^2$. The variable $t$ spans the domain $\mathcal D_{\text{heat}, t}= [0,T]$, where $T$ is the final time.

#### initial condition

$$
u(0,x_1,x_2,\mu) = -\frac{1}{d}\sum_{m=1}^d  \mu_m sin(\pi m x_1)sin(\pi m x_2)/\sqrt m
$$
#### boundary condition

$$
u(t, \pm 1, \pm 1) = 0
$$

#### solution 

$$
u(t,x_1,x_2,\mu) = -\frac{1}{d}\sum_{m=1}^d \frac{\mu_m}{\sqrt{m}} e^{-2m^2\pi^2t} sin(\pi m  x_1)sin(\pi mx_2)
$$


![Heat Equation d=4](heat_d=4.gif)

### Wave Equation:
The wave equation is another important PDE that describes the propagation of waves, such as sound waves or electromagnetic waves. It can be represented as follows:

$$
\frac{\partial^2 u (t, \vec x)}{\partial t^2} - c^2 \Delta_{\vec x} u = u_{tt} - c^2(u_{xx} + u_{yy})
$$

In this equation, $\vec x$ is the position vector, confined within the domain $\mathcal D^{2}_{\text{wave},\vec x} = [0,1]^2$, indicating that the elements $x_1$ and $x_2$ lie within the interval $[0,1]^2$. The variable $t$ is restricted to the domain $\mathcal D_{\text{wave}, t}= [0,T]$. The symbol $c$ represents the propagation speed.


##### Initial Condition

$$u(0, x, y, a) = \frac{\pi}{K^2} \sum_{i,j=1}^{K} a_{ij} \cdot (i^2 + j^2)^{-r} sin(\pi ix) sin(\pi jy) \quad \forall x,y \in [0, 1]$$

#### boundary condition

$$ u(t, \pm 1, \pm 1) = 0$$

##### Solution

$$u(t, x, y, a) = \frac{\pi}{K^2} \sum_{i,j=1}^{K} a_{ij} \cdot (i^2 + j^2)^{-r} sin(\pi ix) sin(\pi jy) cos(c\pi t \sqrt{i^2 + j^2}), \forall x,y \in [0, 1]$$


![Wave Equation K=4](wave_K=4.gif)

### Poisson Equation
The Poisson equation is a static PDE that describes the distribution of scalar fields in various physical phenomena, such as electrostatics or fluid flow. It can be defined as follows:

$$
-\Delta_{\vec x} u (\vec x) = f
$$

Unlike the heat equation and wave equation, the Poisson equation does not depend on time. $f$ represents the source function.

#### source function

$$f=\frac{\pi}{K^2} \sum_{i,j=1}^{K} a_{ij} \cdot (i^2 + j^2)^{r} sin(\pi ix) sin(\pi jy),\quad \forall (x,y) \in D$$


#### Boundary Condition

$$u\vert_{\partial D} = 0 $$

#### Solution

$$u(x, y) = \frac{1}{\pi\cdot K^2} \sum_{i,j=1}^{K} a_{ij} \cdot (i^2 + j^2)^{r-1} sin(\pi ix) sin(\pi jy),\quad \forall (x,y) \in D$$


![Poisson Equation K=4](poisson_K=4.png)


## Methodology

In the following illustration, we sample $\mathcal S$
times for different $\vec \mu/ \textbf a$. Therefore, for each $i$th sample, $\vec \mu^i\in \mathcal D^{d}_{\text{heat},\vec \mu}$ and $\textbf a^j \in \mathcal D^{K\times K}_{\text{wave},\textbf a}$

### Parameter Approach:Feed Forward Network(FFN):
The objective of the parameter methodology is to establish a transformative function $g$, which is capable of constructing a bridge between the position vector $\vec x$ and parameter $\vec \mu/\textbf a$ for the equation to the resultant value $u$ of equation.

$$
    g(\vec x,\{\vec \mu, \textbf a \}) = u(T, \vec x, \{\vec \mu,\textbf a \})
$$

With the aid of the universal approximation theorem of Multilayer Perceptron (MLP), we have chosen to implement a powerful MLP to closely approximate the function $g$. 

### DeepONet
In contrast to the parameter approach, DeepONet adopts a different strategy. It learns a mapping function $G$, which gives rise to a continuous function that maps the position vector $\vec x$ to the value $u$ of the equation, as illustrated in equation:

$$
G(u_0)(\vec x) = u(T,\vec x)
$$

The $u_0$ is a short notation of $u(0, \vec x)$.
To execute this, DeepONet employs a matrix to approximate the continuous function. It mainly consists of two networks: the branch network $\mathcal B$ and the trunk network $\mathcal T$.
In DNO, the $j$th sampled position $\vec y^j$, pertaining to different $\mu^j$ or $\textbf a^j$, is preserved for further inference within the DeepONet framework. $\mathcal B$ and $\mathcal T$ take the form of a Multilayer Perceptron (MLP).

$$
\tilde u( T, \vec x, \{\vec\mu^j,\textbf{a}^j \}) = 
\mathcal B \left( u ( 0, \vec y^j, \{\vec \mu^j,\textbf{a}^j \}) \right) 
\cdot
\mathcal T (   T, \vec x  )^\top
$$


### Fourier Neural Operator
In contrast to both the parameter approach and the DeepONet approach, the Fourier Neural Operator (FNO)demands the input points to conform to a mesh structure. We refer to this type of neural operator as the Mesh Neural Operator. It takes the form as shown in equation

$$
    G(u_0,\vec x) = u(T,\vec  x)
$$

When it comes to FNO, it adopts the form as illustrated in equation

$$
    H^{l+1} = \sigma\left(Conv^l_{1\times1}(H^l) + \mathcal F^{-1}\left(W^l(\mathcal F H^l)+b^l\right)\right)
$$

In this equation, $H^l$ represents the hidden layer at the $l$th level. $Conv^l_{1\times 1}$ refers to the convolution operation with a kernel size of $1\times 1$ at $l$th layer. The symbols $\mathcal F$ and $\mathcal F^{-1}$ denote the Fourier transform and its inverse, respectively. $W^l$ and $b^l$ stand for the weights and bias of the FNO network at $l$th layer, respectively. Finally, $\sigma$ signifies the activation function.

### Convolutional Neural Operator
Inspired by the architectural principles of UNet and the activation mechanisms of StyleGAN3, the Convolutional Neural Operator (CNO) integrates the structural design of UNet with the Leaky Rectified Linear Unit (LReLU) filter from StyleGAN3, utilized as an activation layer.

The activation layer, as depicted as Figure

![CNO acitvation layer](CNO-activation.png)

operates through a sequence of transformations on the feature map. Initially, the feature map undergoes an upsampling process, followed by the application of a Finite Impulse Response (FIR) filter. Subsequently, the LeakyReLU activation function is applied, introducing non-linearity to the feature map. A second FIR filter is then applied, followed by a downsampling operation.

### Koopman Neural Operator
In order to encapsulate complex long-term dynamics, the Koopman Neural Operator (KNO) has been proposed. This operator is designed to learn the Koopman operator, an infinite-dimensional linear operator that governs all observations of a dynamic system. The KNO is applied to the evolution mapping of the dynamic system's solution, thereby capturing the system's behavior over time.

Contrasting with the Fourier Neural Operator, the KNO employs parameter sharing across layers for the Spectral Convolution, as shown in Equation.

$$
H^{l+1} = F^{-1}\left(W(\mathcal F H^l)+b\right)
$$

In this equation, $H^{l+1}$ represents the output of the spectral convolution layer, $\mathcal F^{-1}$ is the inverse Fourier transformation, $W$ and $b$ are the weight and bias parameters respectively, and $\mathcal F H^l$ is the Fourier transformation of the input to the layer.



## Experiment
### Setup

- **CPU/GPU**: We use the CPU/GPU of Intel i5-11300H/Nvidia MX450 for these experiments.

- **Equations**:
The parameter $d/K$ for all equations was systematically varied across the set $[1, 2, 4, 8, 16]$. Therefore, we will train $3\times 5\times 6=90$ weights for the experiments. In the heat equation, where the attenuation of high-frequency signals over time is observed, the parameter $T$ was assigned a value of $0.005$. Conversely, in the wave equation, the propagation speed $c$ was determined as $0.1$, the radial decay parameter $r$ was set to $0.85$, and $T$ was specified as $5$. Notably, in the case of the Poisson equation, which exhibits time-independence, the radial decay parameter $r$ was consistently assigned a value of $0.85$

- **Sampling**: The Mesh sampler is employed for all models. The samplers generated $4096$ mesh spatial points ($64\times 64$) for the training dataset, validation dataset, with $64$ samplings.

- **Model**: For the FFN, a Multi-Layer Perceptron (MLP) with 4 layers was used, each layer having a hidden size of 64 and employing a ReLU activation function. For the DeepONet, both the branch and trunk networks were configured with the same settings as the FFN. The Fourier Neural Operator (FNO) and Koopman Neural Operator (KNO) also followed the same settings as the FFN. To maintain the complexity among models, for the Convolutional Neural Operator (CNO) and UNet, the depth was set to 3 with hidden channel range within $[8, 32, 128]$ and the residual block length was set to 2.

- **Training**: The Adam optimizer was used for training, with a learning rate of 0.001 and 1000 epochs. Model validation was performed every 100 epochs using the validation dataset, and the best validation model was stored.

- **Acceleration**: To expedite the activation process on the GPU, we utilized the implementation from StyleGAN3, which is implemented in CUDA.

### Prediction

In this experiment, we set the parameter $d$ to a fixed value of $4$ for the heat equation. A single sample of $u_0$ and $u_T$ was generated. We compare the predictions of each model with the ground truth $u_T$, as depicted in Figure Heat Prediction. The error is quantified using the $L_2$ error metric. Notably, the Fourier Neural Operator and Koopman Neural Operator models exhibit sensitivity to the presence of high-frequency signals. The FFN and DeepONet models struggle to effectively capture the high-frequency components of the signal. Conversely, the Convolutional Neural Operator and Unet models demonstrate good fitting capability, accurately representing the signal.

![Poisson Prediction](poisson_predict.png)
![Heat Prediction](heat_predict.png)
![Wave Prediction](wave_predict.png)


### Varying Parameter

In this experiment, we generated 64 samples for each equation parameter $d/K$ within the range $[1, 2, 4, 8, 16]$. It is important to note that separate models were trained for each parameter of the equation. 
The results of the experiment are illustrated in Figure Heat Varying. The shaded bands in the figure represent the $2\sigma$ uncertainty, while the curve is fitted using logistic regression. Analyzing the figure, it becomes evident that the Koopman neural operator consistently achieved the lowest error across all variations of the parameter $d/K$.
However, it is important to note that there is no discernible ascending or descending pattern observed for certain models as the parameter $d/K$ varies. This behavior indicates that the models respond differently to different equations, and the relationship between the parameter and the model's performance is not strictly linear.

![Poisson Varying](poisson_varying.png)
![Heat Varying](heat_varying.png)
![Wave Varying](wave_varying.png)


# Conclustion
In conclusion, neural operator architectures show great promise in solving PDEs efficiently and accurately. This study contributes to the understanding of different neural operator architectures and their performance in solving the heat, wave, and Poisson equations. Further research can explore the application of neural operators to more complex and diverse PDEs, as well as the development of hybrid approaches that combine the strengths of different architectures.