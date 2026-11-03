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
