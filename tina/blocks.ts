/**
 * Page-builder blocks. Each template here has a matching component in
 * src/components/blocks/ and a case in Blocks.astro.
 *
 * Add a block: template here → add to `blockTemplates` → component → case
 * in Blocks.astro → sample in src/pages/dev/blocks.astro → `pnpm thumbnails`.
 */
import type { Template } from 'tinacms';
import { buttonsField, headingField, imageField, longText, shortText, toneField } from './fields';

/** Default value for a rich-text field (Tina expects its document shape, not a string). */
const paragraph = (text: string) => ({ type: 'root', children: [{ type: 'p', children: [{ type: 'text', text }] }] });

// Picker thumbnails live in public/block-previews/. Regenerate with
// `pnpm thumbnails` (dev server running) after changing a block's look.
const preview = (name: string) => `/block-previews/${name}.jpg`;

const hero: Template = {
	name: 'hero',
	label: 'Hero (page opener)',
	fields: [
		headingField,
		shortText('text', 'Text'),
		imageField('Image', 'Fills the width of the screen, so use a large photo: at least 2400 pixels wide, ideally the original from the camera or phone.'),
		{
			type: 'string',
			name: 'layout',
			label: 'Layout',
			options: [
				{ label: 'Photo behind the text', value: 'background' },
				{ label: 'Portrait beside the text', value: 'portrait' },
				{ label: 'Text only', value: 'text' },
			],
		},
		buttonsField,
	],
	ui: {
		previewSrc: preview('hero'),
		defaultItem: {
			heading: 'A heading that welcomes people in',
			text: paragraph('One or two sentences that tell visitors they are in the right place.'),
			layout: 'background',
			buttons: [{ label: 'Book a session', style: 'primary' }],
		},
	},
};

const textImage: Template = {
	name: 'textImage',
	label: 'Text + Image',
	fields: [
		headingField,
		longText('body', 'Text'),
		imageField('Image'),
		{
			type: 'string',
			name: 'imageSide',
			label: 'Image side',
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Right', value: 'right' },
			],
		},
		{
			type: 'string',
			name: 'imageShape',
			label: 'Image shape',
			options: [
				{ label: 'Portrait (tall)', value: 'portrait' },
				{ label: 'Landscape (wide)', value: 'landscape' },
				{ label: 'Square', value: 'square' },
			],
		},
		buttonsField,
		toneField,
	],
	ui: {
		previewSrc: preview('textImage'),
		defaultItem: {
			heading: 'A heading for this section',
			imageSide: 'left',
			imageShape: 'portrait',
			tone: 'plain',
		},
	},
};

const richText: Template = {
	name: 'richText',
	label: 'Text',
	fields: [
		longText('body', 'Text', 'Sub-headings, paragraphs, lists and links.'),
		{
			type: 'string',
			name: 'align',
			label: 'Alignment',
			options: [
				{ label: 'Left', value: 'left' },
				{ label: 'Centred', value: 'center' },
			],
		},
		toneField,
	],
	ui: { previewSrc: preview('richText'), defaultItem: { align: 'left', tone: 'plain' } },
};

const cards: Template = {
	name: 'cards',
	label: 'Cards (services, approaches…)',
	fields: [
		headingField,
		shortText('intro', 'Intro'),
		{
			type: 'string',
			name: 'columns',
			label: 'Cards per row',
			options: [
				{ label: 'Two', value: '2' },
				{ label: 'Three', value: '3' },
			],
		},
		{
			type: 'object',
			name: 'items',
			label: 'Cards',
			list: true,
			ui: {
				itemProps: (item: { title?: string }) => ({ label: item?.title || 'Card' }),
				defaultItem: { title: 'Card title', text: paragraph('A sentence or two.') },
			},
			fields: [
				imageField('Image (optional)'),
				{ type: 'string', name: 'title', label: 'Title' },
				shortText('text', 'Text'),
				{ type: 'string', name: 'link', label: 'Link (optional)', description: 'e.g. /individual-counselling' },
			],
		},
		toneField,
	],
	ui: { previewSrc: preview('cards'), defaultItem: { heading: 'How I can help', columns: '3', tone: 'soft' } },
};

const imageBand: Template = {
	name: 'imageBand',
	label: 'Full-width Photo',
	fields: [
		imageField('Photo', 'Fills the width of the screen, so use a large photo: at least 2400 pixels wide, ideally the original from the camera or phone.'),
		{
			type: 'string',
			name: 'height',
			label: 'Height',
			options: [
				{ label: 'Short', value: 'short' },
				{ label: 'Tall', value: 'tall' },
			],
		},
	],
	ui: { previewSrc: preview('imageBand'), defaultItem: { height: 'short' } },
};

const quotes: Template = {
	name: 'quotes',
	label: 'Quotes',
	fields: [
		headingField,
		{
			type: 'object',
			name: 'items',
			label: 'Quotes',
			list: true,
			ui: {
				itemProps: (item: { attribution?: string }) => ({ label: item?.attribution || 'Quote' }),
			},
			fields: [
				{ type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
				{ type: 'string', name: 'attribution', label: 'Who said it' },
			],
		},
		toneField,
	],
	ui: { previewSrc: preview('quotes'), defaultItem: { tone: 'soft' } },
};

const callToAction: Template = {
	name: 'callToAction',
	label: 'Call to Action',
	fields: [
		headingField,
		shortText('text', 'Text'),
		buttonsField,
		toneField,
	],
	ui: {
		previewSrc: preview('callToAction'),
		defaultItem: {
			heading: 'Ready to take the first step?',
			buttons: [{ label: 'Book a session', style: 'primary' }],
			tone: 'accent',
		},
	},
};

const contact: Template = {
	name: 'contact',
	label: 'Contact',
	fields: [
		headingField,
		longText('body', 'Text'),
		{
			type: 'string',
			name: 'formUrl',
			label: 'Google Form link',
			description:
				'Optional. In Google Forms: Send → the <> tab → copy the address inside src="…". Leave blank to show buttons only.',
		},
		buttonsField,
		shortText('privacyNote', 'Privacy note', 'Shown just above the form.'),
		toneField,
	],
	ui: {
		previewSrc: preview('contact'),
		defaultItem: {
			heading: 'Get in touch',
			privacyNote: paragraph('Please don’t include personal or health details here. A short note and the best way to reach you is plenty.'),
			tone: 'plain',
		},
	},
};

export const blockTemplates: Template[] = [
	hero,
	textImage,
	richText,
	cards,
	imageBand,
	quotes,
	callToAction,
	contact,
];
