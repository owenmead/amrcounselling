/**
 * Regenerates the block-picker thumbnails in public/block-previews/.
 * Run with the dev server up:  pnpm dev  (then)  pnpm thumbnails
 *
 * Screenshots each block on /dev/blocks with your installed Chrome, so the
 * thumbnails always match the real design. Rerun after changing a block's look.
 */
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const BASE = process.env.SITE ?? 'http://localhost:4321';
const OUT = 'public/block-previews';
const CHROME = [
	process.env.CHROME_PATH,
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error('Chrome not found; set CHROME_PATH');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
	const page = await browser.newPage();
	await page.setViewport({ width: 1040, height: 900, deviceScaleFactor: 1 });
	await page.goto(`${BASE}/dev/blocks`, { waitUntil: 'networkidle0' });
	await page.evaluate(() => document.fonts.ready);
	// Hide Astro's dev toolbar so it doesn't end up in the screenshots.
	await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });

	for (const el of await page.$$('[data-block]')) {
		const name = await el.evaluate((node) => node.getAttribute('data-block'));
		const box = await el.boundingBox();
		// Cap very tall blocks so every thumbnail has a similar shape.
		const clip = { x: 0, y: box.y, width: box.width, height: Math.min(box.height, 640) };
		const png = await page.screenshot({ clip, captureBeyondViewport: true });
		await sharp(png).resize({ width: 640 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
		console.log(`${OUT}/${name}.jpg`);
	}
} finally {
	await browser.close();
}
