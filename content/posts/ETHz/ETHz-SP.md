---
title: "Semester Project:Learning Structural Dynamics with Graph Neural Networks"
index_img: img/weak_form_loss.png
banner_img: img/banner-purple.png
date: 2024-01-14 16:25:00
category: "Project"
tags: [ETH Zürich, Graph Neural Network(GNN), ETH AI Center]
---

# Learning Structural Dynamics with Graph Neural Networks

[slides](https://raw.githubusercontent.com/walkerchi/ETHz-SP/main/meeting/2024-01-12/Final%20Presentation.potx
)
[report](https://raw.githubusercontent.com/walkerchi/ETHz-SP/main/ETHz_Semester_Project_Report.pdf
)

---
Advisor: Prof. Eleni Chatzi, Dr Gregory Duthé
---

# Introduction

Finite Element Method (FEM) is a predominant approach in Partial Differential Problem(PDE), particularly in structure mechanics problems, due to its precision and capability to handle non-Euclidean topologies. Despite its advantages, FEM is time-consuming and memory-intensive for large-sclae systems, often requiring linear or non-linear solving operatios. With the advancements in Deep Learning, Graph Neural Networks (GNN) have emerged as a promising solution for processing non-Euclidean data. Inspired by Physics-Informed Neural Networks (PINN) [@raissi2019pinn], the PI-GNN [@GNN-DBC-static-condense] model represents an innovative integration of FEM and GNN, aiming to efficiently process physical loss and non-Euclidean data with more flexibility than traditional grid data in PINN. However, to handle the Dirichlet boundary condition applied to the FEM, it intuitively adopts the static condensation formula to propagate the information from the Dirichlet boundary to the inner part of the solving domain. Thus, the Dirichlet boundary condition is decoupled in this model.

In this study, we focus on linear elasticity problems, exploring both the forward (solve loading force from displacement) and reverse (solve displacement from loading force) processes. Our approach includes adapting the static condensation formula in FEM to intuitively handle Dirichlet boundary conditions by propagating information from the boundary to the domain's interior.

Our key contributions are :

1.  Introduction of Static Condensation Equivelant Architecture (SCEA)
    for modeling the Dirichlet boundary condition in the FEM problem.

2.  Developmenet of Galerkin Equivelant Architecture (GEA), which takes
    several forms including the local pseudo linear, local pseudo
    bilinear, and global version.

3.  Extensive experiementation to analyze the relation between the
    observation ratio and the precision of the model for various
    scenarios(invariant, boundary-variant, and force-variant), in which
    could we visualize the generalization competence for physical loss.

4.  Proposal of a fast and differentialble assemble method representing
    the assemble step in FEM as sparse-dense tensor multiplication.

The source code for this project is publicly available and can be accessed at the following GitHub repository: <https://github.com/walkerchi/ETHz-SP>.

# Background

## Abbreviation

<center>

| Abbreviation | Description                                |
| ------------ | ------------------------------------------ |
| **FEM**      | **F**inite **E**lement **M**ethod           |
| **PDE**      | **P**artial **D**ifferential **E**quation   |
| **DoF**      | **D**egree **o**f **F**reedom              |
| **DBC**      | **D**irichlet **B**oundary **C**ondition    |
| **NBC**      | **N**euman **B**oundary **C**ondition       |
| **NB**       | **N**on-**B**oundary                       |
| **MLP**      | **M**ulti **L**ayer **P**erceptron          |
| **GNN**      | **G**raph **N**eural **N**etwork            |
| **GCN**      | **G**raph **C**onvolutional Neural **N**etwork |
| **GAT**      | **G**raph **A**ttention Neural **N**etwork  |
| **SIGN**     | **S**calable **I**nception **G**raph **N**etworks |
| **PINN**     | **P**hysics **I**nformed **N**eural **N**etwork |
| **SCEA**     | **S**tatic **C**ondensing **E**quivalent **A**rchitecture |
| **GEA**      | **G**alerkin **E**quivalent **A**rchitecture |
| **MSE**      | **M**ean **S**quare **E**rror              |

**Table 1:Abbreviation Table**</center>


## Symbol Table

<center>

| Symbol                  | Physical/Mathematical Meaning                                                                 | Shape                                                            |
|-------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| $d$                     | Dimension of the problems                                                                     | $\mathbb R$                                                      |
| $\boldsymbol \sigma$     | Stress                                                                                        | $\mathbb R^{d\times d}$                                           |
| $\boldsymbol \varepsilon$| Strain, $\boldsymbol \varepsilon = \frac{1}{2}(\nabla u + \nabla u^\top)$                      | $\mathbb R^{d\times d}$                                           |
| $u$                     | Displacement                                                                                  | $\mathbb R^d$                                                    |
| $\boldsymbol n$          | Normal vector on the boundary                                                                 | $\mathbb R^d$                                                    |
| $\Omega$                | The PDE domain                                                                                |                                                                  |
| $\Gamma$                | Boundary of domain                                                                            | $\Gamma \subset \partial \Omega$                                 |
| $\mathcal M$            | Mesh                                                                                          | $\{\mathcal V,\mathcal C\}$                                      |
| $\mathcal V$            | Vertices/nodes in the mesh                                                                    | $\mathbb N^{|\mathcal V|}$                                       |
| $\mathcal C$            | Elements/cells in the mesh                                                                    | $\mathbb N^{|\mathcal C|\times h}$                               |
| $h$                     | Number of nodes per element/cell                                                              | $\mathbb N$                                                      |
| $\mathcal B$            | Basis function $\mathbb B = \{b_i\}$                                                          | $|\mathcal V|\times(\mathbb R^{d}\to \mathbb R)$                 |
| $\mathcal E$            | Connections in the graph                                                                      | $\{(u,v)|b_u(v)\neq 0 \}$                                        |
| $K$                     | Galerkin matrix                                                                               | $\mathbb R_{\text{sparse}}^{\mathfrak D\times \mathfrak D}$       |
| $\mathfrak D, \mathfrak D_I,\mathfrak D_D$ | Total/inner/DBC DoF                                                       | $\mathbb N$                                                      |
| $K_{II,ID,DD}$          | NB/NB & DBC/DBC DoF                                                                           |                                                                  |
| $\mathbb C$             | Stiffness tensor                                                                              | $\mathbb R^{d\times d\times d\times d}$                          |
| $\mathcal P_{\mathcal V}$| Assemble tensor for nodes/vertices                                                            | $\mathbb R_{\text{sparse}}^{|\mathcal C|\times h \times |\mathcal V|}$ |
| $\mathcal P_{\mathcal E}$| Assemble tensor for edges                                                                     | $\mathbb R_{\text{sparse}}^{\mathcal C\times h \times h \times |\mathcal E|}$ |
| $A$                     | Adjacency matrix of the graph                                                                 | $\mathbb R_{\text{sparse}}^{|\mathcal V|\times |\mathcal V|}$     |
| $D$                     | Degree matrix of a graph                                                                      | $\mathbb R_{\text{diagonal}}^{|\mathcal V|\times |\mathcal V|}$   |
| $\mathcal N_i$          | Neighbors of node $i$ in a graph                                                              | $\mathbb N^{|\mathcal N_i|}$                                     |

