import { expect, test } from '@playwright/test';

import { buildMediaList } from './media-list.mjs';

// E2E_PAGES lists page names without a leading slash (videoplayer,musicplayer), so MSYS does not turn them into Windows paths.
// E2E_PLANT turns the first video url into a 404 to prove the check can fail.
const pages = process.env.E2E_PAGES?.split(',').map(name => `/${name.replace(/^\/+/u, '')}`);
const plant = process.env.E2E_PLANT === '1';
const list = buildMediaList().filter(item => !pages || pages.includes(item.page));

const MIN_ADVANCE = 2;

for (const item of list) {
	test(`${item.page} #${item.index} ${item.title}`, async ({ page, browserName }) => {
		const row = { file: item.url, page: item.page, browser: browserName, pass: false, currentTime: 0, error: null };
		test.info().annotations.push({ type: 'result', description: '' });
		const record = () => { test.info().annotations.find(a => a.type === 'result').description = JSON.stringify(row); };

		if (plant && ['/videoplayer', '/musicplayer'].includes(item.page) && item.index === 0)
			await page.route(item.url, route => route.fulfill({ status: 404, body: 'planted' }));

		try {
			await page.goto(item.page.endsWith('.html') ? item.page : `${item.page}`, { waitUntil: 'domcontentloaded' });
			const music = item.page === '/musicplayer';
			await page.waitForFunction(isMusic => window.player && (isMusic || document.querySelector('video')), music, { timeout: 30_000 });

			const result = await page.evaluate(async ({ index, window: waitMs, min, isMusic, track }) => {
				const media = () => document.querySelector(isMusic ? 'audio' : 'video');
				const now = () => (isMusic ? window.player.time() : media().currentTime);
				if (media()) media().muted = true;
				// item() before the player is ready loses autoplay: setup pauses the element.
				await window.player.ready?.();
				let mediaError = null;
				window.player.on?.('fatal', e => { mediaError ??= e?.message ?? 'fatal'; });
				window.player.on?.('itemFailed', e => { mediaError ??= e?.error?.message ?? 'itemFailed'; });
				if (isMusic) {
					await window.player.mute();
					window.player.queue([{ id: `e2e-${index}`, name: track.title, url: track.url }]);
					window.player.item(0, { autoplay: true });
				}
				else {
					await window.player.item(index, { autoplay: true });
					media().muted = true;
					await media().play().catch(() => {});
				}
				media()?.addEventListener('error', () => { mediaError ??= media().error?.message || `media error ${media().error?.code}`; });
				const started = performance.now();
				let start = null;
				while (performance.now() - started < waitMs) {
					await new Promise(r => setTimeout(r, 250));
					if (mediaError) break;
					if (now() > 0 && start === null) start = now();
					if (start !== null && now() - start >= min) break;
				}
				return { currentTime: now(), advanced: start === null ? 0 : now() - start, mediaError };
			}, { index: item.index, window: 25_000, min: MIN_ADVANCE, isMusic: music, track: item });

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

test.describe('music page controls', () => {
	test('play, next, shuffle and the visualizer canvas work through the page buttons', async ({ page, browserName }) => {
		if (pages && !pages.includes('/musicplayer')) test.skip();
		const row = { file: '/musicplayer controls', page: '/musicplayer', browser: browserName, pass: false, currentTime: 0, error: null };
		test.info().annotations.push({ type: 'result', description: '' });
		try {
			await page.goto('/musicplayer');
			await page.waitForFunction(() => window.player?.queue().length > 0 && document.querySelector('#visualizer canvas'), null, { timeout: 30_000 });
			await page.evaluate(() => window.player.mute());
			const first = await page.evaluate(() => window.player.item()?.name);
			await page.locator('button[aria-label="Toggle Playback"]').first().click();
			await page.waitForFunction(() => window.player.time() > 2, null, { timeout: 30_000 });
			await page.locator('button[aria-label="shuffle"]').first().click();
			await page.waitForFunction(() => window.player.shuffleState() === 'on');
			await page.locator('button[aria-label="Toggle Playback"]').first().click();
			await page.waitForFunction(() => window.player.playState() === 'paused');
			await page.locator('button[aria-label="Toggle Playback"]').first().click();
			await page.locator('button[aria-label="Next"]').first().click();
			await page.waitForFunction(name => window.player.item()?.name !== name, first, { timeout: 15_000 });
			row.currentTime = await page.evaluate(() => window.player.time());
			row.pass = Boolean(first);
			row.error = row.pass ? null : 'no first track';
		}
		catch (error) {
			row.error = String(error.message).split('\n')[0];
		}
		test.info().annotations.find(a => a.type === 'result').description = JSON.stringify(row);
		expect(row.pass, row.error ?? '').toBe(true);
	});
});
