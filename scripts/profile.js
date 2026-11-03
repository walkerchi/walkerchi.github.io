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
  function register(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = prefix + entry.name;
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) register(source, name + '/');
      else {
        const route = name === 'index.html' ? 'index.html'
          : name === 'articles.html' ? 'articles/index.html' : 'profile/' + name;
        hexo.route.set(route, fs.readFileSync(source));
      }
    }
  }
  register(bundle);
});
