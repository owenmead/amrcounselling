import type { Collection } from 'tinacms';
import { blockTemplates } from '../blocks';

export const PageCollection: Collection = {
	name: 'page',
	label: 'Pages',
	path: 'src/content/page',
	format: 'mdx',
	ui: {
		// The file name is the page address: about.mdx → /about, home.mdx → /
		// The editor previews through the on-demand /preview route so new and
		// hidden pages work before the next static build.
		router: ({ document }) => `/preview/${document._sys.breadcrumbs.join('/')}`,
		filename: {
			description:
				'This becomes the page address, e.g. "about" → amrcounselling.ca/about. Lowercase words joined by dashes.',
			slugify: (values: { title?: string }) =>
				(values?.title ?? '')
					.toLowerCase()
					.normalize('NFKD')
					.replace(/[^a-z0-9\s-]/g, '')
					.trim()
					.replace(/\s+/g, '-'),
		},
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Page title',
			isTitle: true,
			required: true,
			description: 'Shown in the browser tab and in Google results.',
		},
		{
			type: 'string',
			name: 'description',
			label: 'Search description',
			description: 'One or two sentences shown under the title in Google results. Optional.',
			ui: { component: 'textarea' },
		},
		{
			type: 'boolean',
			name: 'hidden',
			label: 'Hide this page',
			description:
				'Hidden pages are left off the live site. Use this to work on a page over several sessions before publishing it.',
		},
		{
			type: 'object',
			list: true,
			name: 'blocks',
			label: 'Page sections',
			ui: { visualSelector: true },
			templates: blockTemplates,
		},
	],
};
