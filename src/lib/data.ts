/**
 * Tina data loaders. Wrapping with requestWithMetadata() lets the visual
 * editor map clicks on the page back to fields (see tinaField()).
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getSettings = () =>
	requestWithMetadata(client.queries.settings({ relativePath: 'config.json' }));

export const getPage = (slug: string) =>
	requestWithMetadata(client.queries.page({ relativePath: `${slug}.mdx` }), { priority: 'primary' });

export async function listPages() {
	const result = await client.queries.pageConnection({ first: 1000 });
	return (result.data.pageConnection.edges ?? []).flatMap((edge) => (edge?.node ? [edge.node] : []));
}

export type Settings = Awaited<ReturnType<typeof getSettings>>['data']['settings'];
export type Page = Awaited<ReturnType<typeof getPage>>['data']['page'];
export type PageBlock = NonNullable<NonNullable<Page['blocks']>[number]>;
type Block<T extends PageBlock['__typename']> = Extract<PageBlock, { __typename: T }>;

export type HeroBlock = Block<'PageBlocksHero'>;
export type TextImageBlock = Block<'PageBlocksTextImage'>;
export type RichTextBlock = Block<'PageBlocksRichText'>;
export type CardsBlock = Block<'PageBlocksCards'>;
export type ImageBandBlock = Block<'PageBlocksImageBand'>;
export type QuotesBlock = Block<'PageBlocksQuotes'>;
export type CallToActionBlock = Block<'PageBlocksCallToAction'>;
export type ContactBlock = Block<'PageBlocksContact'>;

/** Structural shapes shared by every block (Tina generates a distinct __typename per block). */
export type ButtonData = { label?: string | null; link?: string | null; style?: string | null };
export type ImageData = { src?: string | null; alt?: string | null };
