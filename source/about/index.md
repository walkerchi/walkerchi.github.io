---
title: About me
date: 2023-11-02 11:34:15
banner_img: /img/spaceship.gif
---

<style>
  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  .content {
    position: relative;
    padding: 20px;
    max-width: 600px;
    margin: 50px auto;
    display:flex;
    flex-direction: column;
  }
  .content .where{
    display:flex;
    flex-direction:row;
    align-items:center
  }
  .content .where em{
    padding-left:0.3cm;
    opacity:0.5;
  }
  .timeline {
    position: relative;
    max-width: 900px;
    margin: 50px auto;
    padding: 50px 0;
  }
  .timeline-item {
    opacity: 0;
    padding: 20px;
    border-bottom: 1px solid #e1e1e1;
    position: relative;
    transform: translateX(-100%);
    transition: all .3s ease-in-out;
  }
  .timeline-item.right {
    transform: translateX(100%);
  }
  .timeline-item.visible {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.6s, transform 0.6s;
  }
  .date {
    font-size: 0.8em;
    color: #999;
  }
</style>

  <div class="content">
    <h1>Hello</h1>
    <p>My name is Mingyuan Chi, but you can also call me Walker.
    
    I specialize as an interdisciplinary researcher and engineer, with a strong background in computer science, machine learning, computational physics, robotics, and finance. My technical skills include proficiency in Python, C++, and JavaScript, as well as fluency in Julia, Rust, and Matlab.

    I am passionate about leveraging my diverse skill set and knowledge base to solve complex problems and make meaningful contributions to my field. I look forward to exploring new opportunities and collaborating with other professionals who share my interests and passion.</p>
  </div>
  <div class="timeline">
    <div class="timeline-item" id="item1">
      <div class="date">September 2022 - present</div>
      <div class="content">
        <div class="where"><h2>ETH-Zürich</h2><em>Eidgenössische Technische Hochschule Zürich</em></div>
        <div class="role">Msc of Computational Science Engineering</div>
        <p>During my time at ETH Zurich, I had the opportunity to broaden my academic horizons and gain a wealth of knowledge in interdisciplinary fields, including physics, robotics, mathematics, and finance.</p>
      </div>
    </div>
    <div class="timeline-item right" id="item2">
      <div class="date">October 2021 - June 2022</div>
      <div class="content">
        <div class="where"><h2>RWTH</h2><em>Rheinisch-Westfälische Technische Hochschule Aachen</em></div>
        <div class="role">Exchange of Informatik</div>
        <p>This is my first experience living abroad, and admittedly, I have felt a bit overwhelmed at times. Despite the challenges, I've immersed myself in self-learning and actively sought out ways to assist others. These efforts have not only helped me regain my happiness but also allowed me to grow and adapt to my new environment.</p>
      </div>
    </div>
    <div class="timeline-item right" id="item3">
      <div class="date">July 2021 - August 2021</div>
      <div class="content">
        <div class="where"><h2>Tencent</h2></div>
        <div class="role">AI Engineer Internship</div>
        <p>My internship at Tencent was an incredibly enjoyable experience. Even though I was still a student, it was my first time working in a corporate environment. My supervisor was supportive and the food was delicious, despite high housing prices in Shenzhen. In terms of achievements, I significantly improved the performance of the Graph Estimation Algorithm (GEN). I managed to increase the processing speed by approximately 15 times and reduced the memory overhead to one-thousandth of its original size.</p>
      </div>
    </div>
    <div class="timeline-item right" id="item3">
      <div class="date">May 2021 - August 2021</div>
      <div class="content">
        <div class="where"><h2>University of Montreal</h2></div>
        <div class="role">Mitacs Program</div>
        <p>Due to the COVID-19 pandemic, the research program was conducted online. Nonetheless, I successfully developed a self-supervised clustering algorithm to analyze electrical signals from Oxford Nanopore Technology, with the aim of determining the source of complementary DNA (cDNA).</p>
      </div>
    </div>
    <div class="timeline-item right" id="item4">
      <div class="date">September 2018 - June 2022</div>
      <div class="content">
        <div class="where"><h2>HUST</h2><em>Huazhong University of Science and Technology</em></div>
        <div class="role">Bacher of Computer Science and Technology(Grades: 90.6/100, top 8%)</div>
        <p>I graduated with the highest honors from Huazhong University of Science and Technology (HUST), where I solidified my mastery of computer science. My time at HUST was greatly enriched by the supportive and knowledgeable professors who played a crucial role in my academic journey.</p>
      </div>
    </div>
    <!-- Additional timeline items go here -->
  </div>

  <script>
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    items.forEach(item => {
      observer.observe(item);
    });
  </script>

