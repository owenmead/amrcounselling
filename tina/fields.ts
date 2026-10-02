/**
 * Shared field definitions for the page-builder blocks.
 *
 * The design system lives here as much as in CSS: every option Ashley sees
 * is a deliberate, limited choice (a tone, a side, a column count) rather
 * than a free-form colour or size.
 */
import type { TinaField } from 'tinacms';

export const imageField = (label = 'Image', description?: string): TinaField => ({
	type: 'object',
	name: 'image',
	label,
	description,
	fields: [
		{ type: 'image', name: 'src', label: 'Photo' },
		{
			type: 'string',
			name: 'alt',
			label: 'Describe the photo',
			description:
				'One short sentence for people using screen readers, e.g. "Ashley sitting in her counselling office". Also helps Google.',
		},
	],
});

export const buttonFields: TinaField[] = [
	{ type: 'string', name: 'label', label: 'Button text' },
	{
		type: 'string',
		name: 'link',
		label: 'Link',
		description:
			'Another page on this site (e.g. /about), a full web address, or mailto:you@example.com. Leave blank to use the booking link from Site Settings.',
	},
	{
		type: 'string',
		name: 'style',
		label: 'Style',
		options: [
			{ label: 'Main (filled)', value: 'primary' },
			{ label: 'Secondary (outline)', value: 'secondary' },
		],
	},
];

export const buttonsField: TinaField = {
	type: 'object',
	name: 'buttons',
	label: 'Buttons',
	list: true,
	ui: {
		max: 2,
		itemProps: (item: { label?: string }) => ({ label: item?.label || 'Button' }),
		defaultItem: { label: 'Book a session', style: 'primary' },
	},
	fields: buttonFields,
};

export const toneField: TinaField = {
	type: 'string',
	name: 'tone',
	label: 'Background',
	description: 'Alternate backgrounds between sections to give the page rhythm.',
	options: [
		{ label: 'Plain', value: 'plain' },
		{ label: 'Soft', value: 'soft' },
		{ label: 'Accent', value: 'accent' },
	],
};

export const headingField: TinaField = { type: 'string', name: 'heading', label: 'Heading' };
