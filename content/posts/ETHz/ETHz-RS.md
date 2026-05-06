---
title: "Robotic Seminar:Sensor Modeling in Sim2Real"
index_img: img/sensor_modeling.png
banner_img: img/banner-purple.png
date: 2023-12-19 21:44:00
category: "Presentation"
tags: [ETH Zürich, Robotics, Sim2Real, Sensor Modeling, Advance System Lab(ASL)]
---

# Sensor Modeling in Sim2Real

---

Advisor : Dr Philip Arm, Dr Filip Bjelonic

---

[slides](https://raw.githubusercontent.com/walkerchi/ETHz-RS/main/meeting/2023-12-19/Sensor_Modeling_in_Sim2Real.pptx
)

[report](https://raw.githubusercontent.com/walkerchi/ETHz-RS/main/ETHz_Robotic_Seminar_Report.pdf
)


# Introduction

Training robots in real-world environments poses potential dangers and
incurs significant expenses. Simulations offer a safer and more
cost-effective alternative, mitigating risks commonly associated with
real-world experiments. In scenarios where real-world data is limited or
challenging to collect, simulations provide a viable mean to generate
the necessary data, thereby facilitating comprehensive training and
testing. Sim2Real refers to the process of transferring knowledge,
skills, or models developed in a simulated environment (Sim) to
real-world applications (Real). This approach bridges the gap between
theoretical models and practical, real-world utility. A primary
challenge in Sim2Real is the \"reality gap,\" characterized by
discrepancies between simulated and real-world conditions. These
discrepancies may arise from differences in physics, sensor data,
lighting, and other environmental factors. To address the reality gap,
techniques such as Domain Randomization are employed. This method
introduces variability into simulations to better approximate the
unpredictability of the real world, thereby enhancing the robustness of
Sim2Real transfers [@gao2020domain_random]. Another approach involves
the use of high-fidelity simulations, which strive to enhance the
realism of simulated environments. Improvements in physics modeling,
material properties, lighting, and sensor behavior aim to more closely
replicate real-world
conditions [@tan2018sim; @du2021sim_param; @akella2023measure_discrepency; @byravan2023nerf2real; @singh2023acutors_feedback; @kadian2020sim_tune].

Developing models that exhibit generalizability and robustness is also
crucial. This includes implementing continuous learning strategies and
improving model architectures to ensure effective Sim2Real
applications [@abey2023human].

In shifting our focus from general Sim2Real challenges to a pivotal
aspect, sensor modeling, this paper delves into how sensors, such as RGB
and depth cameras, serve as vital tools for perceiving the environment
and the robot's state, rather than for physical interaction. The precise
replication of sensor data in simulations is crucial for successful
Sim2Real applications. This paper not only explores the complexities of
accurately modeling these sensors within the Sim2Real framework but also
reviews recent research efforts in this domain. We aim to elucidate the
impact of sensor precision on the efficacy of Sim2Real transfer and
discuss contemporary strategies developed by researchers to enhance
sensor model fidelity for real-world applications

The structure of this article is as follows:

-   **Sensor Modeling in Sim2Real**: The second section provides an
    extensive review of various sensor models used in Sim2Real. It
    encompasses a range of sensor types, including RGB cameras, depth
    sensors, Inertial Measurement Units (IMUs), force sensors, and
    encoders. This section aims to dissect the methodologies,
    advantages, and limitations associated with each sensor type,
    offering insights into their practical applications in Sim2Real
    scenarios.

-   **Challenges and Future Directions**: The third section is dedicated
    to summarizing the prevailing challenges in sensor modeling within
    the Sim2Real context. It also outlines potential future research
    directions, aiming to address these challenges and enhance the
    efficacy of sensor models. This section aims to stimulate further
    research and development in the field, paving the way for more
    sophisticated and reliable Sim2Real transitions.

# Review of Literature

## RGB camera

RGB cameras, notable for their accessibility and affordability, offer a
high-density information format through pixels. The standard approach,
as Zhu et al [@zhu2018reinforcement] illustrate, employs a
**C**onvolutional **N**eural **N**etwork (CNN) to encode the RGB stream
from the camera, followed by a **L**ong **S**hort-**T**erm **M**emory
(LSTM) network to model the signal sequence.

