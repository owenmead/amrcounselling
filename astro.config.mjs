// @ts-check
import { defineConfig } from 'astro/config';
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
	adapter: cloudflare(),
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin') }), tina()],
	build: { inlineStylesheets: 'always' },
	vite: {
		plugins: [tinaAdminDevRedirect()],
		ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
	},
});
