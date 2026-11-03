// Apply shared navigation without reserializing article HTML, formulas or embeds.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
function decorator(bundle) {
  const header = fs.readFileSync(path.join(bundle, 'legacy-header.html'), 'utf8');
  const version = name => crypto.createHash('sha256').update(fs.readFileSync(path.join(bundle, name))).digest('hex').slice(0, 12);
  const assets = `<!-- walker-assets:start --><link rel="stylesheet" href="/profile/profile.css?v=${version('profile.css')}"><link rel="stylesheet" href="/profile/legacy.css?v=${version('legacy.css')}"><script src="/profile/profile.js?v=${version('profile.js')}" defer></script><!-- walker-assets:end -->`;
  return html => {
    if (!/<body\b/i.test(html) || /data-page-kind="(?:home|blog|articles|publication|about)"/.test(html)) return html;
    html = html.replace(/<!-- walker-assets:start -->[\s\S]*?<!-- walker-assets:end -->/g, '')
      .replace(/<!-- walker-chrome:start -->[\s\S]*?<!-- walker-chrome:end -->/g, '');
    html = html.replace('</head>', assets + '</head>');
    html = html.replace(/<body([^>]*)>/i, (_, attrs) => '<body' + attrs.replace(/\sdata-(?:page-kind|md-color-scheme)="[^"]*"/g, '') + ' data-page-kind="legacy" data-md-color-scheme="default"><!-- walker-chrome:start -->' + header + '<!-- walker-chrome:end -->');
    return html;
  };
}
module.exports = { decorator };
if (require.main === module) {
  const [root,bundle] = process.argv.slice(2);
  const decorate = decorator(bundle);
  let count = 0;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
      const file = path.join(dir,entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        const old = fs.readFileSync(file,'utf8'), next = decorate(old);
        if (next !== old) { fs.writeFileSync(file,next); count++; }
      }
    }
  }
  walk(root);
  process.stdout.write(`Updated shared chrome on ${count} original HTML pages.\n`);
}
