/**
 * Stand-in for the `shiki` code highlighter in the deployed bundle.
 *
 * Astro's config schema imports shiki's theme list, and the editor's
 * live-preview route (built on Astro's container API) validates a config —
 * which dragged every shiki grammar (~2 MB gzipped) into the Worker. Page
 * text is rendered by Tina, never by Astro's Markdown, so nothing here is
 * ever called. Aliased in astro.config.mjs.
 */
const unused = () => {
	throw new Error('Syntax highlighting is not available in this build (see src/lib/shiki-stub.js).');
};

// Keys must include Astro's default theme so the config schema can build its enum.
export const bundledThemes = { 'github-dark': unused, 'github-light': unused };
export const bundledLanguages = {};
export const createHighlighter = unused;
export const codeToHtml = unused;
export const createCssVariablesTheme = unused;
export const isSpecialLang = () => false;
export const createOnigurumaEngine = unused;
export default {};
