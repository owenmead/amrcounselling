import { sanitizeHref } from '@tinacms/astro/sanitize';

/** Normalise an editor-typed link: "about" → "/about", "www.x.com" → "https://www.x.com". */
export function resolveLink(value: string | null | undefined, fallback?: string | null): string {
	let link = (value || fallback || '').trim();
	if (!link) return '#';
	if (/^www\./i.test(link)) link = `https://${link}`;
	else if (/^[\w-]+(\/[\w-]*)*$/.test(link)) link = `/${link}`;
	return sanitizeHref(link, '#');
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Minimal shape of a page picked through a Tina reference field. */
type PageRef = { hidden?: boolean | null; _sys?: { filename: string; breadcrumbs: string[] } } | null | undefined;

/** URL of a referenced page: home → "/", others → "/about". */
export function pageHref(page: PageRef): string | null {
	if (!page?._sys) return null;
	return page._sys.filename === 'home' ? '/' : `/${page._sys.breadcrumbs.join('/')}`;
}

/**
 * Resolve a menu item: a picked page wins over a typed address. Items that
 * point at a hidden page are dropped (returns null) so the menu never links
 * to a page that isn't on the live site.
 */
export function menuHref(item: { page?: unknown; link?: string | null }): string | null {
	const page = item.page as PageRef;
	if (page) return page.hidden ? null : pageHref(page);
	return item.link ? resolveLink(item.link) : null;
}
