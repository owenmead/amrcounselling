import { defineConfig } from 'tinacms';
import { PageCollection } from './collections/page';
import { SettingsCollection } from './collections/settings';

// Cloudflare Workers Builds exposes the branch being built.
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.WORKERS_CI_BRANCH ||
	process.env.CF_PAGES_BRANCH ||
	'main';

export default defineConfig({
	branch,
	clientId: process.env.PUBLIC_TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,
	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	// Uploaded images are committed to the repo under public/uploads/.
	media: {
		tina: {
			mediaRoot: 'uploads',
			publicFolder: 'public',
		},
	},
	schema: {
		collections: [PageCollection, SettingsCollection],
	},
});
