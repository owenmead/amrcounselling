/**
 * Makes web-sized copies of everything in public/uploads/ (the originals
 * Ashley uploads through Tina, kept as-is in git).
 *
 *   public/uploads/beach.png  →  public/_img/beach-800.webp, -1200, -1600, …
 *   src/generated/images.json →  { "/uploads/beach.png": { width, height, variants } }
 *
 * Photo.astro reads the manifest to emit a srcset. Both outputs are
 * gitignored and rebuilt by `pnpm dev` / `pnpm build`; unchanged images are
 * skipped, so reruns are quick.
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/uploads';
const OUT = 'public/_img';
const MANIFEST = 'src/generated/images.json';
const WIDTHS = [480, 800, 1200, 1600, 2400];
const RASTER = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else if (RASTER.test(entry.name)) yield full;
	}
}

const isFresh = async (out, srcMtime) => (await stat(out).catch(() => null))?.mtimeMs >= srcMtime;

const manifest = {};
let made = 0;
for await (const file of walk(SRC)) {
	const rel = path.relative(SRC, file);
	const base = rel.replace(/\.[^.]+$/, '').split(path.sep).join('/');
	const srcMtime = (await stat(file)).mtimeMs;
	// .rotate() applies EXIF orientation so phone photos aren't sideways.
	const meta = await sharp(file).rotate().metadata();
	const { width, height } = meta.autoOrient ?? meta;
	const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])];

	const variants = [];
	for (const w of widths) {
		const out = path.join(OUT, `${base}-${w}.webp`);
		if (!(await isFresh(out, srcMtime))) {
			await mkdir(path.dirname(out), { recursive: true });
			await sharp(file).rotate().resize({ width: w }).webp({ quality: 78 }).toFile(out);
			made++;
		}
		variants.push({ w, src: `/_img/${base}-${w}.webp` });
	}
	manifest[`/uploads/${rel.split(path.sep).join('/')}`] = { width, height, variants };
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, '\t') + '\n');
console.log(`images: ${Object.keys(manifest).length} source(s), ${made} new variant(s)`);
