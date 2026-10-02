import type { Collection } from 'tinacms';

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
			ui: { itemProps: (item: { label?: string }) => ({ label: item?.label || 'Menu item' }) },
			fields: [
				{ type: 'string', name: 'label', label: 'Text' },
				{ type: 'string', name: 'link', label: 'Link', description: 'e.g. /about' },
				{
					type: 'object',
					name: 'children',
					label: 'Drop-down items (optional)',
					list: true,
					ui: { itemProps: (item: { label?: string }) => ({ label: item?.label || 'Item' }) },
					fields: [
						{ type: 'string', name: 'label', label: 'Text' },
						{ type: 'string', name: 'link', label: 'Link' },
					],
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
				{ type: 'rich-text', name: 'acknowledgement', label: 'Land acknowledgement' },
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
