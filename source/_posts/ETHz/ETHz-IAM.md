---
title: "[IAM]Climate Economics and Finance"
index_img: img/ima.png
banner_img: img/banner-purple.png
date: 2024-06-03 21:57:00
category: "Note"
tags: [ETH Zürich, Master Thesis, Economics]
---


# [IAM]Climate Economics and Finance



## Nordhaus Dynamic Integrated model of Climate and Economy (DICE) Model

$$
F_t = \eta\cdot  \log_2\left(\frac{M_{AT,t}}{M_{AT,1750}}\right) + F_t^{\text{Abate}} + F_t^{\text{Ex}}
$$



- $F_t$ : increased radiative forcing 
- $M_{AT,t}$ : increased atmospheric carbon concentrations 
- $F_t^{\text{Abate}}$ : non-CO2 forcing net of abatement
- $F_t^{\text{Ex}}$​ : exogenous forcing
- $D(T_t)$​ : damage function 

$$
Y_t^{\text{Net}} = \underbrace{(1-\Lambda_t(\mu_t))}_{\text{left after abatement}}\cdot [\underbrace{(1-D(T_t))}_{\text{left after damage}}\cdot \underbrace{Y_t^{\text{Gross}}}_{\text{gross output}}]
$$

**Implications** : 

- reduce emission $\mu_t\downarrow$ costs money today, but reduce climate damages in the future $T_t\downarrow$​

$$
r = \rho + \phi g^* +\beta^{\text{CLIM}}\pi - \sigma^2_c\phi^2(0.5)
$$

- $\rho$ : utility discount (patiency)
- $g^*$ : consumption growth
- $\phi$ : utility concavity

**Social Cost of Carbon** 
$$
\text{SCC}_t =\sum_j L_{t+j}\left(\frac{1}{1+\rho}\right)^j \frac{\Delta u(c_{t+j})}{\Delta u(c_t)} \frac{\Delta Y_{t+j}}{\Delta T_{t+j}}\frac{\Delta T_{t+j}}{\Delta E_t}
$$

- $L_t$ :  population
- $\rho$ : utility discount factor 



## Panel

**linear**
$$
\text{Economic growth}_{i,t} = \beta \cdot \text{Temperature}_{i,t}+\text{Controls}_{i,t}+\varepsilon_{i,t}
$$


**nonlinear**
$$
\text{Outcome}_{i,t} = \beta_1\cdot \text{Temp}_{i,t}+\beta_2\cdot (\text{Temp}_{i,t})^2 + \text{Controls}_{i,t} + \varepsilon_{i,t}
$$
**Heterogeneous**
$$
\text{Outcome}_{i,t} = \beta_1\cdot \text{Temp}_{i,t} + \beta_2\cdot\left(\text{Temp}_{i,t}\cdot \text{Climate}_{i}\right)+\text{Controls}_{i,t}+\epsilon_{i,t}
$$

## Cyclones and Growth



## Marginal Abatement cost function



## Social Cost of Carbon & Excel-based IAM



- temperature change: $T_t = \eta\cdot  \log_2\left(\frac{M_{AT,t}}{M_{AT,1750}}\right)$
  - $\eta$ : temperature sensitivity
  - $M_{AT,t}$ : total amount of CO2 at time  $t$
  - $M_{AT,1750}$ : total amount of CO2 before industry
- damage function : $\frac{\text{Damage}_t}{\text{GDP}_t} = \psi_1 T_t^{\psi_2}$
  - $\psi_1,\psi_2$ : parameters
  - $T_t$ : temperature change
- Present Value(PV) of damage : $\frac{5\cdot \text{Damage}_t}{(1+r)^{t-t_0}}$​
- Present Value Total(PVT) of damage : $\sum_{t}\frac{5\cdot \text{Damage}_t}{(1+r)^{t-t_0}}$
- Total abatement cost (TAC) : $\frac{\text{TAC}_t}{\text{GDP}_t}=\theta_1\cdot (1+g)^{t-t_0}\mu^{\theta_2}$
  - $\theta_1,\theta_2,g$ : abatement parameters
  - $\mu$ : percentage emission reduction
- PV of TAC : $\frac{5\cdot \text{TAC}_t}{(1+r)^{t-t_0}}$​
- utility function: $u(c_t) = \frac{c_t^{1-\phi}}{1-\phi}$
  - $c_t = \frac{\text{GDP}_t^{\text{Net}}}{\text{Population}_t}$
  - $\phi$ : utility parameters
