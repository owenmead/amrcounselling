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
