// Keep the shared profile on the root URL across every Hexo rebuild.
// The original blog index remains at /blog.html; post URLs are unchanged.
const fs = require('node:fs');
const path = require('node:path');
hexo.extend.filter.register('after_generate', async function () {
  const bundle = path.join(hexo.base_dir, 'profile-export');
  const homepage = fs.readFileSync(path.join(bundle, 'index.html'));
  const original = hexo.route.get('index.html');
  if (original) {
    const chunks = [];
    for await (const chunk of original) chunks.push(Buffer.from(chunk));
    const blog = Buffer.concat(chunks);
    // Repeated watch builds may already contain our homepage.
    if (!blog.includes(Buffer.from('id="profile-name"'))) hexo.route.set('blog.html', blog);
  }
  hexo.route.set('index.html', homepage);
  for (const name of ['profile.css', 'Walker_Chi_Research_CV_EN.pdf']) {
    hexo.route.set('profile/' + name, fs.readFileSync(path.join(bundle, name)));
  }
});
