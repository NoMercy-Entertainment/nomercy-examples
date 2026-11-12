// The v1 OctopusPlugin sends "oneshot-render" when renderAhead is set. The subtitle worker this site
// serves has no such mode: it throws "wha? oneshot-render", the plugin destroys itself, nothing draws.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const worker = readFileSync(join(root, 'public', 'js', 'octopus', 'subtitles-octopus-worker.js'), 'utf8');

function* sources(dir) {
	for (const name of readdirSync(dir)) {
		if (['node_modules', 'dist', 'docs'].includes(name) || name.startsWith('.')) continue;
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* sources(path);
		else if (/\.(html|js|ts|vue|mjs)$/.test(name) && !path.includes(join('public', 'js', 'octopus')) && !path.includes('tests')) yield path;
	}
}

test('no subtitle setup asks for a render mode the served worker lacks', () => {
	if (worker.includes('"oneshot-render"')) return;
	const offenders = [];
	for (const path of sources(root)) {
		readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
			if (/\brenderAhead\s*:/.test(line)) offenders.push(`${relative(root, path)}:${i + 1}`);
		});
	}
	assert.deepEqual(offenders, [], 'renderAhead makes the plugin send "oneshot-render", which this worker rejects');
});
