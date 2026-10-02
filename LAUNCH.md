# Launch checklist

Moving amrcounselling.ca from the GitHub Pages placeholder to the Cloudflare
site (currently testable at https://amrcounselling.owenmead.workers.dev/).

## Before cutover

- [ ] Real content from Ashley in place; test pages ("Another Page") and test
      headings removed
- [ ] Unused uploads deleted in Tina's media library (e.g.
      `placeholder-landscape.jpg`, `placeholder-water.jpg`) — they stay in git
      and get resized copies until removed
- [ ] Contact: Google Form created and linked in the Contact block (or decided
      against); crisis-line wording in the footer confirmed by Ashley
- [ ] Ashley has confirmed any BCACC / privacy requirements for the site
      (testimonials, credentials wording, privacy notice)
- [ ] Short editing guide for Ashley (log in, add a section, photos + focus,
      add a page to the menu, hide a page, Reset vs Save — the menu delete icon
      sits right next to edit)
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

## Later (not blocking launch)

- [ ] Band-shaped image copies for full-width photos: the short band shows a
      ~4:1 strip but serves the whole photo (`field-2400.webp` is 1.7 MB)
- [ ] Check whether renaming a page in Tina updates menu items that reference it
- [ ] Default social-share image and favicon/logo
- [ ] Cloudflare Web Analytics (free, no cookie banner)
- [ ] Before upgrading Astro/Tina: `@tinacms/astro` live preview is marked
      experimental, the `patches/` Tina CLI patch must still apply, and the
      Worker must stay under the free-plan size limit
