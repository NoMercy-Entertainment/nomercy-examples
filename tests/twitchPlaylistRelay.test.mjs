import assert from 'node:assert/strict';
import test from 'node:test';

import { relay, relayTarget, rewritePlaylist } from '../workers/twitch-playlist/relay.mjs';

const encode = address => btoa(address).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
const path = address => `/twitch-playlist/${encode(address)}/index.m3u8`;
const USHER = 'https://usher.ttvnw.net/api/channel/hls/somechannel.m3u8?allow_source=true&sig=abc&token=%7B%7D';

test('a Twitch usher address passes', () => {
	assert.equal(relayTarget(path(USHER)), USHER);
});

test('foreign, plain-http, user-info and odd-port addresses are refused', () => {
	for (const bad of [
		'https://example.com/a.m3u8',
		'https://ttvnw.net.example.com/a.m3u8',
		'http://usher.ttvnw.net/a.m3u8',
		'https://user:pw@usher.ttvnw.net/a.m3u8',
		'https://usher.ttvnw.net:8443/a.m3u8',
	])
		assert.equal(relayTarget(path(bad)), undefined, bad);
});

test('only the index.m3u8 form under the relay path is read', () => {
	assert.equal(relayTarget(`/twitch-playlist/${encode(USHER)}/other.ts`), undefined);
	assert.equal(relayTarget(`/other/${encode(USHER)}/index.m3u8`), undefined);
	assert.equal(relayTarget('/twitch-playlist/!!!/index.m3u8'), undefined);
});

test('child playlists go through the relay, segments stay on Twitch', () => {
	// Twitch's media playlists answer 403 to a foreign Origin; its segments do not (measured 2026-11-18).
	const master = [
		'#EXTM3U',
		'#EXT-X-MEDIA:TYPE=VIDEO,GROUP-ID="chunked",URI="https://video-weaver.ams.hls.ttvnw.net/v1/playlist/abc.m3u8"',
		'#EXT-X-STREAM-INF:BANDWIDTH=6000000',
		'https://euc13.playlist.ttvnw.net/v1/playlist/xyz.m3u8\r',
		'relative/720p.m3u8',
		'#EXTINF:2.000,live',
		'https://abc.j.cloudfront.hls.ttvnw.net/v1/segment/seg1.ts',
		'',
	].join('\n');
	const lines = rewritePlaylist(master, USHER).split('\n');

	assert.equal(lines[1], `#EXT-X-MEDIA:TYPE=VIDEO,GROUP-ID="chunked",URI="${path('https://video-weaver.ams.hls.ttvnw.net/v1/playlist/abc.m3u8')}"`);
	assert.equal(lines[3], path('https://euc13.playlist.ttvnw.net/v1/playlist/xyz.m3u8'));
	assert.equal(lines[4], path('https://usher.ttvnw.net/api/channel/hls/relative/720p.m3u8'));
	assert.equal(lines[6], 'https://abc.j.cloudfront.hls.ttvnw.net/v1/segment/seg1.ts');
	assert.equal(relayTarget(lines[3]), 'https://euc13.playlist.ttvnw.net/v1/playlist/xyz.m3u8');
});

test('relay returns the playlist uncached with the HLS type', async () => {
	let asked;
	const fake = async (url) => { asked = url; return new Response('#EXTM3U\n', { status: 200 }); };
	const answer = await relay(path(USHER), fake);
	assert.equal(asked, USHER);
	assert.equal(answer.status, 200);
	assert.equal(answer.body, '#EXTM3U\n');
	assert.equal(answer.headers['Content-Type'], 'application/vnd.apple.mpegurl');
	assert.equal(answer.headers['Cache-Control'], 'no-store');
});

test('relay fetches nothing for a refused address', async () => {
	let called = false;
	const answer = await relay(path('https://example.com/a.m3u8'), async () => { called = true; });
	assert.equal(answer.status, 400);
	assert.equal(called, false);
});

test('an offline channel stays a 404, other upstream errors become 502', async () => {
	assert.equal((await relay(path(USHER), async () => new Response('', { status: 404 }))).status, 404);
	assert.equal((await relay(path(USHER), async () => new Response('', { status: 403 }))).status, 502);
});
