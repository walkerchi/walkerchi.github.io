/* The two languages are rendered in HTML; original article bodies stay untouched. */
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const directory = Boolean(document.querySelector('.article-directory'));
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
    document.querySelector('meta[name="theme-color"]').content = dark ? '#12171e' : '#fcfcfd';
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
    document.title = next === 'zh'
      ? (directory ? '文章与笔记 — 迟明远 Walker Chi' : '迟明远 Walker Chi — 经历、项目与文章')
      : (directory ? 'Articles & Notes — Walker Chi' : 'Walker Chi — Experience, Projects & Writing');
    const description = next === 'zh'
      ? (directory ? '迟明远的 20 篇原始博客文章：太空电梯、聚变能源、机器人、数学与物理。' : '迟明远：在 Moonshot AI 与 MiniMax 的大模型工程经历、教育背景、项目与科学写作。')
      : (directory ? 'All 20 original blog articles by Walker Chi: space elevators, fusion energy, robotics, mathematics and physics.' : 'Walker Chi: LLM and multimodal engineering experience at Moonshot AI and MiniMax, education, projects, and writing about science.');
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
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