**Table 2:Symbol Table**
</center>

## Finite Element Method

**F**inite **E**lement **M**ethod is a commonly used method for solving **P**artial **D**ifferential for it's scalability and accuracy. The canonical FEM process takes the following steps.

1.  First, generate a mesh $\mathcal M$ in a given PDE domain $\Omega$

2.  Second, turn the strong form PDE to weak form PDE. Take the poisson equation as an example $\Delta u = -f \Leftrightarrow \int_{\Omega}\nabla u \nabla v\text dv =\int_\Omega fv\text dv$[^1].

3.  Third, choose the basis function function $\mathcal B=\{b_i| b_i\in \mathbb R^{d}\to\mathbb R\}$ and
    quadrature rules $\mathcal Q=\{\xi_i, \phi_i| \xi_i\in \mathbb R, \phi_i\in \mathbb R ^d\}$ for each element in the mesh $\mathcal M$.

4.  Fourth, compute the Galerkin matrix and load vector for each element. Take the poisson equation as an example $K_{ij} = \sum_{k}\xi_k \nabla b_i(\phi_k) \nabla b_j(\phi_k) |J|$, $F_i=\sum_k \xi_k b_i(\phi_k)f(\phi_k) |J|$[^2].

5.  Fifth, the galerkin discretilized weak form becomes $\int_{\Omega}\nabla u \nabla v\text dv =\int_\Omega fv\text dv \approx K_{ij} u_i =F_j$. By solving this linear system, we get the variable $u$ for each basis.

In a canonical FEM process. We first generate a mesh $\mathcal M$ in a given PDE domain $\mathcal D$.

## Linear Elasticity

In continuum mechanics, the relationship between stress and strain is modeled by a 4-th order tensor according to the following Equation:

$$\boldsymbol \sigma_{ij} = \mathbb C_{ijkl}\boldsymbol\varepsilon_{kl}$$

Assuming the most simple model, Linear Elasticity, which could be formulated as:

$$\boldsymbol \sigma_{ij} = \lambda \delta_{ij}\boldsymbol \varepsilon_{kk} + 2\mu\boldsymbol \varepsilon_{ij}$$

## Static Condensing

Normally there are three boundary conditions for PDE equation

1.  **D**irichlet **B**oundary **C**ondition : $u=g~\text{on}~\Gamma_D$

2.  **N**euman **B**oundary **C**ondition :
    $\frac{\partial u}{\partial \boldsymbol n} = h~\text{on}~\Gamma_{N}$

The NBC can be easily coupled in the weak form, while static condensing is usually used to solve the DBC. Considering the Dirichlet Boundary $\Gamma D$, we could partition the Galerkin matrix into $2\times 2$ blocks and load vectors into $2$ blocks, as shown in Equation
$$
    \begin{bmatrix}
K_{II}& K_{ID}\\
K_{ID}^\top & K_{DD}
\end{bmatrix}
\begin{bmatrix}
u_I \\
u_D 
\end{bmatrix}
= 
\begin{bmatrix}
F_I \\ F_D
\end{bmatrix}$$

where, $K_{II}$ is the galerkin matrix for non-boundary DoF of shape $\mathbb R_{\text{sparse}}^{\mathfrak D_I\times \mathfrak D_I}$. And $K_{ID}$ is the commute galerkin matrix for non-boundary DoF and DBC DoF, which is of shape $\mathbb R_{\text{sparse}}^ {\mathfrak D_I\times \mathfrak D_D }$. The $K_{DD}$ is the galerkin matrix for DBC Dof of shape $\mathbb R_{\text{sparse}}^{\mathfrak D_D\times \mathfrak D_D}$. We illustrate the problem in Figure [1], where orange parts are unknowns and blue parts are known. In this way, we could conclude that the purpose of static condensation is to calculate $u_I, F_D$ using $K, u_D, F_I$


![Static Condenstation: blue parts are known, while orange parts are unkown](static-condenstation.png)
<center><strong>Figure 1: Static Condenstation</strong></center>


According to Equation static-condensation-partite, we could obtain two essential formulas for static condensing:

$$\begin{cases}
K_{II} u_I = F_I - K_{ID}u_D \\
K_{ID}^\top u_I + K_{DD}u_D = F_D
\end{cases}$$

## Graph Neural Network

**G**raph **N**eural **N**etworks are a popular deep learning tool to handle non-euclidean data like social networks [@gnn_rs_survey] or particle interactions [@deepmind2020learning]. GNNs are well researched for their applications on large scale graphs, and are typically highly parallelised and optimizatized for certain hardware [@gnn-survey].

