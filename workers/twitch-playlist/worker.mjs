// Cloudflare Worker on examples.nomercy.tv/twitch-playlist/*. Deploy: node workers/twitch-playlist/deploy.mjs --yes
import { relay } from './relay.mjs';

export default {
	async fetch(request) {
		if (request.method !== 'GET') return new Response('', { status: 405 });

		try {
			const answer = await relay(new URL(request.url).pathname);
			return new Response(answer.body, { status: answer.status, headers: answer.headers });
		}
		catch (error) {
			return new Response('', { status: 502, headers: { 'Cache-Control': 'no-store', 'X-Relay-Error': String(error?.message ?? error).slice(0, 200) } });
		}
	},
};