Inspired by the impressive capabilities of **Ne**ural **R**adiance
**F**ields (Nerf), Byravan [@byravan2023nerf2real] utilized NeRF to
construct simulation environments from short mobile phone videos.
Although it's easy to take a video of 4-5 mintes, this process,
involving lengthy preprocessing with COLMAP[^1] (3-4 hours) and NeRF
training (20 minutes on 8 V100 GPUs), is resource-intensive.
Additionally, it demands manual calibration of the NeRF mesh with the
real world and struggles with dynamic objects, which are instead
incorporated using the MuJoCo simulation environment.
Figure [\[fig:nerf\]](#fig:nerf){reference-type="ref"
reference="fig:nerf"} detailed illustrates the whole pipeline of this
approach.

::: figure*
![image](images/image-20231114005030330.png){width="\\linewidth"}
:::

Expanding upon the Neural Radiance Fields (NeRF) concept,
Yang [@yang2023unisim] introduced an innovative approach using voxel
rendering, as opposed to traditional mesh rendering, to enhance memory
efficiency and facilitate the handling of dynamic objects. In this
methodology, a hypernetwork is employed to generate voxel-based
representations for each dynamic actor within the simulated environment.
This technique effectively manages the complexities of dynamic scene
rendering, balancing detail and computational load.

To provide a clearer depiction of this technique,
Figure [1](#fig:voxel){reference-type="ref" reference="fig:voxel"}
illustrates the voxel rendering process. As shown, the 3D scene is
bifurcated into a static background (grey) and a set of dynamic actors
(red). The static scene is represented through a sparse feature-grid,
while the hypernetwork dynamically generates the voxel representation
for each actor. This representation leverages a learnable latent space,
and the scene is subsequently brought to life via neural rendering. This
innovative approach, as visualized in the figure, underscores the
efficiency and adaptability of voxel rendering in complex, dynamic
environments.

![Overview of the approach in Paper [@yang2023unisim]. The 3D scene is
divided into a static background (grey) and a set of dynamic actors
(red). The static scene is modeled with a sparse feature-grid, and a
hypernetwork is utilized to generate the representation of each actor
from a learnable latent. The neural feature description is then produced
through neural
rendering.](images/image-202311270141059262.png){#fig:voxel
width="\\linewidth"}

Beyond environment creation, some research, like
Yang's [@Yang2020surfel], focuses on generating realistic training
images. This method involves a **Surf**ace **el**ement (Surfel)[^2] GAN
to transform surfel-rendered images into realistic RGB camera images.

Although the surfel method can generate a more realistic dataset, it
still suffers from problems like. a) SurfelGAN is unable to recover from
broken geometry, b) Places where surfel map does not cover will cause
Hallucination.

In the study by Lim et al [@real2sim2real], a novel approach to dataset
augmentation is presented, targeting the **Planar Robot Casting (RPC)**
problem. This method innovatively integrates both simulation and
real-world data to create a comprehensive training dataset. The process
begins with the robot performing random interactions in the physical
environment, forming the reality dataset,
$\mathcal{D}_{\text{phy}} = \{\text{random real interaction}\}$. These
real-world experiences are then utilized to optimize the simulation
parameters, $\theta_{\text{sim}}$, through a minimization process:
$\theta_{\text{sim}} = \underset{\theta}{\text{argmin}}(s_{\text{real}}, s_{\text{sim},\theta})$.
The robot subsequently engages in random interactions within a simulated
environment, generating the simulation dataset
$\mathcal{D}_{\text{sim}} = \{\text{random sim interaction}\}$. The
policy training leverages a weighted combination of these datasets,
expressed as
$\pi = \text{Model}(\text{weighted combine}(\mathcal{D}_{\text{phy}}, \mathcal{D}_{\text{sim}}))$.
However, the application of this methodology to three-dimensional
contexts is impeded by the inherent uncertainties associated with static
and dynamic friction.

## Depth Sensor

Depth sensors, such as LiDAR, are instrumental in converting 2D RGB
images to 3D spatial representations. LiDAR, leveraging laser time delay
for distance measurement, is known for its reliability and precision,
making it a popular choice in autonomous driving and robotics.
Additionally, structured light methods, used in products like Kinect,
Zed Camera, and RealSense [@keselman2017realsense], offer alternative
depth-sensing techniques.

