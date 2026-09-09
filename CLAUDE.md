# CLAUDE.md

Single-page static site for **amrcounselling.ca**. Plain HTML/CSS, no build step,
no dependencies, no tests.

## Layout

```
index.html                     the entire site — inline <style>, no assets
CNAME                          amrcounselling.ca (GitHub Pages reads this every deploy)
.github/workflows/deploy.yml   push to main → live in ~30-60s
```

## Deploying

Push to `main`. That's it. The workflow uploads the repo root via
`actions/upload-pages-artifact` and publishes with `actions/deploy-pages`.
Check a deploy with `gh run list -R owenmead/amrcounselling`.

There is no local dev server and none is needed — open `index.html` directly.

## Things that will bite you

- **Don't delete or rename `CNAME`.** Losing it drops the custom domain on the
  next deploy and the site starts 404ing at amrcounselling.ca.
- **The repo must stay public.** GitHub Pages on a private repo requires GitHub
  Pro. Making it private silently breaks hosting.
- **`index.html` still ships a placeholder contact address** (`hello@amrcounselling.ca`)
  and "coming soon" copy. Replace both when real content exists.
- **Never invent counselling credentials, qualifications, registrations, or
  service claims.** This is a real practitioner's site; that copy comes from the
  owner, not from a model.

## If a build step gets added later

Insert the build before the `upload-pages-artifact` step in `deploy.yml` and
change its `path:` from `.` to the output dir (e.g. `dist`). `CNAME` must end up
*inside* that output dir — usually by moving it to `public/`.

## DNS / email

Registrar nameservers are IONOS (`ns*.ui-dns.*`); DNS is edited in the IONOS
panel, not here. Apex + `www` point at GitHub Pages' four A and four AAAA
addresses — verify current values against `gh api meta -q '.pages[]'` rather
than from memory, and ignore the legacy `192.30.252.*` entries that API also
returns.

Google Workspace is being set up on this domain (site-verification TXT and a
`gv-*.dv.googlehosted.com` CNAME are in place). Mail will not work until MX
records are added — as of the last session there were none.
