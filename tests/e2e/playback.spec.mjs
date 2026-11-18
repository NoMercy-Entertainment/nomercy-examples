import { expect, test } from '@playwright/test';

import { buildMediaList } from './media-list.mjs';

// E2E_PAGES narrows the run to some pages, E2E_PLANT turns the first video url into a 404 to prove the check can fail.
const pages = process.env.E2E_PAGES?.split(',');
const plant = process.env.E2E_PLANT === '1';
const list = buildMediaList().filter(item => !pages || pages.includes(item.page));

const MIN_ADVANCE = 2;

for (const item of list) {
	test(`${item.page} #${item.index} ${item.title}`, async ({ page, browserName }) => {
		const row = { file: item.url, page: item.page, browser: browserName, pass: false, currentTime: 0, error: null };
		test.info().annotations.push({ type: 'result', description: '' });
		const record = () => { test.info().annotations.find(a => a.type === 'result').description = JSON.stringify(row); };

		if (plant && item.page === '/videoplayer' && item.index === 0)
			await page.route(item.url, route => route.fulfill({ status: 404, body: 'planted' }));

		try {
			await page.goto(item.page.endsWith('.html') ? item.page : `${item.page}`, { waitUntil: 'domcontentloaded' });
			await page.waitForFunction(() => window.player && document.querySelector('video'), null, { timeout: 30_000 });

			const result = await page.evaluate(async ({ index, window: waitMs, min }) => {
				const video = document.querySelector('video');
				video.muted = true;
				let mediaError = null;
				video.addEventListener('error', () => { mediaError = video.error?.message || `media error ${video.error?.code}`; });
				window.player.on?.('fatal', e => { mediaError ??= e?.message ?? 'fatal'; });
				await window.player.item(index, { autoplay: true });
				video.muted = true;
				await video.play().catch(() => {});
				const started = performance.now();
				let start = null;
				while (performance.now() - started < waitMs) {
					await new Promise(r => setTimeout(r, 250));
					if (mediaError) break;
					if (video.currentTime > 0 && start === null) start = video.currentTime;
					if (start !== null && video.currentTime - start >= min) break;
				}
				return { currentTime: video.currentTime, advanced: start === null ? 0 : video.currentTime - start, mediaError };
			}, { index: item.index, window: 25_000, min: MIN_ADVANCE });

			row.currentTime = result.currentTime;
			row.error = result.mediaError;
			row.pass = !result.mediaError && result.advanced >= MIN_ADVANCE;
			if (!row.pass && !row.error) row.error = `currentTime advanced ${result.advanced.toFixed(2)} s`;
		}
		catch (error) {
			row.error = String(error.message).split('\n')[0];
		}
		record();
		expect(row.error, `${browserName} ${item.url}`).toBeNull();
		expect(row.pass).toBe(true);
	});
}

test.describe('twitch page', () => {
	test('a typed channel loads the Twitch embed for that channel', async ({ page, browserName }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		const row = { file: '/twitch', page: '/twitch', browser: browserName, pass: false, currentTime: 0, error: null };
		test.info().annotations.push({ type: 'result', description: '' });
		const channel = 'twitch';
		try {
			await page.goto('/twitch');
			await page.fill('#twitch-channel', channel);
			await page.click('#twitch-play');
			const src = await page.waitForFunction(() => document.querySelector('iframe[src*="player.twitch.tv"]')?.src ?? null, null, { timeout: 30_000 }).then(h => h.jsonValue());
			const url = new URL(src);
			const loaded = url.searchParams.get('channel') === channel && url.searchParams.get('parent') === '127.0.0.1';
			const offline = await page.locator('#twitch-message').innerText();
			row.pass = loaded;
			row.error = loaded ? null : `iframe src ${src}`;
			row.currentTime = 0;
			row.file = `/twitch channel=${channel} ${offline ? `message="${offline}"` : ''}`.trim();
		}
		catch (error) {
			row.error = String(error.message).split('\n')[0];
		}
		test.info().annotations.find(a => a.type === 'result').description = JSON.stringify(row);
		expect(row.pass, row.error ?? '').toBe(true);
	});

	test('an invalid channel shows a message and loads no embed', async ({ page }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		await page.goto('/twitch');
		await page.fill('#twitch-channel', 'no');
		await page.click('#twitch-play');
		await expect(page.locator('#twitch-message')).toContainText('Enter a channel name');
		await expect(page.locator('iframe[src*="player.twitch.tv"]')).toHaveCount(0);
	});
});
