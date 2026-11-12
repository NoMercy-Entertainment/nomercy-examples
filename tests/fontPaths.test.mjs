// The v1 player (OctopusPlugin) always puts `basePath` in front of each font file URL,
// even when the playlist gave the fonts track as an absolute URL. The result is
// `<basePath>https://...`, which 404s, so no subtitles draw (#24).
// Every fonts track in the Vue player playlist must give a URL that still works after that prefix.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'components', 'VideoPlayer');
const config = readFileSync(join(dir, 'config.ts'), 'utf8');
const playlist = readFileSync(join(dir, 'playlist.ts'), 'utf8');

const base = config.match(/const BASE = '([^']+)'/)[1];
const fontsFiles = [...playlist.matchAll(/file: '([^']+)',\s*kind: 'fonts'/g)].map((m) => m[1]);

test('the playlist has fonts tracks to check', () => {
	assert.ok(fontsFiles.length > 0);
});

test('every fonts URL is valid after the v1 player adds basePath', () => {
	const broken = fontsFiles
		.map((file) => `${base}${file.replace(/\/[^/]*$/u, '')}/font.ttf`)
		.filter((url) => url.split('://').length !== 2);
	assert.deepEqual(broken, []);
});
