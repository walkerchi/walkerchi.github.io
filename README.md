# Walker Chi — personal website

Live: https://walkerchi.github.io/
GitHub Pages publishes `chi-s-page-3:/docs`.

The homepage shares its source with `walker-cms`. Edit `walker-cms/overrides/partials/profile.html` and `walker-cms/docs/assets/stylesheets/profile.css`, then run:

```sh
python /path/to/walker-cms/scripts/export_profile.py /path/to/walkerchi.github.io
```

The export updates `profile-export/` and `docs/`, preserving the original blog homepage as `docs/blog.html`. Existing posts, archives, categories and assets keep their URLs. `scripts/profile.js` reapplies the profile after every Hexo generation, including `npm run build` and the development server.

The PDF is the user-approved research CV. Source content and the download must be updated together. The latest employer dates are Apr–Sep 2026; do not describe that role as current.

Review and commit generated `docs/`, `profile-export/`, and source changes together, then push `chi-s-page-3` to publish. No DNS or GitHub Pages configuration changes are necessary.

The top navigation links to `/articles/`, the complete directory of all 20 original posts. Its maintained source is `walker-cms/data/articles.json`; original article URLs and `/blog.html` remain valid. The homepage now leads with experience and education. Official transparent logo provenance is recorded in `walker-cms/data/logo-sources.json`; assets are exported locally under `profile/logos/` and reapplied on Hexo rebuilds.


The homepage and archive now use the shared bilingual magazine shell. `?lang=en` and `?lang=zh` override saved language preferences; EN / 中文 controls update the page language, accessibility labels and metadata. Original articles keep their original languages and URLs. English HTML remains readable without JavaScript. Edit translations in the shared Jinja partials and behavior in `walker-cms/docs/assets/javascripts/profile.js`, then export; `profile-export/profile.js` is the generated browser script, distinct from Hexo's `scripts/profile.js` build hook.

The shared export now also owns `/publication/` and `/about/`. It restores all 20 original archive cover images and adds project figures. `scripts/legacy-theme.cjs` injects the shared header and versioned CSS/JS into original posts, archives, tags, categories and paginated blog pages, preserving article HTML inside `.markdown-body` verbatim. It runs from the export script and Hexo's `after_generate` hook. Keep original post content and routes intact when changing chrome. The legacy Markdown files for About and Publications are minimal current fallbacks; edit the shared CMS partials/data for the published pages.

Blog is now the primary directory at `/blog/`; `/articles/` is a compatibility alias with the same canonical URL. Preserve `/blog.html` as the original paginated blog view. The bundle's `blog.html` maps to `/blog/index.html`. The shared project list leads with `tiga-lang` (Alpha), linking its code, localized docs and technical-report manuscript; the report is separate from published papers.

The home page's interactive LLM-attention/physics-mesh/compiler-graph sketches come from the CMS `field.html` partial and `field.js`. Regenerate with the shared exporter; the Hexo bundle publishes the script under `/profile/field.js`. Other pages do not load the animation. Preserve its SVG fallback, bilingual scene descriptions and reduced-motion behavior.

The compiler scene now follows one node through message creation, directed-edge delivery, sum aggregation and state update. Its four step buttons pause at a chosen stage; Play resumes the loop. These controls also work when reduced motion is enabled.
