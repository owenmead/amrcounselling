import type { Collection, TinaField } from 'tinacms';
import { shortText } from '../fields';

/** "src/content/page/about.mdx" → "about", for list labels in the editor. */
const pageName = (path?: string) => path?.split('/').pop()?.replace(/\.mdx$/, '');

/** A menu link: pick a page from the list, or type an address for anything else. */
const menuLinkFields: TinaField[] = [
	{ type: 'string', name: 'label', label: 'Text', description: 'Leave blank to use the page title.' },
	{
		type: 'reference',
		name: 'page',
		label: 'Page',
		collections: ['page'],
		description: 'Pick a page on this site from the list.',
	},
	{
		type: 'string',
		name: 'link',
		label: 'Or a web address',
		description: 'Only if this isn’t a page on this site, e.g. https://… (ignored when a page is picked).',
	},
];

export const SettingsCollection: Collection = {
	name: 'settings',
	label: 'Site Settings',
	path: 'src/content/config',
	format: 'json',
	ui: {
		global: true,
		allowedActions: { create: false, delete: false },
	},
	fields: [
		{ type: 'string', name: 'siteName', label: 'Practice name', required: true },
		{
			type: 'string',
			name: 'tagline',
			label: 'Tagline',
			description: 'Short line shown under the name in the footer, e.g. your credentials or approach.',
		},
		{ type: 'image', name: 'logo', label: 'Logo (optional)' },
		{
			type: 'string',
			name: 'bookingUrl',
			label: 'Booking link (Jane)',
			description: 'Your Jane booking page. Any button with an empty link uses this.',
		},
		{ type: 'string', name: 'bookingLabel', label: 'Booking button text', description: 'Shown in the top menu.' },
		{
			type: 'object',
			name: 'nav',
			label: 'Top menu',
			list: true,
			ui: { itemProps: (item: { label?: string; page?: string }) => ({ label: item?.label || pageName(item?.page) || 'Menu item' }) },
			fields: [
				...menuLinkFields,
				{
					type: 'object',
					name: 'children',
					label: 'Drop-down items (optional)',
					list: true,
					ui: { itemProps: (item: { label?: string; page?: string }) => ({ label: item?.label || pageName(item?.page) || 'Item' }) },
					fields: menuLinkFields,
				},
			],
		},
		{
			type: 'object',
			name: 'footer',
			label: 'Footer',
			fields: [
				{ type: 'string', name: 'email', label: 'Email' },
				{ type: 'string', name: 'phone', label: 'Phone' },
				{ type: 'string', name: 'location', label: 'Location', ui: { component: 'textarea' } },
				shortText('acknowledgement', 'Land acknowledgement'),
				{
					type: 'string',
					name: 'crisisNote',
					label: 'Crisis note',
					description: 'Shown small at the very bottom of every page.',
					ui: { component: 'textarea' },
				},
				{
					type: 'object',
					name: 'badges',
					label: 'Membership logos',
					list: true,
					ui: { itemProps: (item: { alt?: string }) => ({ label: item?.alt || 'Logo' }) },
					fields: [
						{ type: 'image', name: 'src', label: 'Logo' },
						{ type: 'string', name: 'alt', label: 'Organisation name' },
						{ type: 'string', name: 'link', label: 'Link (optional)' },
					],
				},
			],
		},
	],
};
