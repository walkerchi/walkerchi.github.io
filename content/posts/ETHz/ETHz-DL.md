---
title: "Model Cascades for Efficient Image Search"
index_img: img/architecture.png
banner_img: img/banner-bone.jpg
date: 2023-05-23 14:00:00
category: "Project"
tags: [ETH Zürich, Deep Learning, Efficiency, Image Text Retrivel]
---

# Model Cascades for Efficient Image Search

Modern neural encoders offer unprecedented text-image retrieval (TIR) accuracy. 
However, their high computational cost impedes an adoption to large-scale image searches.
We propose a novel image ranking algorithm that uses
a cascade of increasingly powerful neural encoders
to progressively filter images by how well they match a given text.
Our algorithm reduces lifetime TIR costs by over 3x.



## Introduction
Search engines are the most widely used tool for information retrieval (IR) on the internet --- Google alone processes over 8.5 billion searches a day. A search engine takes as input some query $q$ and returns a list of documents $\mathbb D$ ranked by how well they match $q$. Keyword-based search ranks results by naively matching query keywords with documents. Semantic search tries to improve on keyword-based search by matching queries to documents based on their meaning.
A fruitful domain for semantic search is TIR, where documents are images and queries are texts. New semantic search engines for TIR leverage recent advances in deep learning for processing images and natural language. Typically,
these engines use neural networks to construct an image encoder $I$ and a text encoder $T$ that process text $q$ and each image $d\in \mathbb D$
into embeddings $v_q = {T}{q}$ and $V_{\mathbb D} = \{v_d = {I}{d} : d\in\mathbb D\}$ that capture their semantics. Then, the engines rank images in $\mathbb D$
by some similarity measure of $v_d$ and $v_q$.
In large-scale search scenarios, $\mathbb D$ may contain several million documents. This makes it
computationally expensive to compute embeddings for all documents.

We seek to lower this computational cost while preserving search quality. To this end, we measure search quality as Recall@$k$, which denotes the fraction of searches that include the desired result in the top-$k$ results. Even small increases in $k$ can
 significantly improve the Recall@$k$. Hence, for $g\gg k$, the top-$k$ results 
  of a large and expensive encoder $I_l$ are likely included in the top-$g$ results of a small and cheap encoder $I_s$. This observation leads to our main idea: \emph{At build time, pre-compute $V_{\mathbb D}$ with $I_s$. Then, at runtime, to handle a query $q$, retrieve the top-$m$ results 
$\mathbb D_m \subset \mathbb D$ for some $m\gg k$, recompute $V_{\mathbb D_m}$ with $I_l$ and return the top-$k$ results.}
This idea, illustrated in  \Cref{fig:arch_detail}), naturally extends to a cascade of $r$ progressively larger encoders that compute progressively smaller sets $V_1\ldots,V_r$.

In practice, it is possible for over 90\% of all documents in $\mathbb D$ to never be included in any search result over the lifetime of a large-scale search engine. This means that our technique would evaluate $I_l$ on less than 10\% of $\mathbb D$, resulting in significant lifetime computational savings. In this work we make the following contributions:
- We introduce a novel cascading algorithm for fast TIR.
- We show that our algorithm speeds up TIR on standard benchmarks by over 3x at no reduction in search quality.
- We investigate the benefits of deep cascades and
    demonstrate a 2x reduction in query latency.

![Schematic of our algorithm for a 2-level cascade $\bracket{I_s, I_l}$. In this example, encoder $I_s$ computes embeddings $V_{\mathbb D}$ of all four images (leftmost four squares) at build time. At runtime, the images that correspond to two the highest-ranking embeddings (green) are processed by encoder $I_l$ that produces embeddings $V_{\mathbb D_2}$ of higher quality. Finally, we rerank the top-2 images with  $V_{\mathbb D_2}$ to output the highest-ranking image. ](architecture.png)

