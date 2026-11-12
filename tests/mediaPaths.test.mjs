// The media repo flattened Anime/Anime, Films/Films and Music/Music into one folder each (media ed10bea).
// A page that still names the double folder loads nothing: the video, the subtitles and the fonts all 404.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOUBLE_FOLDER = /\/(Anime\/Anime|Films\/Films|Music\/Music)(\/|['"])/;

function* sources(dir) {
	for (const name of readdirSync(dir)) {
		if (name === 'node_modules' || name.startsWith('.') || name === 'dist') continue;
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* sources(path);
		else if (/\.(html|js|ts|vue|mjs)$/.test(name) && !path.includes(join('public', 'js', 'octopus'))) yield path;
	}
}

test('no page points at the old double media folders', () => {
	const stale = [];
	for (const file of [...sources(join(root, 'src')), ...sources(join(root, 'public'))]) {
		readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
			if (DOUBLE_FOLDER.test(line)) stale.push(`${relative(root, file)}:${i + 1}`);
		});
	}
	assert.deepEqual(stale, []);
});
