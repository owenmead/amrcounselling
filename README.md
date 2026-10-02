# amrcounselling.ca

Astro site edited through TinaCMS, hosted on Cloudflare Workers.

```sh
pnpm install
pnpm dev          # site: http://localhost:4321  editor: http://localhost:4321/admin
```

Content lives in this repo: pages in `src/content/page/`, site settings in
`src/content/config/config.json`, images in `public/uploads/`. Edits made in the
hosted editor are committed here by Tina Cloud; Cloudflare rebuilds on push.

See `CLAUDE.md` for structure and gotchas.