## Related Work
Model cascading is a recurrent theme in the literature on efficient machine learning (ML) systems.
[FrugalML](https://github.com/lchen001/FrugalML) minimizes access costs of ML APIs by cascading two calls to a cheap API and to an expensive API.
[NoScope](https://arxiv.org/abs/1703.02529)speeds up object detection in videos by splitting a reference model into a squence of two specialized models.
Model cascades have also been applied to facial key point estimation, pedestrian detection  and other domains.

Recent work on encoders for TIR is dominated by transformer-based bi-encoders (BEs) and
cross-encoders (CEs). BEs process images and texts with separate encoders, whereas CEs also add cross-connections between the encoders. Hence, CEs are more powerful, but need to recompute $V_{\mathbb D}$ for new queries. This makes them impractical for large-scale searches and unsuitable for our idea. Therefore, we focus on BEs.

Several methods for fast TIR with CEs have been developed:  [VLDeformer](https://arxiv.org/abs/2110.11338) trains a decomposable CE that can be used as a BE at inference time with minimal loss in quality.
[CrispSearch](https://dl.acm.org/doi/abs/10.1145/3524273.3528181), [LightningDot](https://arxiv.org/abs/2103.08784) and [Retrieve Fast, Rerank Smart](https://arxiv.org/abs/2103.11920v1) all introduce two-level sequences of a BE whose results can be cached for approximate inference and a CE for precise inference on a subset of the BE results. This is similar to our idea but differs in two key ways:
First, we consider arbitrarily deep model cascades, whereas these approaches are fundamentally limited to two models.
Second, we target BE inference instead of CE inference. In fact, this suggests that our approach could complement these existing techniques as the BE model in their first stage for even faster TIR.



## Models and Methods


### Cascaded Search
Let $\mathbb D$ be a collection of $n$ images 
that we want to query with a cascade of BEs. Consider a cascade of image encoders
$I = \{I_s, I_1, \ldots, I_r\}$ that all use the same text encoder $T$. We propose algorithm Cascade Search to query $\mathbb D$ by ranking all images with $I_s$ and subsequently the top $m_j$ images with $I_j$. Note that with $r=0$, Cascade Search reduces to a standard BE search. 


*Computational cost*
Assume that function Query in Cascade Search invoked $q$ times and denote the computational cost ofCascade Search with $C(I, q)$.
We want to minimize the lifetime computational cost of Cascade Search, that is $C(I, q)$ as $q\rightarrow\infty$. We can decompose $C(I, q)$ into the sum of the lifetime image encoding cost $a(I, q)$ and some term $b(q)$ that is independent of $I$ and thus irrelevant for optimization over $I$.
Next, we formalize our introductory observation on the set of a search engine's lifetime search results  into the following key assumption:

Cascaded Search. Here, $\mathrm{Rank}(I, V, t)$ sorts the images in $I$ by the cosine similarity of their encodings $V$ with text encoding $t$.
1. **Input** : $\{I_s, I_1,\ldots,I_r\}$, $m_1 > \ldots > m_r \in \mathbb N$, $\mathcal D$
2. **Init**: **for** $c \in \mathcal D$ **do**  $V_s\![c] \longleftarrow I_s(c)$
3. **Function** Query(text)
    $\mathrm{Top} \longleftarrow \mathrm{Rank}(\mathcal D,V_s,f{T}{\mathrm{text}})$
4. **for**  $j=1$ **to** $r$
    **for** $c\in \mathrm{Top}\![1\ldots m_j]$\,**do** $V_j\![c]\xleftarrow{\text{if empty}} I_j(c)$ 
    $\mathrm{Top} \longleftarrow \mathrm{Rank}(\mathrm{Top}\![1\ldots m_j],V_j,T(\mathrm{text}))$
    **end for**
**Return** $\mathrm{Top}[1]$
**End Function**

**Assumption**
For $q\in\mathbb N$, let $S_q \subset \mathcal D$ be the set of all images pushed to $\mathrm{Top}$ in query $q$. Then, $frac{1}{n}|\bigcup_{q\in\mathbb N}S_q| =: f \ll 1$.


If $I_s, I_1, \ldots, I_r$ have costs $t_s < t_1 < \ldots < t_r$, then Assumption implies that $a(I, q) = nt_s + fn\sum_{i=1}^rt_i$. Hence, the 2-level cascade $[I_s, I_1]$ is cheaper than the 1-level cascade $[I_s]$ if the speedup factor $[t_s + ft_1]/{t_1}$ exceeds 1.

We note that Assumption implies no computational advantage of a $I$ over an equally powerful $2$-level cascade $I' = [I_s,I_r]$ with $m'_1 = m_1$. However, if $q$ is low enough that $V$ is not hit, then the $r$-level cascade speeds up individual queries by a factor of
$$
  m_1t_r/\sum_{i=1}^rm_it_i
$$
This is useful, because unlike uncascaded models that execute the expensive image encoder only  during build time, 2-level cascades have a $m_1 t_r$ runtime overhead when $V$ is not hit. Hence, deep cascades can mitigate the increased latency of early queries in 2-level cascades.


### Creating the Cascade

| Dataset      | Method     | R@1  | R@5  | R@10 | Speedup |
|--------------|------------|------|------|------|---------|
| MSCOCO       | No Cascade | 30.1 | 54.2 | 64.6 | 1x      |
|              | Cascade    | +0.2 | +0.4 | +0.5 | 3.2x    |
| Flickr30k    | No Cascade | 29.9 | 52.0 | 61.3 | 1x      |
|              | Cascade    | +0.8 | +2.0 | +2.4 | 3.2x    |

We apply our proposed methods to CLIP, a powerful transformer-based text-image BE. CLIP uses the GPT-2 architecture for the text encoder, the vision transformer (ViT) architecture
for the image encoder and matches images to texts by the cosine similarity of their embeddings.
% Several pre-trained ViT encoders of different sizes are publicly available. 
We create a cascade $[I_s, I_1, \ldots, I_r]$ from publicly available trained CLIP image encoders of different sizes.


## Experiments

### Experimental Setup

- **Metrics**  Given a dataset $\mathcal D$ of image-caption pairs we measure the Recall@$k$ (R@$k$) metric as the fraction of captions in $\mathcal D$ whose corresponding image is among the top-$k$ search results. 
  In line with the IR literature, we report the Recall@$k$ for $k\in\{1,5,10\}$. In addition, we report for 2-level cascades the lifetime speedup and for deeper cascades the query speedup as discussed in Algorithm. We run all experiments on an Intel i7-11800H CPU at 2.30 GHz with turboboost disabled and compute speedups by measuring the total CPU time of queries. 
- **Datasets** We evaluate our algorithm on the MSCOCO validation dataset with 5k samples and on the Flickr30k dataset with 32k samples.

- **Parameters** We set the top-$m$ value of encoder $I_1$ to $m_1 = 50$ and assume a lifetime return fraction of $f = 0.1$.





### 2-level cascades

We use the Huggingface CLIP implementation with a ViT-B/16 image encoder as our uncascaded baseline $[I_1]$. We use the faster ViT-B/32 image encoder as $I_s$ to create the 2-level cascade $[I_s, I_1]$. 
Table 1 shows empirical results. The cascaded model reduces lifetime computational costs threefold. Surprisingly, the cascaded model achieves at the same time consistently higher Recall@$k$ than the uncascaded model. One explanation may be that ViT-B/32 initially processes input images into 32x32 tiles. Since these tiles are more coarse-grained than the 16x16 tiles used by ViT-B/16, they may offer superior approximate filtering of search results. Hence, $I_s$ could determine the top $m_1$ images more effectively than $I_1$. Further research is needed to explain why 2-level cascades show superior Recall@k.


### $n$-level cascades
| Dataset   | Method     | R@1  | R@5  | R@10 | Speedup |
|-----------|------------|------|------|------|---------|
| MSCOCO    | No Cascade | 32.5 | 57.2 | 68.1 | 1x      |
|           | Cascade    | +0.5 | +0.2 | -3.0 | 2.0x    |
| Flickr30k | No Cascade | 35.3 | 58.5 | 67.4 | 1x      |
|           | Cascade    | +1.0 | +0.0 | -3.7 | 2.0x    |

**Table: Recall@$k$ in \% and query speedup of the 3-level cascade \([ \textrm{ViT-B/32}, \textrm{ViT-B/16}, \textrm{ViT-L/14} ]\) with \( m_2=10 \) over the 2-level cascade \([ \textrm{ViT-B/32}, \textrm{ViT-L/14} ]\).**

Note: The table above shows the recall at \( k \) (R@\( k \)) and the query speedup of a 3-level cascade over a 2-level cascade for different datasets.

  
  

As noted in Section Cascaded Search, $n$-level cascades offer no reduced lifetime costs over $2$-level cascades, but may speed up individual queries. This is important for large image encoders that slow down queries, such as the ViT-L/14 encoder that is 3.3x slower than ViT-B/16. Therefore, we introduce the 2-level cascade $[\textrm{ViT-B/32}, \textrm{ViT-L/14}]$ and compare it against the 3-level cascade $[\textrm{ViT-B/32}, \textrm{ViT-B/16}, \textrm{ViT-L/14}]$. Concretely, we set a target speedup of 2x and use formula \Cref{eq:queryspeedup} to determine the corresponding number $m_2$ of top ranked images on which \CrefCascaded Algotithm should execute ViT-L/14. This yields $m_2 = m_1[frac{1}{2} - frac{t_1}{t_2}]  = 50[frac{1}{2} - frac{1}{3.3}]\approx 10$. Table 2 reports the empirically measured query speedups and the change in Recall@$k$ of the 3-level cascade. Similarly to Table 1, the deeper cascade offers superior predictions. However, for Recall@10 the predictions become significantly worse. This is because Cascaded Algotithm only uses ViT-L/14 to rerank the top $m_2 = 10$ images, so the set of the top 10 images stays unchanged. Hence, for $m_2 = 10$, the cascade $[\textrm{ViT-B/32}, \textrm{ViT-B/16}, \textrm{ViT-L/14}]$ is equivalent to the less powerful cascade $[\textrm{ViT-B/32}, \textrm{ViT-B/16}]$ with respect to the Recall@10 metric.

## Conclusion

Our experiments show that Cascaded Algorithm can lower lifetime computational search costs by over 3x at no reduction in search quality. At the same time,  deeper model cascades can mitigate the increase in latency of early queries.

However, single-digit speedups may not sufficiently reduce computational costs to economically rank large-scale image databases with expensive transformer-based BEs. Instead, a practitioner may use traditional search engines to retrieve the top-$k$ images and apply a neural search cascade on top of it. This heterogeneous cascade may offer a viable path towards the integration of state-of-the-art neural networks with established image search platforms.

It is important to note that all our observations rely on Assumption 1. While we have provided anecdotal evidence to support our choice of the lifetime return fraction as $f = 10\%$,different search scenarios likely vary in $f$ and achieve accordingly different speedups.