The **Cheb**yshev Spectral Convolutional Neural **Net**work [@chebnet_defferrard2016convolutional] was the first to introduce a spectral approach to Graph Neural Networks. This method is related to the **G**raph **C**onvolutional **N**etwork [@gcn_kipf2016semi], which is the first order approximation of ChebNet, and takes the following simple form:

$$H^{l+1} = L \sigma(W H^l + b)$$

where $L$ is the laplacian matrix which could be computed as $L = D^{-\frac{1}{2}}\hat AD^{-\frac{1}{2}}$. To prevent self-information from being lost during the propagation, an adjacency matrix with self loops $\hat A$ is adopted here. Furthermore, to ensure consistent of information scale for all nodes, the propagation weight is normalized by the square root inverse of degree of two nodes connected by a edge.

Since the Attention mechanism [@vaswani2017attention] has typically led to remarkable achievement in **N**ature **L**anguage **P**rocessing and **C**omputer **V**ision, it has also been applied to graphs [@gat_velivckovic2017graph], as the Graph Attention Network. The aggregation step of GAT takes the form of Equation gat, where $\textbf W$ is the learnable weight and $\mathcal N_{i}\cup \{i\}$ denotes all the neighbors of vertice $i$, including itself. To compute the aggregation weight, a softmax is used as in Equation

$$H^{l+1}  = \sigma\left(\sum_{j\in\mathcal N_i\cup\{i\}}\alpha_{ij} \textbf Wh_j\right)$$
$$\alpha_{ij}= \frac{\text{exp}(\text{LeakyReLU}(\textbf a^\top [\textbf Wh_i\Vert \textbf  Wh_j]))}{\sum_{k\in \mathcal N_i\cup \{i\}}\text{exp}(\text{LeakyReLU}(\textbf a^\top[\textbf Wh_i \Vert \textbf Wh_k]))}$$

Inspired by the U-Net [@unet_ronneberger2015u], a Graph U-Net [@graphunet_gao2019graph] was recently proposed to learn multi-scale information in graphs. For the pooling step of the U-Net, topk pooling is normally adopted, which takes the form of Equation graphunet-topk-pooling, with $\textbf i$ the selected vertice index and $\textbf  p$ projection vector.

$$\textbf i = \text{top}_k(\textbf  p^\top H)$$

Oversmoothing [@oversmooth_rusch2023survey] is a command curse caused by the message-passing framework, where multiple propagations tend to make far-away node features indistinguishable. However, **S**calable **I**nception **G**raph **N**eural Networks [@sign_frasca2020sign] keeps multi-propagation node features and concatenates them as a latent feature. The architecture of SIGN is shown in Figure 2 and follows Equation.

$$H = \text{MLP}(\Vert_{i=0}^{n} \text{MLP}_i(L^i X))$$


![SIGN overview: The node feature $X$ is propogated by multiple times $\{I\cdot X,L\cdot X,\cdots,L^n\cdot X\}$. And these features are concatenated to maintain the information in each stage](sign.png)
<center><strong>Figure 2: SIGN overview</strong></center>



## GNNs for FEM

Since the meshes used FEM are non-euclidean, some researchers have tried to use GNNs as an alternative to FEM.

Some studies use the elements as nodes to build the graph [@GNN-FEM-naive; @FEM-DBC-fully-connected], while others use the
vertices in the mesh to build the graph [@GNN-FEM-time-seq; @FEM-DBC-PINN; @GNN-DBC-static-condense]. We call the former graph the an 'Element Graph', and the latter one a 'Vertice Graph'.

In the literature, element graphs have been used to directly encode the boundary conditions into the features of the element, using a encoder-decoder GNN structure to simulate FEM [@GNN-FEM-naive]. Another study [@FEM-DBC-fully-connected] assumes $K_{ID}$ is a dense matrix, and therefore use dense connection between the boundary elements and the interior elements.

For vertice graphs, a recent study [@GNN-DBC-static-condense] used a naive method to tackle the condensing, and directly processed the loads according to Equation static-condensation-formula. To learn the latent physical rule, they use **P**hysical **I**nformed **N**eural **N**etwork as the model.

# Methodology

## Mesh to Graph

For this work, we choose to use vertice graphs rather than element graph, since element graphs are closer to **F**inite **V**olume **M**ethod and are not equivalant to the **F**inite **E**lement **M**ethod from physical view.

We use the Algorithm mesh2graph to generate the graph connections $\mathcal E$ from the given elements $\mathcal C$. It is easily  implemented in Pytorch [@pytorch_NEURIPS2019_9015] and could easily be parallelized on GPU. For line mesh2graph-meshgrid of this algorithm, we could use `torch.vmap(torch.meshgrid)` to parallelize it, and for Line mesh2graph-coalesce, we can use `torch.sparse_coo_tensor.coalesce` to remove the duplicated edges.


> **Input:** $\mathcal{C}$ **Output:** $\mathcal{E}$
> - $\mathcal{E} \gets \{(v_i,v_j) \mid v_i, v_j \in \mathcal{C}_k\}$
> - $\mathcal{E} \gets \text{coo coalesce}(\mathcal{E})$
> - **Return** $\mathcal{E}$
<center>
<strong>Algorithm 1: Mesh2Graph</strong>
</center>

According to the Algorithm  1, each element is considered as a fully connected subgraph. The process of converting from mesh $\mathcal M$ to graph $\mathcal G$ can be visualized in Figure 3


![Mesh To Graph: Each element is considered as a fully connected subgraph](mesh2graph.png)
<center><strong>Figure 3: Mesh To Graph</strong></center>

## Fast Assembly

Typically, the assembly process is a time-consuming part of FEM. Traditionally, a `for` loop is used to do the assembly, which is very
inefficient. In this subsection, we propose a fast python assembling method called 'Fast Assemble', which is fast and easy to parallelize, thus unlocking the potential of GPU and NPU.

