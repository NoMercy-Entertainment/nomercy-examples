// Lists every media file the site plays, read from the sources that feed each page.
// Run `node tests/e2e/media-list.mjs <out.json>` to write the list as { page, title, url, index }.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8');

const absolute = (base, file) => (/^https?:/u.test(file) ? file : `${base}${file}`);

function videoItems() {
	const base = read('src', 'components', 'VideoPlayer', 'config.ts').match(/const BASE = '([^']+)'/u)[1];
	const lines = read('src', 'components', 'VideoPlayer', 'playlist.ts').split('\n');
	const items = [];
	let title = '';
	for (const line of lines) {
		const t = line.match(/^\t\ttitle: '((?:[^'\\]|\\.)*)'/u);
		if (t) title = t[1];
		const f = line.match(/^\t\tfile: '([^']+\.m3u8)'/u);
		if (f) items.push({ title, url: absolute(base, f[1]) });
	}
	return items;
}

function musicItems() {
	const lines = read('src', 'components', 'MusicPlayer', 'playlists.ts').split('\n');
	const items = [];
	let album = '';
	let name = '';
	for (const line of lines) {
		const a = line.match(/^ {8}name: ['"](.+)['"],/u);
		if (a) album = a[1];
		const n = line.match(/^ {16}name: ['"](.+)['"],/u);
		if (n) name = n[1];
		const p = line.match(/^ {16}path: ['"]([^'"]+)['"]/u);
		if (p) items.push({ title: `${album} - ${name}`, url: p[1] });
	}
	return items;
}

function wikiItems() {
	const dir = join(root, 'public', 'wiki', 'examples');
	const items = [];
	for (const file of readdirSync(dir).filter(name => name.endsWith('.html')).sort()) {
		const text = readFileSync(join(dir, file), 'utf8');
		const base = text.match(/(?:basePath|baseUrl): '([^']+)'/u)?.[1];
		if (!base) continue;
		let title = '';
		for (const line of text.split('\n')) {
			const t = line.match(/^\s*title: '((?:[^'\\]|\\.)*)'/u);
			if (t) title = t[1];
			const f = line.match(/^\s*file: '([^']+\.m3u8)'/u);
			if (f) items.push({ page: `/wiki/examples/${file}`, title, url: absolute(base, f[1]) });
		}
	}
	return items;
}

export function buildMediaList() {
	const video = videoItems();
	const list = [];
	video.forEach((item, index) => list.push({ page: '/videoplayer', index, ...item }));
	video.forEach((item, index) => list.push({ page: '/tutorial', index, ...item }));
	musicItems().forEach((item, index) => list.push({ page: '/musicplayer', index, ...item }));
	const perPage = new Map();
	for (const item of wikiItems()) {
		const index = perPage.get(item.page) ?? 0;
		perPage.set(item.page, index + 1);
		list.push({ ...item, index });
	}
	return list;
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv[2]) {
	const list = buildMediaList();
	writeFileSync(process.argv[2], `${JSON.stringify(list, null, 2)}\n`);
	const counts = {};
	for (const item of list) counts[item.page] = (counts[item.page] ?? 0) + 1;
	console.log(JSON.stringify({ total: list.length, counts }));
}