Although the depth from LiDAR is accurate compared to the structured
light method, it still suffers from phenomena like a) Unretruned pulse
because of fast amplitude decay $\frac{1}{R^4}$, b) Multiple echos
caused by multiple surfaces, c) Spurious returns caused by beam
divergence, d) Noisy points caused by ambiguity in waveform peak, and so
on. Some work [@manivasagam2023towards] uses methods like drop points,
add points, spurious points, and noise points to bridge the reality gap
in the simulation. Similarly, other work [@espadinha2021lidar_random]
use a Gaussian additive model and Bernoulli distribution approximation
to model the noise model and point dropout. Their parameters are
obtained through
Equation [\[eq:noise-model\]](#eq:noise-model){reference-type="ref"
reference="eq:noise-model"} and
Equation [\[eq:point-dropout-model\]](#eq:point-dropout-model){reference-type="ref"
reference="eq:point-dropout-model"}. And the parameters are assumed to
obey the quadratic polynomial fit in
Equation [\[eq:noise-model-quad\]](#eq:noise-model-quad){reference-type="ref"
reference="eq:noise-model-quad"} and
Equation [\[eq:point-dropout-model-quad\]](#eq:point-dropout-model-quad){reference-type="ref"
reference="eq:point-dropout-model-quad"} $$\label{eq:noise-model}
\hat d \sim \mathcal N(d,\sigma)$$ $$\label{eq:noise-model-quad}
    \sigma = k_1 \alpha^3 + k_2d^2 + k_3 d\alpha + k_4\alpha + k_5 d + k_6$$
$$\label{eq:point-dropout-model}
    p_r = \frac{np_t-np_a}{np_t}$$ $$\label{eq:point-dropout-model-quad}
    p_r = p_1\alpha^2+p_2 d^2 + p_3 d\alpha + p_4 \alpha + p_5 d + p_6$$
where $k_1-k_6$ and $p_1-p6$ are obtained by least squares fitting. $d$
is the distance to the origin and $\alpha$ is the angle with forward
axis. $\sigma$ is the deviation and $p_r$ is the Bernoulli distribution
parameter. $np_t, np_a$ are the theoretical/observed number of points.

Similar to SurfelGAN [@Yang2020surfel], CycleGAN is also used to
generate more realistic simulation
data [@sallab2019lidar_sensor_modeling]. It considers the problem from
real LiDAR data to simulation LiDAR data as an image-to-image
translation, therefore, it's viable to use a CycleGAN to learn this
translation. Furthermore, not only CycleGAN could be used to do the data
augmentation, **N**eural **S**tyle **T**ransfer model could be used to
augment the dataset from simulation. Sallab [@sallab2019unsupervised]
provides a general framework to augment the LiDAR dataset with different
methods including CycleGAN and NST. The overall architecture could be
abstracted as
Equation [\[eq:data-augment-arch\]](#eq:data-augment-arch){reference-type="ref"
reference="eq:data-augment-arch"} $$\label{eq:data-augment-arch}
    \text{Realistic Data} = \mathcal G(\text{Simulation Data})$$ where
the $\mathcal G$ could be CycleGAN in former
work [@sallab2019lidar_sensor_modeling], or $\mathcal G$ is either
CycleGAN or NST in latter work [@sallab2019unsupervised].

Apart from LiDAR, Kinect is also a typical choice for depth sensors.
Mallick gives a detailed study on the noise model of
Kinect [@mallick2014characterizations]. And they also categorize the
noise in the Kinect into three main classes, namely, spatial noise,
temporal noise, and inference noise.

## Inertial Measurement **U**nit

The **I**nertial **M**easurement **U**nit (IMU), primarily used for
measuring acceleration, is often integrated with other sensors like
encoders and RGBD sensors rather than being used standalone. Unlike RGBD
sensors, IMUs generate signals at a significantly higher frequency,
posing challenges in synchronizing these asynchronous signals, a topic
still open for research.

In the context IMU modeling in sim2real, a data-driven method at a
designated frequency, a technique highlighted in the work of Işcen et
al [@iscen2018policies]. This method emphasizes the importance of
accurately modeling sensor data for effective real-world application. By
integrating these sampled IMU signals into a policy network, alongside
motor position data, the approach effectively mirrors real-world sensor
behavior in a simulated environment. The combined data is then utilized
as input for a Proportional-Derivative (PD) controller, a crucial step
in ensuring the stability and reliability of the output when
transitioning from simulation to reality. This method showcases a
data-centric approach in sensor modeling, crucial for Sim2Real
applications, wherein the IMU sensor's real-world characteristics and
data are meticulously replicated and utilized within the simulation
framework to achieve seamless real-world applicability.

In terms of signal processing in data-driven modeling approach,
Gu [@gu2021learning_autonomous_mobility] applies a Butterworth low-pass
filter with a 15 Hz cutoff frequency to IMU data for denoising and
outlier removal, with the IMU sampling frequency set at 30 Hz.
Subsequently, a **L**ong **S**hort-**T**erm **M**emory (LSTM) controller
is employed to interpret these time-sequenced signals.