**Fast Edge Assembly** The Pseudo code of the Fast Edge Assembly method is presented in Algorithm 1. Its output is of shape $\mathbb R^{\mathfrak D\times \mathfrak D}$. The `coo` in Line 2 denotes the **Coo**rdinate List. And `csr` represents **C**ompressed **S**parse **R**ow sparse matrix storage format, which is fast for multiplication and indexing.

The assembly process for the Galerkin matrix could be viewed as a sparse matrix multiplication (non-symmetric) as shown in Figure 4.

![Edge Assemble: The assemble process could be considered as a sparse](edge-asm.png)
<center><strong>Figure 4: Edge Assemble</strong></center>


> **Input:** $\mathcal{E},\mathcal{C}$ **Output:**$\mathcal{P}_{\mathcal E}$
> - $\mathcal E_{\text{id}}\gets coo([1,\cdots,|\mathcal  E|], \mathcal E.u, \mathcal E.v).tocsr()$
> - $\mathcal E_{\text{id,local}} \gets \mathcal E_{\text{id}}(\mathcal C_{ki},\mathcal C_{kj})$
> - $\mathcal P_{\mathcal E} \gets coo(\boldsymbol 1, \mathcal E_{\text{id,local}}, [1,\cdots,h^2|\mathcal C|])$
> - **Return** $\mathcal P_{\mathcal E}$ 

<center><strong>Algorithm 2: Build Edge Projection Tensor</strong></center>

> **Input:** $\mathcal{C},\hat K_{\text{local}}$ **Output:** $K$
> - $\mathcal E \gets \textbf{Mesh2Graph}(\mathcal C)$
> - $\mathcal P_{\mathcal E}\gets \textbf{Build Edge Projection}(\mathcal E,\mathcal C)$
> - $\hat K_{\text{global}}^{nkl} \gets \mathcal P_{\mathcal E}^{nhij} \hat K_{\text{local}}^{hklij}$
> - $K \gets block\_coo(\hat K_{\text{global}}^{nkl}, \mathcal E)$ 
> - **Return** $K$

<center><strong>Algorithm 3: Fast Edge Assembly</strong></center>


**Fast Node Assemble** We also present an an algorithm for 'Fast Node Assembly', the result of which is $\mathbb R^{\mathfrak D}$. We also show the pseudo code in Algorithm 5.

If the topology of the mesh stays consistent, then the computational
cost for both the Fast Edge Assembly and the Fast Node Assembly is only
a sparse matrix multiplication. Therefore, the algorithm is fast and
easy to parallelize and can be directly implemented on GPU using
Pytorch [@pytorch_NEURIPS2019_9015].


> **Input:** $\mathcal{E},\mathcal{C}$ **Output:** $\mathcal{P}_{\mathcal V}$
> $\mathcal P_{\mathcal V} \gets coo(\boldsymbol 1, \mathcal C, [1,\cdots,h^2|\mathcal C|])$
> **Return** $\mathcal P_{\mathcal V}$ 
<center><strong>Algorithm 4: Build Node Projection Tensor</strong></center>

> **Input:** $\mathcal{C},\hat F_{\text{local}}$ **Output:** $K$
> $\mathcal P_{\mathcal E}\gets \textbf{Build Node Projection}(\mathcal C)$
> $\hat F_{\text{global}}^{nk} \gets \mathcal P_{\mathcal E}^{nhi} \hat F_{\text{local}}^{hki}$
> $F \gets block\_coo(\hat F_{\text{global}}^{nkl}, \mathcal E)$ 
> **Return** $F$
<center><strong>Algorithm 5: Fast Node Assembly</strong></center>

## Static Condensing Equivalent Architecture

Suppose a naive situation in Assumption 1, that for DBC vertice, all dimension are constraints. For example, in the FEM problem, all three dimension of the boundary node are fixed with a given displacement.

**Assumption 1**. *The DBC is applied to all dimensions of a vertice*

In Equation static-condensation-formula, we substitute the first formula with a GNN, such that it is formulated as:

