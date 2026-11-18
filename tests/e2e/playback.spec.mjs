import { expect, test } from '@playwright/test';

import { buildMediaList } from './media-list.mjs';
import { clipSlug, liveChannel } from './twitch-picks.mjs';

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
				const box = isMusic ? null : media().getBoundingClientRect();
				return { currentTime: now(), advanced: start === null ? 0 : now() - start, mediaError, box: box && { width: box.width, height: box.height } };
			}, { index: item.index, window: 25_000, min: MIN_ADVANCE, isMusic: music, track: item });

			row.currentTime = result.currentTime;
			row.error = result.mediaError;
			row.pass = !result.mediaError && result.advanced >= MIN_ADVANCE;
			if (!row.pass && !row.error) row.error = `currentTime advanced ${result.advanced.toFixed(2)} s`;
			// A video that plays in a collapsed box is invisible to the viewer (2026-11-18: 878x0 on /videoplayer).
			if (result.box && (result.box.width < 100 || result.box.height < 100)) {
				row.pass = false;
				row.error ??= `video box ${Math.round(result.box.width)}x${Math.round(result.box.height)} is too small to see`;
			}
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
	// Live plays in this player through the same-site playlist relay; a clip plays its raw file. No Twitch iframe.
	const playsRaw = async (page, browserName, input, kind) => {
		const row = { file: `/twitch ${kind}=${input}`, page: '/twitch', browser: browserName, pass: false, currentTime: 0, error: null };
		test.info().annotations.push({ type: 'result', description: '' });
		const relayed = [];
		page.on('response', (r) => { if (r.url().includes('/twitch-playlist/')) relayed.push(r.status()); });
		try {
			await page.goto('/twitch');
			await page.fill('#twitch-channel', input);
			await page.click('#twitch-play');
			// A live stream starts at its live position, so playback is proven by time advancing, not by its value.
			await page.waitForFunction(() => { const v = document.querySelector('video'); return v && !v.paused && v.readyState >= 3; }, null, { timeout: 45_000 });
			const start = await page.evaluate(() => document.querySelector('video').currentTime);
			await page.waitForFunction(from => document.querySelector('video').currentTime - from >= 2, start, { timeout: 20_000 });
			row.currentTime = await page.evaluate(() => document.querySelector('video').currentTime);
			const iframes = await page.locator('iframe[src*="player.twitch.tv"]').count();
			const relayOk = kind === 'clip' || relayed.includes(200);
			row.pass = iframes === 0 && relayOk;
			row.error = row.pass ? null : `iframes=${iframes} relay statuses=${relayed.join(',') || 'none'}`;
		}
		catch (error) {
			const message = await page.locator('#twitch-message').innerText().catch(() => '');
			row.error = `${String(error.message).split('\n')[0]} relay=${relayed.join(',') || 'none'} message="${message}"`;
		}
		test.info().annotations.find(a => a.type === 'result').description = JSON.stringify(row);
		expect(row.pass, row.error ?? '').toBe(true);
	};

	test('a live channel plays in this player through the playlist relay', async ({ page, browserName }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		const channel = await liveChannel();
		expect(channel, 'Twitch lists no live channel').toBeTruthy();
		await playsRaw(page, browserName, channel, 'channel');
	});

	test('the player switch shows which player is active', async ({ page }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		await page.goto('/twitch');
		const checked = () => page.locator('#menu li').filter({ hasText: 'checkmark' }).allInnerTexts();
		expect((await checked()).join()).toContain('NoMercy player');
		await page.locator('#menu').getByText('Twitch embed', { exact: true }).click();
		const after = (await checked()).join();
		expect(after).toContain('Twitch embed');
		expect(after).not.toContain('NoMercy player');
	});

	test('the Twitch embed choice loads the embed for a live channel', async ({ page }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		const channel = await liveChannel();
		await page.goto('/twitch');
		await page.locator('#menu').getByText('Twitch embed', { exact: true }).click();
		await page.fill('#twitch-channel', channel);
		await page.click('#twitch-play');
		const src = await page.waitForFunction(() => document.querySelector('iframe[src*="player.twitch.tv"]')?.src ?? null, null, { timeout: 30_000 }).then(h => h.jsonValue());
		const url = new URL(src);
		expect(url.searchParams.get('channel')).toBe(channel);
		expect(url.searchParams.get('parent')).toBe(new URL(page.url()).hostname);
	});

	test('a clip link plays its raw file in this player', async ({ page, browserName }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		const slug = await clipSlug();
		expect(slug, 'Twitch returned no clip').toBeTruthy();
		await playsRaw(page, browserName, `https://clips.twitch.tv/${slug}`, 'clip');
	});

	test('an invalid channel shows a message and loads no embed', async ({ page }) => {
		if (pages && !pages.includes('/twitch')) test.skip();
		await page.goto('/twitch');
		await page.fill('#twitch-channel', 'no');
		await page.click('#twitch-play');
		await expect(page.locator('#twitch-message')).toContainText('Enter a channel name');
		await expect(page.locator('iframe[src*="player.twitch.tv"]')).toHaveCount(0);
	});

	for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
		test(`the channel form and message fit inside the player box on ${name}`, async ({ page }) => {
			if (pages && !pages.includes('/twitch')) test.skip();
			await page.setViewportSize(viewport);
			await page.goto('/twitch');
			for (const id of ['#twitch-channel', '#twitch-play', '#twitch-message']) {
				const [bottom, panel] = await page.locator(id).evaluate(el => [el.getBoundingClientRect().bottom, el.closest('aside, main').getBoundingClientRect().bottom]);
				expect(bottom, `${id} bottom ${bottom} vs its panel ${panel}`).toBeLessThanOrEqual(panel);
			}
			// The video gets most of its 16:10 box, not the strip left over by a form.
			const [player, box] = await page.locator('#twitch-player').evaluate(el => [el.getBoundingClientRect().height, el.parentElement.getBoundingClientRect().height]);
			expect(player, `player ${player} px in a ${box} px box`).toBeGreaterThanOrEqual(box * 0.8);
		});
	}
});

test('the menu and the player sit centered on a wide screen', async ({ page }) => {
	if (pages && !pages.includes('/videoplayer')) test.skip();
	await page.setViewportSize({ width: 3440, height: 1332 });
	await page.goto('/videoplayer');
	const menu = await page.locator('#menu').boundingBox();
	const main = await page.locator('#wrapper').boundingBox();
	const left = menu.x;
	const right = 3440 - (main.x + main.width);
	const between = main.x - (menu.x + menu.width);
	// They sit together as one centered group: the gap between them is the layout gap (4rem), not the leftover width.
	expect(between, `space between ${between} px`).toBeLessThanOrEqual(66);
	expect(Math.abs(left - right), `space left ${left} px, right ${right} px`).toBeLessThanOrEqual(2);
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
