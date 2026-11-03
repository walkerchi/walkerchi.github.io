// Preserve the profile, logos, and complete article directory on every rebuild.
const fs = require('node:fs');
const path = require('node:path');
hexo.extend.filter.register('after_generate', async function () {
  const bundle = path.join(hexo.base_dir, 'profile-export');
  const original = hexo.route.get('index.html');
  if (original) {
    const chunks = [];
    for await (const chunk of original) chunks.push(Buffer.from(chunk));
    const blog = Buffer.concat(chunks);
    if (!blog.includes(Buffer.from('id="profile-name"'))) hexo.route.set('blog.html', blog);
  }
  const decorate = require('./legacy-theme.cjs').decorator(bundle);
  for (const route of hexo.route.list().filter(name => name.endsWith('.html'))) {
    const stream = hexo.route.get(route);
    const chunks = [];
    for await (const chunk of stream) chunks.push(Buffer.from(chunk));
    hexo.route.set(route, decorate(Buffer.concat(chunks).toString('utf8')));
  }
  function register(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = prefix + entry.name;
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) register(source, name + '/');
      else {
        if (name === 'legacy-header.html') continue;
        const pages = { 'index.html': 'index.html', 'articles.html': 'articles/index.html', 'blog.html': 'blog/index.html', 'publication.html': 'publication/index.html', 'about.html': 'about/index.html' };
        const route = pages[name] || 'profile/' + name;
        hexo.route.set(route, fs.readFileSync(source));
      }
    }
  }
  register(bundle);
});
