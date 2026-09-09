# amrcounselling.ca

Single-page static site. Plain HTML/CSS, no build step.

## Deploying

Push to `main`. The `Deploy to GitHub Pages` workflow publishes the repo root
to GitHub Pages; live in roughly 30-60 seconds.

## Adding a build step later

Edit `.github/workflows/deploy.yml`: add your build commands before the
`upload-pages-artifact` step and change its `path` from `.` to the build
output directory (e.g. `dist`). Move `index.html` into a source dir at the
same time. `CNAME` must end up inside the published directory — with a build,
copy it there (e.g. put it in `public/`).

## Custom domain

`CNAME` pins the domain to `amrcounselling.ca`. Don't delete it — GitHub reads
it on every deploy.
