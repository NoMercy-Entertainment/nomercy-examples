// Uploads the Twitch playlist relay Worker and routes examples.nomercy.tv/twitch-playlist/* to it.
// Usage: CF_ENV_FILE=<.env with CLOUDFLARE_EMAIL and CLOUDFLARE_API_KEY> node workers/twitch-playlist/deploy.mjs [--yes]
// Without --yes it only prints what it would change. The key is read from the file and never printed.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ACCOUNT = '430cc0dc9fcf3a1cf3258d165c15abf4';
const ZONE = 'nomercy.tv';
const SCRIPT = 'examples-twitch-playlist';
const PATTERN = 'examples.nomercy.tv/twitch-playlist/*';
const here = dirname(fileURLToPath(import.meta.url));
const apply = process.argv.includes('--yes');

if (!process.env.CF_ENV_FILE) {
	console.error('set CF_ENV_FILE to the .env file that holds CLOUDFLARE_EMAIL and CLOUDFLARE_API_KEY');
	process.exit(2);
}

const env = Object.fromEntries(
	readFileSync(process.env.CF_ENV_FILE, 'utf8')
		.split(/\r?\n/u)
		.map(line => line.match(/^([A-Z_]+)=(.*)$/u))
		.filter(Boolean)
		.map(match => [match[1], match[2].replace(/^"|"$/gu, '')]),
);
const auth = { 'X-Auth-Email': env.CLOUDFLARE_EMAIL, 'X-Auth-Key': env.CLOUDFLARE_API_KEY };

async function call(method, path, body, json = true) {
	const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
		method,
		headers: json ? { ...auth, 'Content-Type': 'application/json' } : auth,
		body: json && body ? JSON.stringify(body) : body,
	});
	const result = await response.json();
	if (!result.success) throw new Error(`${method} ${path} failed: ${JSON.stringify(result.errors)}`);
	return result.result;
}

const zone = (await call('GET', `/zones?name=${ZONE}`))[0];
const routes = await call('GET', `/zones/${zone.id}/workers/routes`);
const route = routes.find(r => r.pattern === PATTERN);
console.log(`route ${PATTERN}: ${route ? `exists -> ${route.script}` : 'missing'}`);

if (!apply) {
	console.log(`dry run: would upload ${SCRIPT} (worker.mjs + relay.mjs)${route ? '' : ` and add route ${PATTERN}`}`);
	process.exit(0);
}

const form = new FormData();
form.append('metadata', JSON.stringify({ main_module: 'worker.mjs', compatibility_date: '2026-11-01' }));
for (const file of ['worker.mjs', 'relay.mjs'])
	form.append(file, new Blob([readFileSync(join(here, file), 'utf8')], { type: 'application/javascript+module' }), file);
await call('PUT', `/accounts/${ACCOUNT}/workers/scripts/${SCRIPT}`, form, false);
console.log(`uploaded ${SCRIPT}`);

if (!route) {
	await call('POST', `/zones/${zone.id}/workers/routes`, { pattern: PATTERN, script: SCRIPT });
	console.log(`added route ${PATTERN}`);
}
else if (route.script !== SCRIPT) {
	await call('PUT', `/zones/${zone.id}/workers/routes/${route.id}`, { pattern: PATTERN, script: SCRIPT });
	console.log(`pointed route ${PATTERN} at ${SCRIPT}`);
}
