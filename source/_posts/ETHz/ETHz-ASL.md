---
title: "HoloScanner: In-Hand Scanning with HoloLens 2 for Irregular Geometries"
index_img: img/mr.gif
banner_img: img/banner-purple.png
date: 2023-06-23 13:00:00
tags: [ETH Zürich, Intel, Hardware, SIMD, Cache]
---

# Optimizing the Social Force Model: Investigating Memory Layouts and Register Pressure

Helbing and Molńar's Social Force Model provides a quite realistic description of pedestrian dynamics. However, its simulation poses high computational and memory requirements. In this paper, we investigate these requirements to deliver a social force model optimzed for Intel's Skylake microarchitecture. This paper describes our pipeline, including: deriving an accurate performance estimation, implementation of three memory layouts, vectorization using Intel Intrinsics, accuracy validation and semi-manual register allocation. Results show that we can achieve $\sim 90\%$ of our performance estimation with a relative error of order $10^{-7}$ per simulation step compared to a reference implementation.

## Introduction
### Motivation

In urban design and planning, establishing an efficient transportation network is crucial. Architects employ predictive models to optimize designs, identifying congestion points and minimizing travel time based on participant behavior. While precise predictions are feasible for centrally controlled networks such as [trains](https://doi.org/10.1007/978-3-642-55753-8_53), making assertions about pedestrian flow in public spaces is challenging due to their unpredictable nature, particularly in crowded situations.

 One way to model pedestrian dynamics entails employing an equation of motion that encapsulates the human behavioral responses to their surroundings as [social forces](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2413177). Despite the algorithm simulation's success in replicating observed behavioral patterns within densely populated environments, it exhibits detrimental implications on performance. Due to the algorithm's inherent structure, it suffers from a non-negligible quadratic algorithmic complexity that grows with the number of pedestrians in the simulation. Moreover, simulating the algorithm can be memory-intensive in the case of a large number of pedestrians if a sub-optimal data structure and memory layout were considered. 

These challenges make the optimization of the social force model an imperative problem to solve. To enable its application as a predictive pedestrian dynamics model across real-world scenarios, we develop a performance-optimized implementation that exhibits efficient execution on contemporary hardware platforms.

### Contribution
In this paper, we present a high-performance social force model implementation for Intel's Skylake microachitecture.
To that end, we investigate different memory layouts and show that the structure of arrays and the array of structures of arrays layouts achieve better performance than the array of structs layout. We also show that compiler vectorization of these implementations for Intel's Advanced Vector Extensions (AVX2) does not succeed and that a speedup by about $3.3\times$ can be achieved by manual vectorization. Because this still leaves a large gap to our performance bound, we derive a tighter estimation of our achievable performance using new techniques. We improve our implementation based on these insights and by replacing our implementation of the exponentiation function, that turns out to consume a large fraction of the runtime, by a faster but less accurate approximation, to achieve a peak performance of 4.81 flops/cycle.


## Related work
The social force model has gained significant attention in response to population growth, primary aimed to understand pedestrian behavior. PedSim is a  library written in C that provides various functions \cite{Gloor}. Moreover, \cite{Fawwaz} is a C++ simulation that represents an enhanced version of \cite{helbing}'s algorithm where model parameters are derived from real-world experiments. Despite the utilization of Vector data structures, neither implementations have undergone further optimization. There exists an OpenCL (GPU) implementation of PedSim that is capable of simulating 20 thousand pedestrians with 8 model steps per second \cite{lauterbach2017}. Moreover, \cite{payet2016developing} is a Java-based simulation of the social force model that employs parallelization through multi-threading to distribute the quadratic workload across many threads. While these implementation resort to multi-threading and GPU utilization to increase performance, we focus on optimizing the algorithm for a one microarchitecture to better understand
how the algorithm's inherit computational and memory requirements impact performance.


## The Social Force Model

The social force model by [Helbing and Molnár](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2413177) considers a number of pedestrians moving on a 2D plane, surrounded by obstacles.

In a condensed form, it defines three forces that determine a pedestrian $ \alpha $'s movement: 

- **Destination attraction.** A pedestrian always has a target position $ \overrightarrow{r^k_\alpha} $ it is heading for. They accelerate or decelerate their movement into that direction, approaching a desired speed $ v^0_\alpha $ within $ \tau $ seconds. Thus, if $ \alpha $'s current position is $ \overrightarrow{r_\alpha} $ and their current velocity is $ \overrightarrow{v_\alpha} $, one can compute this attractive force as 
    $$
    \overrightarrow{F^0_\alpha} = \frac{1}{\tau}\cdot\left(v^0_\alpha\cdot\frac{\overrightarrow{r^k_\alpha} - \overrightarrow{r_\alpha}}{\Vert\overrightarrow{r^k_\alpha} - \overrightarrow{r_\alpha}\Vert}-\overrightarrow{v_\alpha}\right),
    $$
    $ \Vert\cdot\Vert $ denoting the Euclidean norm.

- **Pedestrian repulsion.** The model assumes that pedestrians don't tend to be too close to other pedestrians to avoid a potential collision. To avoid colliding with another pedestrian $ \beta $, pedestrian $ \alpha $ takes into account $ \beta $'s direction of movement and step width 
    $$
    \overrightarrow{h_\beta}:=\Vert\overrightarrow{v_\beta}\Vert\cdot\text{footstep}\cdot \frac{\overrightarrow{r^k_\beta}-\overrightarrow{r_\beta}}{\Vert\overrightarrow{r^k_\beta}-\overrightarrow{r_\beta}\Vert}
    $$
    and computes its repulsive potential from $ \beta $ as 
    $$
    \begin{aligned}
        \overrightarrow F_{\alpha,\beta} &= \overrightarrow f_{\alpha,\beta}\cdot \begin{cases}
            1&\text{if} \left(\frac{\overrightarrow r^k_\alpha - \overrightarrow r_\alpha}{\Vert\overrightarrow r^k_\alpha - \overrightarrow r_\alpha\Vert}\cdot (-\overrightarrow f_{\alpha,\beta})\right)\ge \Vert\overrightarrow f_{\alpha,\beta}\Vert\cdot\cos(\varphi)\\
            c&\text{otherwise}
        \end{cases}
        \text{with }
        b &= \frac12\sqrt{\left(\Vert\overrightarrow r_{\alpha,\beta}\Vert + \Vert\overrightarrow r_{\alpha,\beta} - \overrightarrow h_\beta\Vert\right)^2 \Vert\overrightarrow h_\beta\Vert^2}\\
        \overrightarrow f_{\alpha,\beta} &= -\nabla_{\overrightarrow r_{\alpha,\beta}} V_0\cdot e^{-b/\sigma}
        \\
        &=\frac{V_0}{4\sigma b} e^{-b/\sigma}\cdot \left(\Vert\overrightarrow r_{\alpha\beta}\Vert+\Vert\overrightarrow r_{\alpha\beta} - \overrightarrow h_\beta\Vert\right)
        \\
        &\cdot \left(\frac{\overrightarrow r_{\alpha\beta}}{\Vert\overrightarrow r_{\alpha\beta}\Vert}+\frac{\overrightarrow r_{\alpha\beta} - \overrightarrow h_\beta}{\Vert\overrightarrow r_{\alpha\beta} - \overrightarrow h_\beta\Vert}\right)
    \end{aligned}
    $$
    where $ \overrightarrow{r_{\alpha,\beta}} $ is the relative position between pedestrian $ \alpha $ and pedestrian $ \beta $ (for a more detailed description and explanation, please refer to [Helbing and Molnár](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2413177)). Note that the case distinction above ensures that if pedestrian $ \beta $ is outside of pedestrian $ \alpha $'s angle of sight $ \varphi $, $ \alpha $'s repulsion from $ \beta $ is reduced by factor $ c $, because $ \alpha $ is assumed to have limited perception on $ \beta $ in this case.

- **Obstacle repulsion.** The pedestrians also don't want to collide with walls or other obstacles. Therefore, the model defines an obstacle repulsion force, that will push them away from the obstacles as they get closer, namely
    $$
    \begin{aligned}
        \overrightarrow{F_{\alpha B}} &= -\nabla_{\overrightarrow{r_{\alpha B}}} U_0\cdot e^{-\Vert\overrightarrow{r_{\alpha B}\Vert}/R}
        \\
        &= \frac{U_0}{R}\cdot e^{-\Vert\overrightarrow{r_{\alpha B}\Vert}/R}\frac{\overrightarrow{r_{\alpha B}}}{\Vert\overrightarrow{r_{\alpha B}\Vert}},
    \end{aligned}
    $$
    where $ U_0 $ and $ R $ are the maximum force and decay factor which are constants in this formula and $ \Vert \overrightarrow{r_{\alpha B}\Vert} $ denotes the euclidean distance between the pedestrian $ \alpha $ and the closest point of obstacle $ B $.

These forces are computed for each pedestrian and summed up, yielding the acceleration $ \overrightarrow{F_\alpha} $ of the respective pedestrian at that specific time. Taking into account a maximal velocity $ v^\text{max}_\alpha $ of the pedestrian that they won't exceed, one obtains the following differential equations for velocity and position: 
$$
\begin{aligned}
    1.&& \frac{d \overrightarrow{v_\alpha}}{d t}&=\overrightarrow{F_\alpha} \cdot \begin{cases}
        1&\text{if } \Vert\overrightarrow{F_\alpha}\Vert\leq v^\text{max}_\alpha\\
        \frac{v^\text{max}_\alpha}{\Vert\overrightarrow{F_\alpha}\Vert}&\text{otherwise}
    \end{cases}\\
    2.&&\frac{d \overrightarrow{r_\alpha}}{d t}&=\overrightarrow{v_\alpha}.
\end{aligned}
$$