$$
\begin{aligned}
\text{GNN}_{\theta_1}(A_{II},f_I',x) &\approx K_{II}^{-1}(x_I)(f)
\\
\text{B-GNN}_{\theta_2}(A_{IB},u_B,x_B)&\approx -K_{IB}u_B
\end{aligned}$$ 

The backbone GNN, denoted as $\text{GNN}_{\theta_1}$ and parameterized by $\theta_1$, is designed to solve the linear system. In
contrast, the Bi-partite GNN, $\text{B-GNN}_{\theta_2}$, with parameters $\theta_2$, models the propagation from boundary displacement to inner loading force. The architecture of $\text{B-GNN}_{\theta_2}$, as described by Equation b-gnn, comprises two Multi-Layer Perceptrons (MLPs). Figure 5 provides a detailed visualization of this process.

$$\text{B-GNN}_{\theta_2}(x)=\text{MLP}_2(A_{DI}\text{MLP}_1(x))$$

![Bi-Partite Graph Neural Network: Orange circles represent boundary nodes, while blue circles denote inner nodes. Rectangles indicate the node features. Boundary node features are processed by a Multi-Layer Perceptron (MLP) before aggregation at the inner nodes, followed by another MLP to map the aggregated features.](b-gnn.png)
<center><strong>Figure 5: Bi-Partite Graph Neural Network</strong></center>

By substitute the mutual Galerkin matrix $K_{IB}$ and the inverse of theinner Galerkin matrix $K_{II}^{-1}$ with GNNs. This allows us to obtain the static condensation:

$$\begin{gathered}
u_I = K_{II}^{-1}(f_I-K_{IB}u_B)\nonumber
\\
\downarrow\nonumber
\\
u_I = \text{GNN}_{\theta_1}(A_{II},f_I+\text{B-GNN}_{\theta_2}(A_{BI},u_B), x_I)
\end{gathered}$$

To visualize the architecture more intuitively, we draw the pipeline in Figure 6.
<center>

![SCEA: The Static Condense Equivelant Architecture overview. The Bipartite GNN is a kind of GNN that propagate message on a bi-partite graph. The Backbone GNN could be any canonical GNN. For example, GCN and GAT.](scea.png)

**Figure 6: SCEA**

</center>


The Bipartite GNN is built specially for propagating information from DBC nodes to inner nodes. It takes the following form:

$$F_D\approx \text{MLP}_{I}(A_{ID}\text{MLP}_D(u_D))$$

## Physical Loss

To illustrate the physical loss in detail, we take the Linear Elasticity PDE here.

In order to optimize the parameters in GNN to predict a better displacement $u$.

**Strong Form Loss** The most intuitive loss is the strong form loss, which is directly the left and right side residual of the equation for a linear system. Normally, **M**ean **S**quare **E**rror is used. Therefore, we formulate the strong form loss as:

$$\mathcal L_{\text{phy strong}} = \Vert Ku - f \Vert_2$$

**Weak Form Loss** Apart from the linear system, we could also obtain an equation for the weak form equation, allowing us to formulate another loss function as:

$$\begin{aligned}
    &\mathcal L_{\text{phy weak}} = \nonumber\\&\left\Vert \mathcal P_{\mathcal V}\left(
    \int_\Omega \begin{bmatrix}
    \frac{\partial u}{\partial x}&0\\
    0&\frac{\partial u}{\partial y}\\
    \frac{\partial u}{\partial y}&\frac{\partial u}{\partial x}
    \end{bmatrix}_{eid} D_{eij} B_{ebjd}|J|_{e} - f_{ebd}N_{b}|J|_{e}  \text dv\right)
    \right\Vert_2
\end{aligned}$$

where $D$ and $B$ are denoted using vigoit notation. The matrix $\mathcal  P_{\mathcal V}$ is referred to as the vertice assembly
matrix, which is a transformation mapping from $\mathbb R^{|\mathcal C|\times b\to |\mathcal V|}$. The gradient $(\nabla u)_{ed}$ is calculated by multiplying the gradient of the shape functions $(\nabla N)_{ebd} u_{ebd}$ with the nodal values $u_{ebd}$. Here, $e$ stands for element, $b$ for basis, $d$ for dimension, and $i,j$ are used for indices in the context of reduction.

## Galerkin Equivelant Architecture

As for another problem, we want to model the forward process which is $K,u\to f$ rather than $K,f\to u$. We could either predict the local Galerkin matrix to get the global Galerkin matrix by Fast Edge Assemble or predict the global Galerkin matrix directly.

**Local Pseudo Linear GEA** Assuming we can predict the local Galerkin matrix directly from the vertice coordinates by a simple neural network $\text{MLP}_\theta(x) \approx \hat K_{\text{local}}$, then we could propose the first Local Pseudo Linear GEA as Equation local-bilinear-gea.

$$\begin{aligned}
K &= \text{bsr\_matrix}(\mathcal P_{\mathcal E} \hat K_{\text{local}}) \\
\downarrow \\
K &= \text{bsr\_matrix}(\mathcal P_{\mathcal E} \text{MLP}_\theta(x))
\end{aligned}$$

**Local Pseudo Bilinear GEA** Since the Local Pseudo Linear GEA cannot maintain the bilinear feature of the vigoit notation. Therefore, we proposed another approach: Local Pseudo Bilinear GEA with assumption $\text{MLP}_{\theta_1}(x) \approx B$ and $\theta_{2,ij} +\theta_{2,ji} - \theta_{2,ii} \approx D$. Then we could also obtain the prediction for global Galerkin local-linear-gea.

$$\begin{aligned}
K &= \text{bsr\_matrix}(\mathcal P_{\mathcal E} B^\top DB) \\
\downarrow \\
K &= \text{bsr\_matrix}(\mathcal P_{\mathcal E} \text{MLP}_{\theta_1}(x)^\top \\&(\theta_2 +\theta_{2}^\top - \text{diag}(\theta) )\text{MLP}_{\theta_1}(x))
\end{aligned}$$

**Global GEA** We could also predict the global Galerkin matrix directly using an Edge-GNN.
$$
K_e = \text{MLP}([x_u||x_v])$$

For all these methods, the loss function is defined as Equation
$$
\mathcal L = \Vert Ku - f\Vert$$

## Complexity Analysis

There are many methods to solve the sparse linear system $Au=f$. We could mainly categorized them into two parts: the iterative methods such as Conjugated Gradient, Bi-Conjugated Gradient Stable, etc. and direct methods Cholesky or LU decomposition.

Assume a sparse matrix with $e$ non-zero entries and of size $n \times n$, where typically $e \gg n$. For the operation of matrix-vector multiplication $Au$, both time and memory complexities are $O(e)$. These complexities are detailed in Table 3, where different methods are compared. Iterative methods, which dynamically assess convergence, introduce an iteration count $l$. Commonly, the maximum number of iterations is capped at $10,000$, and the convergence threshold for the residual is set to $10^{-5}$.

<center>

| Method | GNN | iterative method | direct method |
|--------|-----|------------------|---------------|
| Memory Consumption | $\mathcal O(e)$ | $\mathcal O(e)$ | $\mathcal O(n^{\frac{3}{2}})$ |
| Time Complexity | $\mathcal O(e)$ | $\mathcal O(le)$ | $\mathcal O(n^{\frac{3}{2}})$ |

**Table 3: Approximated Complexity for each method**

</center>

# Experiments

## Setup

**Baselines**

-   GCN [@gcn_kipf2016semi]: Since GCN suffers from over-smoothing, we make GCN to be 3 layers in depth with 64 hidden size. The activation function is defaulted to ReLU [@relu_glorot2011deep].

-   GAT [@gat_velivckovic2017graph]: The GAT also suffers from over-smoothing. We fix the depth, hidden size, and activation function of GAT to be the same as the GCN. The number of heads for multi-head attention is fixed at $4$.

-   GraphUNet [@graphunet_gao2019graph] : The topk pooling will sample $50\%$ of the vertices. This ensures that the information is able reach the other side on the mesh. The depth of the GraphUNet is fixed at $3$.

-   SIGN [@sign_frasca2020sign] : SIGN is a decoupled method that keeps the information for each propagation step. Therefore, it does not suffer from over-smoothing. Each MLP is assumed to be $3$ layers with a hidden size $64$ and activation function ReLU. The number of propagation $n$ in Equation sign and Figure 2 is set to be $8$. In this way, the information will reach the same distance as GraphUNet.

-   NodeEdgeGNN: Sometimes, relative position is preferred instead of a normalized position. Therefore, we need a artificial GNN that only processes the edge feature. We propose a GNN called NodeEdgeGNN that is inspired by [@deepmind2020learning]. We build a basic block of graph convolution as Equation. 
    $$\begin{aligned}
           H_{\mathcal E}^{l+1}&\gets \sigma\left(W_{\mathcal E}\left([H_{\mathcal V,u}^l\Vert H_{\mathcal V,v}^l \Vert H^l_{\mathcal E}]\right) + b_{\mathcal E}\right)
           \\
           H_{\mathcal V,i}^{l+1}&\gets \sigma\left(W_{\mathcal V}\frac{1}{\vert \mathcal N_i \cup \{i\}\vert} \sum_{j\in\mathcal N_i}H_{\mathcal E,ij}^{l+1} + b_{\mathcal V}\right)
    \end{aligned}$$ 
    The depth, hidden size and activation function are set the same as GCN.

-   MLP :Like the neural operator, without topology information, we could also implement the prediction task using MLP.

**Hardware**

The experiments are carried on a laptop with i5-11300H CPU with 16GB RAM and a Nvidia MX450 GPU with 2GB RAM.

**Dataset**

The mesh $\mathcal M$ is generated using Gmsh [@gmsh], a fast mesh generating library in C++. Each element $\mathcal C_k$ is supposed to be a triangle with three bases $h=3$. The basis function for the triangle element is shown in Equation.

$$\begin{aligned}
    b_1 &= 1- x - y\nonumber\\ 
    b_2 &= x \\  
    b_3 &= y\nonumber
\end{aligned}$$

where $x,y$ here is the local coordinate, which is considered be constrained by $x,y\in[0,1]\cap x+y\le 1$.

We applied different boundary conditions and load conditions to the mesh, which is shown from
Figure 7 to Figure 9. The models are expected to train on the condition in Figure 7, and test on all the conditions shown in Figures 7,8,9.

![Rectangle shape with triangle mesh. The upper boundary is applied with
a downward force $f=sin(2\pi x)$, the bottom boundary are fixed in all
two
dimensions](vis_dataset/rectangle_sin2.png)
<center>

**Figure 7: Rectangle with $\sin(2\pi x)$ load condition**

</center>

![Rectangle shape with triangle mesh. The upper boundary is applied with
a downward force $f=sin(\pi x)$, the bottom boundary are fixed in all
two
dimensions](vis_dataset/rectangle_sin1.png)
<center>

**Figure 8: Rectangle with $\sin(\pi x)$ load condition**

</center>

![Rectangle shape with triangle mesh. The upper boundary is applied with
a downward force $f=sin(2\pi x)$, the left and right boundaries are
fixed with all two
dimensions.](vis_dataset/rectangle_sin2_left+right.png)
<center>

**Figure 9: Rectangle with $\sin(2\pi x)$ load condition and left and right boundary fixed**

</center>

**Loss**

To combine the physical loss with data loss, we proposed three methods,
which are

-   equal : the total loss is the direct sum of data loss and physical
    loss. 
    $$ \mathcal L = \mathcal L_{\text{data}} + \mathcal L_{\text{phy}}$$

-   weight : the total loss is the weighted sum of data loss and
    physical loss. 
    $$\mathcal L = \mathcal L_{\text{data}} + \lambda L_{\text{phy}}$$
    where $\lambda=0.01$

-   auto weight [@auto_weight_kendall2018multi]: the data loss is the
    parameters ($\theta_{\text{data}},\theta_{\text{phy}}$) controlled
    weighted sum of data loss and physical loss.
    $$
            \mathcal L= \frac{\mathcal L_{\text{data}}}{2\theta_{\text{data}}^2}+ \frac{\mathcal L_{\text{phy}}}{2\theta_{\text{phy}}^2}+\text{log}(1+\theta_{\text{data}}^2)+\text{log}(1+\theta_{\text{phy}}^2)$$

## Observed Data Variant

In this experiment, when the `condense type` is `none`, it means that all the DBC are added to the training set. For `static`, only part of the static condensation will be executed, it takes form as Equation condense-type-static. When the `nn` is adopted, then the
exact SCEA will be applied according to Equation scea-equivelance

$$u \approx \text{GNN}_{\theta}(A_{II},f_I-K_{ID}u_D)$$

The `train ratio` denotes how many portions of data except DBC are observable. When `train ratio` becomes $1.0$, then all the data is known. On the contrary, when `train ratio` is $0.0$, only DBC are known.

**Invariant Test**

In the invariant test, the dataset utilized for testing is identical to the one used for training.

When the `training ratio` is set to 0.0, it implies exclusive reliance on the physical loss for `condense type` settings of either `static` or `nn`. This configuration allows for an assessment of the loss function's effectiveness in adhering to physical constraints. Conversely, for a `condense type` of `none`, Dirichlet Boundary Conditions (DBC) are employed, forming a data-driven training set.

![Invariant Test(with load condition $f=sin(2\pi x)$ and bottom boundary
fixed and **strong** physical
loss(Equation strong-form-loss) with equal total loss
$\mathcal L = \mathcal L_{\text{data}} + \lambda L_{\text{phy}}$ is
adopted)](invariant/test_score_rectangle_sin2_0.1_strong_phy_weight.png)
<center>

**Figure 10: Invariant Test with Strong Physical Loss and Weighted Total Loss**

</center>

![Invariant Test(with load condition $f=sin(2\pi x)$ and bottom boundary
fixed and **strong** physical
loss(Equation strong-form-loss) with equal total loss
$\mathcal L= \frac{\mathcal L_{\text{data}}}{2\theta_{\text{data}}^2}+ \frac{\mathcal L_{\text{phy}}}{2\theta_{\text{phy}}^2}+\text{log}(1+\theta_{\text{data}}^2)+\text{log}(1+\theta_{\text{phy}}^2)$
is
adopted)](invariant/test_score_rectangle_sin2_0.1_strong_phy_auto_weight.png)
<center>

**Figure 11: Invariant Test with Strong Physical Loss and Auto Weight Total Loss**

</center>

There are some interesting observations.

-   When the `train ratio` is set to $0.0$, SIGN with either `static` or `nn` demonstrates optimal performance, indicating its capability to infer latent physical rules effectively in the absence of observed data.

-   At a `train ratio` of $0.0$, the performance of `static` and `nn` condense types is nearly identical. This suggests that the B-GNN is adept at modeling the propagation of boundary conditions.

**Frequency Variant Test**

In the frequency variant test, distinct datasets are used for training and testing. The model is trained using the dataset depicted in
Figure 7 and evaluated on the dataset illustrated in Figure 8. The outcomes of this test are presented
in Figure [\[fig:frequency-strong-equal\]].

![Frequency Variant Test(with load condition $f=sin(\pi x)$ and bottom
boundary fixed and **strong** physical loss(Equation [\[eq:strong-form-loss\]] with auto weight total
loss(Equation [\[eq:loss-auto-weight\]] is adopted)](frequency/test_score_rectangle_sin1_0.1_strong_phy_auto_weight.png)
<center>

**Figure 12: Frequency Variant Test with Strong Physical Loss and Auto Weight Total Loss**

</center>

**Boundary Variant Test**

In the boundary variant test, the training dataset and testing dataset are different. The model is trained on dataset shown in Figure 7 and tested on dataset shown in Figure 9. The result is shown in Figure 13.

![Boundary Variant Test(with load condition $f=sin(2\pi x)$ and left+right boundary fixed and **strong** physical los (Equation strong-form-loss) with auto weight total loss(Equation loss-auto-weight) is adopted)](boundary/test_score_rectangle_sin2_left+right_0.1_strong_phy_auto_weight.png)
<center>

**Figure 13: Boundary Variant Test with Strong Physical Loss and Auto Weight Total Loss**

</center>

For the frequency variant and boundary variant tests, we present only the results using the auto weight loss, as defined in Equation loss-auto-weight.

Based on these tests, we can draw the following conclusions:

-   Performance in the frequency variant test surpasses that in the boundary variant test.

-   A notable disparity exists between the physical loss and data loss, indicating that achieving generalization in models trained with physical loss is challenging.

## Case Study

In this subsection, we visualize the prediction result from SCEA. Specifically, we adopt the GNN SIGN trained only on the condition of the bottom Dirichlet boundary and top loading force of $f(x)=sin(2x)$. The model is trained for 1000 epochs with a learning rate of 0.01. The target loss function is strong form loss as shown in Equation strong-form-loss.

We first test the prediction result on the same boundary and loading condition as the training dataset as shown in Figure 14. As can be seen, the result is pretty close to the ground truth.


![model trained with loading function $f(x)=sin(2x)$ and bottom Dirichlet boundary using physical loss is tested on loading function of $f(x)=sin(2x)$ and same boundary condition](case_study/0.0_rectangle_sin2_auto_weight_sign_nn_condense.png)
<center>

**Figure 14: Case Study Invariant**

</center>


To better investigate if the model has learned the frequency information from the loading function, we perform the frequency variant test, which changes the test loading frequency from 2 to 1, meaning the test mesh is somewhat different from the training mesh. The result is shown in Figure 15. The result is not as good as expected, meaning the model seldom learns anything from the loading information.


![model trained with loading function $f(x)=sin(2x)$ and bottom Dirichlet boundary using physical loss is tested on loading function of $f(x)=sin(x)$ and same boundary condition](case_study/0.0_rectangle_sin1_auto_weight_graphunet_nn_condense.png)
<center>

**Figure 15: Case Study Frequency Variant**

</center>



On the other hand, to study the influence of the Dirichlet boundary condition topology, we also change the boundary condition of the
dataset, which is shown in Figure 16. The result is also not as good as expected. Since one can hardly find any common from ground truth and prediction. It means that the model also cannot learn the boundary information from the one-shot training.


![model trained with loading function $f(x)=sin(2x)$ and bottom Dirichlet boundary using physical loss is tested on loading function of $f(x)=sin(2x)$ with left and right Dirichlet boundary](case_study/0.0_rectangle_sin2_left+right_auto_weight_graphunet_static_condense.png)
<center>

**Figure 16: Case Study Boundary Variant**

</center>

## Generalization

To thoroughly evaluate the generalization capabilities of models trained with physical loss, we generated a comprehensive collection of random datasets. These datasets are primarily categorized into two topological types: triangles and quadrilaterals.

The triangle datasets were created by introducing a slight deviation to a standard unit triangle. This process is detailed in Equation triangle-dataset. Each triangle is slightly altered to introduce variability, yet maintaining a basic triangular structure. On the other hand, the generation of quadrilateral datasets follows a similar approach but adheres to the formula outlined in Equation quadrilateral-dataset. These quadrilaterals vary in shape and size, offering a diverse range of geometries for analysis.
Representative examples from these datasets are illustrated in Figures 14 and 15, showcasing the range of variability within each category.

$$
    \mathcal V = \begin{bmatrix}
0 & 0 & 1 \\
0 & 1 & 0
\end{bmatrix} + \mathcal N(0, 0.4)$$

$$
    \mathcal V = \begin{bmatrix}
0 & 0 & 1 & 1 \\
0 & 1 & 0 & 1
\end{bmatrix} + \mathcal N(0, 0.4)$$

![Randomly generated triangle dataset](dataset/triangle.png)
<center>

**Figure 17: Randomly generated triangle dataset**

</center>

![Randomly generated triangle dataset](dataset/quadrilateral.png)
<center>

**Figure 18: Randomly generated quadrilateral dataset**

</center>

In total, 840 distinct datasets were produced, each characterized by unique boundary conditions and loading forces. This extensive collection is designed to rigorously test the model's ability to adapt and learn from varied geometrical configurations and stress scenarios.

The experimental setup involves training the model on these datasets for a duration of 200 epochs, with a set learning rate of 0.005. This training regimen is aimed at thoroughly exposing the model to a wide spectrum of data, thereby challenging its learning and generalization mechanisms.

The outcomes of this training are depicted in Figure 19. A cursory examination of this figure reveals a notable struggle in the model's ability to consistently learn and replicate physical patterns across the diverse range of datasets. This observation is further substantiated by the recorded loss metrics, as shown in Figure 16. Here, a significant discrepancy is observed between the data loss and physical loss metrics. Such a disparity could be attributed to the fundamental differences in their calculation methods. The physical loss computation involves the gradient of the shape function, focusing on the variation of geometric properties, whereas the data loss calculation is solely concerned with the discrepancies in function values. This divergence in approach may underlie the challenges faced by the model in achieving a high degree of generalization across varied datasets.


![The prediction result from  the model trained on a bunch of different meshes](case_study/multi.png)
<center>

**Figure 19: Generalization Test**

</center>


![The recording loss for multiple graphs training](loss/0.0_GNNPipeline_MLP_4_64_64_3_SIGN_64_2_64_3_8_None_loss_nn_condense_auto_weight_strong_phy.png)
<center>

**Figure 20: Loss Recording**

</center>

## Galerkin Prediction

In this section, we focus on the forward problem, specifically targeting the direct prediction of the Galerkin matrix. To this end, we employ the Galerkin Equivalent Architecture (GEA) method, which encompasses several sub-methods.

For our experiments, we utilize the Pratt bridge truss dataset, which is composed of trusses. The structure of these trusses is depicted in Figure 21.

![Pratt bridge truss mesh](dataset/bridge.pratt.png)
<center>

**Figure 21: Pratt Bridge Truss Mesh**

</center>

The models undergo extensive training for 20'000 epochs using the Adam optimizer. To enhance the learning process, we implement a cosine scheduler that progressively reduces the learning rate with each epoch. The Multi-Layer Perceptron (MLP) used in our models is configured with four layers and includes residual connections, enhancing its capacity for learning complex patterns.

Among the various approaches, the most intuitive is the pseudo bilinear method, as described in Equation local-bilinear-gea. The efficacy of this method is evaluated by comparing the predicted Galerkin matrix with the ground truth, as shown in Figure 22.

![Pseudo Bilinear Local Galerkin Equivalent Architecture trained result, with right the prediction Galerkin matrix while the left is the ground truth Galerkin matrix](gea/local/K/bilinear.png)
<center>

**Figure 22: Pseudo Bilinear Local Galerkin Equivalent Architecture**

</center>

In addition to the Local Pseudo Bilinear Galerkin Equivalent Architecture, we also explore other variants. The results of another such variant are illustrated in Figure 23.

![Pseudo Linear Local Galerkin Equivalent Architecture trained result, with right the prediction Galerkin matrix while the left is  the ground truth Galerkin matrix](gea/local/K/linear.png)

<center>

**Figure 23: Pseudo Linear Local Galerkin Equivalent Architecture**

</center>

Furthermore, we extend our analysis to the global Galerkin prediction, as outlined in Equation global-gea. The comparison of predictions with the actual Galerkin matrices is visually represented in Figure 24
reference="fig:global-K"}.

![Global Galerkin Equivalent Architecture with positional encoding frequency 8. The right is the predicted Galerkin matrix while the left is the ground truth Galerkin matrix](gea/global/K/L_8.png)
<center>

**Figure 24: Global Galerkin Equivalent Architecture**

</center>

Upon examining Figures 22,23,24, it becomes evident that, despite the challenges inherent in predicting the Galerkin matrix as indicated by the loss function in Equation gea-loss, the Global Galerkin Equivalent Architecture demonstrates superior performance compared to the local variants.

# Conclusion

In this study, we delve into two principal problems in the realm of structural analysis. The first is the reverse problem, focused on deducing the displacement of a structure given the applied loading force. The second, known as the forward problem, involves predicting the loading force from known displacements. To address the reverse problem, we introduce the Static Condensation Equivalent Architecture (SCEA). This innovative approach integrates the concept of static condensation into Graph Neural Network (GNN) frameworks, offering a novel perspective in computational mechanics.

For the forward problem, we propose the Galerkin Equivalent Architecture (GEA). This architecture is not a singular solution but rather a suite of implementations, each tailored to capture the complex interactions in structural systems under varying conditions.

Our experimental findings shed light on the underlying connections between Graph Neural Networks (GNNs) and the Finite Element Method (FEM). These insights not only demonstrate the potential of GNNs in accurately modeling structural responses but also pave the way for
future explorations in this interdisciplinary field. The SCEA and GEA, with their respective focuses, contribute significantly to our
understanding of the intricate relationship between machine learning algorithms and traditional finite element analysis, opening new avenues for research and development in structural engineering and computational mechanics.

[^1]: $u$ is called \"trial space\", $v$ is called \"test space\"

[^2]: $J$ is the jacobian matrix, which define the transformation
    between the standard element to the global deformed element