Further, Imai et al [@Imai2022vision_guided] adopt a multi-modal policy
network, integrating inputs from RGB video, 4D IMU data (capturing roll
and pitch angles and angular velocities), 12D robot joint rotation, and
12D of the last executed action. They address the asynchrony issue using
a visual observation buffer and implement a **M**ulti-**M**odal
**D**elay **R**andomization (MMDR) technique to enhance Sim2Real
transfer. Similar to Işcen's work, their approach is also a kind of
data-driven modeling method.

**P**rincipal **C**omponent **A**nalysis (PCA) offers another method for
interpreting IMU data, as demonstrated by Weerakoon et
al [@weerakoon2022sim_to_real_strategy], who focus on trajectory
navigation. They introduce a feature extraction for data-drive approach.
By analyzing the first two principal components of IMU data, they
extract surface-level vibration information. Additionally, they employ a
**D**ynamic **W**indow **A**pproach (DWA) to penalize velocities and
prevent robot flip-overs.

## Force Sensor

In their comprehensive review, Luo et al [@luo2017robotic_tactile]
delineate the primary categories of force sensors utilized in robotic
applications, classifying them into three distinct groups: single-point
contact sensors, tactile sensor arrays, and optical tactile sensors.
Single-point contact sensors, exemplified by devices such as the ATI
Nano [@kuchenbecker2006ATI] and biomimetic whiskers [@huet2017whiskers],
are characterized by their high precision in measuring contact force and
vibration, albeit limited to a singular point of contact. In contrast,
tactile sensor arrays, which include technologies like fiber optics,
MEMS-based barometers, and DigiTacts, trade-off precision for broader
measurement capabilities. Optical tactile sensors, a burgeoning field of
research, combine accuracy with high-density measurement capabilities,
with notable examples including GelSight [@s17122762GelSight],
GelTip [@GelTip], TacTip [@TacTip], and DIGIT [@DIGIT].

The conventional approach for modeling tactile arrays involves a
numerical method, as delineated by Kappassov et
al [@kappassov2020touch_driven]. This process computes a Jacobian matrix
based on the tactile pattern signals received from the array, with
distinct patterns yielding corresponding Jacobians. For illustrative
examples of this methodology, refer to
Figure [2](#fig:inverse-jacobian){reference-type="ref"
reference="fig:inverse-jacobian"}. Subsequently, the inverse Jacobian is
integrated into the control system in a feedback loop. This numerical
pipeline is recognized for its robustness and computational efficiency.
However, its utility is somewhat diminished by its inherent coarseness
and a limitation to particular contact configurations.

