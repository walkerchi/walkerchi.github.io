/* The two languages are rendered in HTML; original article bodies stay untouched. */
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const directory = Boolean(document.querySelector('.article-directory'));
  const kind = body.dataset.pageKind || (directory ? 'articles' : 'home');
  const originalTitle = document.title;
  if (kind === 'legacy') document.querySelectorAll('.markdown-body').forEach(el => {
    el.lang = location.pathname.includes('/poems/') ? 'zh-CN' : (root.lang || 'en');
  });
  const languageButtons = document.querySelectorAll('[data-set-language]');
  const themeButton = document.getElementById('theme-toggle');
  const validLanguage = value => value === 'en' || value === 'zh';
  let language = 'en';
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Private browsing still works. */ } };

  function themeLabel() {
    const dark = body.dataset.mdColorScheme === 'slate';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', language === 'zh'
      ? (dark ? '切换到浅色模式' : '切换到深色模式')
      : (dark ? 'Switch to light theme' : 'Switch to dark theme'));
    document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.content = dark ? '#12171e' : '#fcfcfd');
    root.dataset.userColorScheme = dark ? 'dark' : 'light';
  }

  function setLanguage(next, updateUrl = false) {
    if (!validLanguage(next)) return;
    language = next;
    root.lang = next === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('.profile').forEach(el => el.lang = root.lang);
    document.querySelectorAll('[data-language]').forEach(el => el.hidden = el.dataset.language !== next);
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLanguage === next)));
    document.querySelectorAll('[data-label-en]').forEach(el => el.setAttribute('aria-label', el.dataset[next === 'zh' ? 'labelZh' : 'labelEn']));
    document.querySelectorAll('[data-alt-en]').forEach(el => el.alt = el.dataset[next === 'zh' ? 'altZh' : 'altEn']);
    document.querySelectorAll('[data-localize-link]').forEach(el => {
      const url = new URL(el.getAttribute('href'), location.href);
      url.searchParams.set('lang', next);
      el.href = url.href;
    });
    const titles = {
      home: ['Walker Chi — Experience, Projects & Writing', '迟明远 Walker Chi — 经历、项目与文章'],
      articles: ['Articles & Notes — Walker Chi', '文章与笔记 — 迟明远 Walker Chi'],
      publication: ['Projects & Publications — Walker Chi', '项目与论文 — 迟明远 Walker Chi'],
      about: ['About — Walker Chi', '关于我 — 迟明远 Walker Chi']
    };
    document.title = titles[kind] ? titles[kind][next === 'zh' ? 1 : 0] : originalTitle;
    const descriptions = {
      home: ['Walker Chi: LLM and multimodal engineering, experience, projects and writing.', '迟明远：大模型工程经历、教育背景、项目与科学写作。'],
      articles: ['All 20 original articles by Walker Chi, with their original cover images.', '迟明远的全部 20 篇原始博客文章与原封面。'],
      publication: ['Projects, publications and thesis by Walker Chi, from sparse linear algebra to language models.', '迟明远的项目、论文与硕士研究：稀疏线性代数、可微仿真与语言模型。'],
      about: ['Work, education and background of Walker Chi (Mingyuan Chi).', '迟明远的工作经历、教育背景与个人介绍。']
    };
    if (descriptions[kind]) {
      const description = descriptions[kind][next === 'zh' ? 1 : 0];
      document.querySelectorAll('meta[name="description"],meta[property="og:description"]').forEach(el => el.content = description);
      document.querySelectorAll('meta[property="og:title"]').forEach(el => el.content = document.title);
    }
    themeLabel();
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
      write('walker-language', next);
    }
  }

  const requested = new URL(location.href).searchParams.get('lang');
  const saved = read('walker-language');
  const preferred = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  setLanguage(validLanguage(requested) ? requested : validLanguage(saved) ? saved : preferred);
  if (validLanguage(requested)) write('walker-language', requested);
  document.querySelector('.language-switch').hidden = false;
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLanguage, true)));
  body.dataset.mdColorScheme = read('walker-theme') === 'slate' ? 'slate' : 'default';
  themeButton.hidden = false;
  themeLabel();
  themeButton.addEventListener('click', () => {
    body.dataset.mdColorScheme = body.dataset.mdColorScheme === 'slate' ? 'default' : 'slate';
    write('walker-theme', body.dataset.mdColorScheme);
    themeLabel();
  });
  addEventListener('popstate', () => {
    const query = new URL(location.href).searchParams.get('lang');
    setLanguage(validLanguage(query) ? query : language);
  });
})();
