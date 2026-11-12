// The examples run the v1 player, whose OctopusPlugin loads its ASS worker from jsDelivr
// (nomercy-video-player@latest/public/js/octopus) unless told otherwise. jsDelivr resolves that to an old 1.x
// build, so the examples pass their own copy: the JavascriptSubtitlesOctopus fork build b4edb89
// (FreeType 2.15.0, HarfBuzz 15.1.0, expat 2.10.0). A stale copy or a call site without the URLs fails here.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const octopusDir = join(root, 'public', 'js', 'octopus');

const WORKER_SHA256 = {
	'subtitles-octopus-worker.js': 'd486441e93f01788ec21bda56de6d974871f6cbc23c460db29a496d89d24da8c',
	'subtitles-octopus-worker.wasm': '4a8d5b5236988541b983e7da016ab814751f431e7d3477e687c933ceddd70485',
	'subtitles-octopus-worker-legacy.js': '339cf4c70538b64cc25b8dda13577abdb16fce5289bfd89c4d048ee796a9b0fb',
};

const CALL_SITES = ['src/components/VideoPlayer/VideoPlayer.vue', 'public/wiki/examples/anime-subs.html'];

test('public/js/octopus holds the current worker build', () => {
	for (const [file, sha256] of Object.entries(WORKER_SHA256)) {
		const path = join(octopusDir, file);
		assert.ok(existsSync(path), `${file} is missing`);
		assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'), sha256, `${file} is not the current build`);
	}
});

test('public/js/octopus has no leftovers of the old worker', () => {
	const allowed = new Set([...Object.keys(WORKER_SHA256), 'default.ttf', 'COPYRIGHT']);
	assert.deepEqual(readdirSync(octopusDir).filter(name => !allowed.has(name)), []);
});

test('every OctopusPlugin call site loads the local worker, never the CDN default', () => {
	for (const site of CALL_SITES) {
		const text = readFileSync(join(root, site), 'utf8');
		for (const option of ['workerUrl', 'legacyWorkerUrl', 'fallbackFont'])
			assert.match(text, new RegExp(`${option}:\\s*['"]/js/octopus/`), `${site} does not set ${option} to /js/octopus/`);
	}
});