![The Inverse Jacobian Example for Tactile
Array](images/1-s2.0-S0921889019300697-gr7_lrg.jpg){#fig:inverse-jacobian}

In the context of specialized shape sensors like the SynTouch BioTach,
Narang et al [@narang2021sim_to_real_for_robotic_tactile] employs Two
**V**ariational **A**uto **E**ncoders structure for modeling. The first
autoencoder encodes the mesh deformation $m_t\in\mathbb R^{4k\times 3}$
from simulation into a latent space $z_m\in\mathbb R^{128}$. And the
second one will encode the electrode signals $e_t\in\mathbb R^{19}$ from
the sensor into another latent space $z_m\in \mathbb R^8$. Then two
**F**ully **C**onnected **N**etworks are used to bridge the two latent
spaces.

As for optical tactile, a simple deformation-rendering model can be used
to describe how the GelSight work [@gomes2021generation_of_gelsight]. In
this work, they first generate a Rough elastomer heightmap according to
the contact region. Secondly, Gaussian filtering is applied to simulate
the strain of the membrane. Finally, a simulation image could be
rendered using Phong's model [@phong1998illumination_phong]. The
pipeline is expressed compactly in
Equation [\[eq:gelsight-render\]](#eq:gelsight-render){reference-type="ref"
reference="eq:gelsight-render"}.

$$\label{eq:gelsight-render}
    \text{RGB} = \text{Phong}(\text{GF}(H_{\text{height map}}))$$

While this method is both rapid and robust in generating tactile sensor
data, it is important to note that the rough elastomer heightmap,
Gaussian filtering, and Phong's model collectively offer only an
approximate representation. This approximation may lead to inaccuracies
in the model, particularly in contexts where fine details of tactile
interaction are crucial. To provide a clearer understanding of this
process, Figure [3](#fig:gelsight-render){reference-type="ref"
reference="fig:gelsight-render"} illustrates the rendering pipeline as
per
Equation [\[eq:gelsight-render\]](#eq:gelsight-render){reference-type="ref"
reference="eq:gelsight-render"}.

![The two steps of
Equation [\[eq:gelsight-render\]](#eq:gelsight-render){reference-type="ref"
reference="eq:gelsight-render"}. First elastomer heightmap is first
approximated from the depth camera. Then, the image is smoothed using
Gaussian filter and rendered utilizing Phong's illumination model.
](images/image-202311261225480302.png){#fig:gelsight-render
width="\\linewidth"}

The **F**inite **E**lement **M**ethod provides a more precise modeling
approach. Several studies have focused on bridging the gap between FEM
simulation and Real-world indentations.

Sferrazza et al [@Sferrazza2019ground_truth] employ the simulated force
distribution data derived from Finite Element Method (FEM) models to
train their tactile sensing algorithms. In another noteworthy study, the
authors of [@sferrazza2020learning_the_sense] amalgamate optical flow
information with force distribution data from FEM simulations to enrich
the training dataset for their learning models.

For specialized tasks such as determining the in-hand pose of tubular
objects, Zhao et al [@zhao2023skill] introduce an AngleNet architecture
that deduces the object's orientation using images from a DIGIT force
sensor. The AngleNet's parameters are refined through a simulation
process executed in the Gazebo environment. To bridge the gap between
simulated and real-world data, a CycleGAN-inspired architecture, termed
\"CTF-CycleGAN,\" is employed. This architecture enhances the fidelity
of the simulated images, thus yielding more realistic representations
that are beneficial for training purposes.

## Encoders

Encoders, which can be electrical or magnetic, primarily serve as
position sensors within motors. Although they are commonly thought of as
measuring angular velocity or torque, their primary function is to
translate rotational position into sensor data. While it is possible to
estimate velocity from positional information, encoders do not directly
measure torque. Torque estimation would require a setup involving two
encoders and a known stiffness element, like a spring. Encoders have
been a staple for feedback in various applications since their early
adoption. They are often used in conjunction with other sensors such as
IMUs and RGBD cameras. However, it's noteworthy that there has been
limited research focused on effectively modeling encoders within
simulations.

In the simulation framework NeuronGym [@haoran2023neuronsgym], the
encoders are modeled using Gaussian noise
model [\[eq:encoder-gaussian-noise\]](#eq:encoder-gaussian-noise){reference-type="ref"
reference="eq:encoder-gaussian-noise"}

$$\label{eq:encoder-gaussian-noise}
    \tilde \omega_i (t) = \omega_i(t) + n^e,n^e\sim\mathcal N(\mu_e, \sigma_e)$$

where $\mu_e$ represents the mean and $\sigma_e$ the standard deviation
of the measurement noise. This formulation can be adapted as required to
meet specific demands according to the code provided.

# Conclusion

In this paper, we have delved into the crucial role of sensor modeling
within the Sim2Real process, underscoring its pivotal contributions to
enhancing safety, reducing costs, and improving data availability in the
field of robotics. Our comprehensive analysis of various sensor models,
including RGB cameras, depth sensors, IMUs, force sensors, and encoders,
has shed light on their vital importance in achieving accurate and
reliable translation from simulated environments to real-world
applications.

Our findings reveal two key insights:

-   The modeling of IMU and encoders in the Sim2Real context is
    currently underexplored, indicating a significant opportunity for
    advancement in this area. Most of the works focus on the application
    of IMU and encoders.

-   CycleGAN has emerged as a prevalent tool for facilitating the
    transition from simulation data to real-world data, reflecting its
    potential to bridge the Sim2Real gap.

-   The advent of new techniques in deep learning, such as Neural
    Fields, offers innovative approaches to sensor modeling. These
    methods are reshaping the landscape of sensor simulation, providing
    more nuanced and accurate representations.

-   The Finite Element Method (FEM) stands out as a precise and powerful
    tool for modeling physical contact sensors. Its application in this
    domain allows for highly detailed and accurate simulations of sensor
    behavior under various conditions.

Given these observations, we strongly advocate for future research to
broaden its scope to include a more diverse array of sensors,
particularly focusing on encoders. Such exploration is crucial for
developing more comprehensive and versatile Sim2Real models.
Additionally, enhancing the robustness of these models remains an open
and vital area of research. Progress in these domains will not only
advance the theoretical understanding of Sim2Real processes but also
have profound practical implications, significantly boosting the
efficacy and applicability of AI and robotics systems in diverse
real-world settings. The potential advancements in this field promise to
revolutionize the interaction between simulated training environments
and real-world operational contexts, thereby marking a milestone in the
evolution of intelligent systems.

[^1]: COLMAP is a general-purpose Structure-from-Motion (SfM) and
    Multi-View Stereo (MVS) pipeline

[^2]: A surfel is a small, oriented disk used to represent a portion of
    a 3D surface
