// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// Every page prerenders to static HTML. The one on-demand route,
// /tina-island/[name], powers live preview in the editor and runs as a
// Cloudflare Worker.
export default defineConfig({
	site: process.env.SITE_URL || 'https://amrcounselling.ca',
	output: 'static',
	// Images are processed at build time (no Cloudflare Images binding), and
	// sessions are unused, so don't provision a KV namespace for them.
	adapter: cloudflare({ imageService: 'compile' }),
	session: { driver: sessionDrivers.lruCache() },
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin') }), tina()],
	build: { inlineStylesheets: 'always' },
	vite: {
		plugins: [tinaAdminDevRedirect()],
		ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
	},
});