- PV  of social welfare : $\text{PVSW}_t = L_t\cdot u(c_t)\cdot \left(\frac{1}{1+\rho}\right)^{t-t_0}$
  - $\rho$ : utility discount factor 
  - $L_t$ :  population
- Social Cost of Carbon (SCC) : $\text{SCC} = \frac{\text{PVT of damage}}{\Delta S}$

## Lucas Tree Asset Pricing Model

$$
P_t = \mathbb E_t\left[\sum_{j=1}^\infin \beta^j\left(\frac{u'(d_{t+j})}{u'(d_t)}\right)\cdot d_{t+j}\right]
$$

- $\beta$ : impatience
- $u'(\cdot)$ : marginal utility of income
- $P_t$​ : price of the stock
- $d_{t+j}$ : dividends（股息)

## Consumption Capital Asset Pricing Model(CCAPM)

$$
\underbrace{u'(c_t)}_{\text{Marginal Cost(MC)}} = \underbrace{\beta\cdot \mathbb E_t\left[u'(c_{t+1})(1+r_{f,t+1})\right]}_{\text{Marginal Benefit(MB)}}
$$

$$
\mathbb E_t(r_{j,t+1}) - r_{f,t+1} = -(1+r_{f,t+1})\cdot \text{Cov}\left[\frac{u'(c_{t+1})}{u'(c_t)},r_{j,t+1}\right]
$$

- $r_{f,t+1}$​ : risk free rate
- $u'(c_{t+1})$​ : marginal utility of consumption 
- $\mathbb E_t(r_{j,t+1})$​ : expected return value
- $c_t$ : consumption at time $t$

**Implications** : 

- $\text{Cov}\left[\frac{u'(c_{t+1})}{u'(c_t)},r_{j,t+1}\right]<0 \Leftrightarrow r\propto c\propto \frac{1}{u}\Leftrightarrow \text{risk}\uparrow$
- $\text{Cov}\left[\frac{u'(c_{t+1})}{u'(c_t)},r_{j,t+1}\right]>0 \Leftrightarrow r\propto u \propto \frac{1}{c}\Leftrightarrow \text{risk}\downarrow$​
- CCAPM implies that we should value carbon abatement relatively more

## Efficient Market Hypothesis (EMH)

**key idea** : Asset prices reflect all available information about their value

**Implications** : 

- Stock price movements random (walks)
- Trade-off between risk and expected return
- Known climate risks should already be priced into asset value

## Balance Sheet

$$
\text{Total Assets} = \text{Total Liabilities} + \text{Stockholders' equity}
$$

**Concept**:

- **Asset**: something owned by the bank
  - Examples: bank reserves, cash equivalents, long-term investment
- **Liability**: something owed to another institution or person
  - demanded deposits(活期存款), short-term borrowing, long-term debts
- **Stockholders' equity**

**Example**

| Assets                |     Amount | Liabilities and Stockholders' Equity         |     Amount |
| --------------------- | ---------: | -------------------------------------------- | ---------: |
| Reserves              |        $74 | Demand deposits                              |       $935 |
| Cash equivalents      |       $274 | Short-term borrowing                         |       $429 |
| Long-term investments |     $1,453 | Long-term debt                               |       $208 |
| **Total assets**      | **$1,801** | **Total liabilities**                        | **$1,572** |
|                       |            | Stockholders' equity                         |       $229 |
|                       |            | **Total liabilities + Stockholders' equity** | **$1,801** |

**Bank**

- **Identify profitable lending opportunities** : savers & borrowers
- **Maturity Transformation** : short-term liabilities into long-term investments
- **Risk Management** : 
  - insolvent(资不抵债) : Stockholders' equity > 0, loss of value in long-term investment
  - fire sale: too many depositors withdraw deposits at the same time, banks sell illiquid

**Implications** : 

- $\text{risk}\uparrow\Leftrightarrow \text{long-term investments}\downarrow$​ : As long as stockholders’ equity is positive, this loss “comes out of” stockholders’ equity
- If The Efficient Markets Hypothesis holds and climate change turns out to be as expected, we would NOT expect physical climate impacts to pose a risk to bank solvency in the future.



