/**
 * Island registry: every region the visual editor can live-refresh.
 * The /tina-island/[name] route renders these on demand while editing.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PageQuery, SettingsQuery } from '../../tina/__generated__/types';
import type { Page, Settings } from './data';
import PageBody from '../components/islands/PageBody.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getPage, getSettings } from './data';

const settingsProps = (data: unknown) => ({
	settings: (data as QueryResult<SettingsQuery>).data?.settings as Settings | undefined,
});

export const islands: IslandRegistry = {
	page: {
		fetch: async (_request, params) => {
			const slug = params.get('slug') ?? 'home';
			const [page, settings] = await Promise.all([getPage(slug), getSettings()]);
			return { ...page, settings: settings.data?.settings };
		},
		component: PageBody,
		wrapper: { tag: 'main', className: 'page' },
		propsFromData: (data) => ({
			data: (data as QueryResult<PageQuery>).data?.page as Page | undefined,
			settings: (data as { settings?: Settings }).settings,
		}),
	},
	header: {
		fetch: () => getSettings(),
		component: Header,
		wrapper: { tag: 'div' },
		propsFromData: settingsProps,
	},
	footer: {
		fetch: () => getSettings(),
		component: Footer,
		wrapper: { tag: 'div' },
		propsFromData: settingsProps,
	},
};
