# Launch checklist

Moving amrcounselling.ca from the GitHub Pages placeholder to the Cloudflare
site (currently testable at https://amrcounselling.owenmead.workers.dev/).

## Before cutover

- [ ] Real content from Ashley in place; test pages ("Another Page") and test
      headings removed
- [ ] Real Jane booking link in Site Settings
- [ ] Email works: Google Workspace MX records added, or the footer address changed
- [ ] Ashley added as a Tina Cloud user and has done a test edit
- [ ] Tina read-only token rotated (old one appeared in a screenshot) and the
      Cloudflare `TINA_TOKEN` build variable updated

## Cutover

- [ ] Move DNS to Cloudflare: add the zone, recreate the existing records
      (Google site-verification TXT, `gv-*.dv.googlehosted.com` CNAME, MX),
      then switch nameservers at IONOS
- [ ] Attach `amrcounselling.ca` and `www.amrcounselling.ca` to the Worker as
      custom domains
- [ ] Add both domains to Tina Cloud → Configure → Site URLs
- [ ] Confirm the site and `/admin` login work on the real domain

## After cutover

- [ ] Disable GitHub Pages and delete `CNAME`
- [ ] **Make the repo private** (`gh repo edit owenmead/amrcounselling
      --visibility private --accept-visibility-change-consequences`).
      Only after cutover: going private deletes the GitHub Pages site, which
      takes the placeholder down. Afterwards push a commit and confirm the
      Cloudflare build and Tina Cloud still have access.
- [ ] Submit the sitemap in Google Search Console
