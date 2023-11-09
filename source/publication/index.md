---
title: publication
date: 2023-11-02 21:22:44
---

<style>
  .paper-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .paper-item {
    opacity: 0;
    padding: 20px;
    border-bottom: 1px solid #e1e1e1;
    position: relative;
    transform: translateX(-100%);
    transition: all .3s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .paper-item img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    margin-right: 20px;
  }
  .paper-item.right {
    transform: translateX(100%);
  }
  .paper-item.visible {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.6s, transform 0.6s;
  }
  .paper-content {
    flex-grow: 1;
  }

  /* Mobile styles */
  @media (max-width: 767px) {
    .paper-item {
      flex-direction: column;
      padding: 10px;
    }
    .paper-item img {
      width: 100%; /* full width */
      height: auto; /* maintain aspect ratio */
      margin-right: 0;
      margin-bottom: 10px; /* add some space between image and text */
    }
    .paper-content h3 {
      font-size: 1.2rem; /* adjust heading size for mobile */
    }
  }

  /* Tablet styles */
  @media (min-width: 768px) and (max-width: 1023px) {
    .paper-item {
      padding: 15px;
    }
    .paper-item img {
      width: 200px; /* larger than mobile, but smaller than desktop */
      height: auto;
    }
    .paper-content h3 {
      font-size: 1.4rem; /* slightly larger heading size for tablet */
    }
  }
</style>


<div class="timeline">
  <ul class="paper-list" id="paperList"></ul>
</div>

<script>
  const papers = [
    {
      img: '/img/paper-1.jpg',
      title: 'Mining World Indicators for Analyzing and Modeling the Development of Countries',
      journal: 'ACM/IMS Transactions on Data Science 2022',
      authors: 'Mingyuan Chi, Hong Huang, Yu Song, Hai Jin',
      abstract: 'The world indicators released by the World Bank or other organizations usually give the basic public knowledge about the world. However, separate and static index lacks the complex interplay among different indicators and thus cannot help us have an overall understanding of the world. To this end, we study the world indicators from a different angle. ',
      link:"https://dl.acm.org/doi/full/10.1145/3488059"
    },
    {
      img: '/img/architecture.png',
      title: 'Bi-Encoder Cascades for Efficient Image Search ',
      journal: 'Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV) Workshops, 2023, pp. 1358-1363',
      authors: 'Chi Mingyuan, Hönig Robert, Ackermann Jan, ',
      abstract: 'Modern neural encoders offer unprecedented text-image retrieval (TIR) accuracy, but their high computational cost impedes an adoption to large-scale image searches. To lower this cost, model cascades use an expensive encoder to refine the ranking of a cheap encoder. ',
      link:'https://openaccess.thecvf.com/content/ICCV2023W/RCV/html/Honig_Bi-Encoder_Cascades_for_Efficient_Image_Search_ICCVW_2023_paper.html'
    },
    // more papers...
  ];

  const paperList = document.getElementById('paperList');
  paperList.innerHTML = papers.map((paper, index) => `
    <li class="paper-item${index % 2 === 0 ? '' : ' right'}">
      <img src="${paper.img}" alt="Paper Image">
      <div class="paper-content">
        <h3 class="paper-title"><a href="${paper.link}"">${paper.title}</a></h3>
        <p>Journal: <span>${paper.journal}</span></p>
        <p>Authors: <span>${paper.authors}</span></p>
        <p>Abstract: <span>${paper.abstract}</span></p>
      </div>
    </li>
  `).join('');

  const items = document.querySelectorAll('.paper-item');
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
