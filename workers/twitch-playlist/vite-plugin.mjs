// Serves the same relay from `vite dev` and `vite preview`, so local runs and the e2e suite use the Worker's code.
import { relay, RELAY_PATH } from './relay.mjs';

const middleware = async (req, res, next) => {
	if (!req.url?.startsWith(`${RELAY_PATH}/`)) return next();

	try {
		const answer = await relay(new URL(req.url, 'http://local').pathname);
		res.writeHead(answer.status, answer.headers);
		res.end(answer.body);
	}
	catch {
		res.writeHead(502, { 'Cache-Control': 'no-store' });
		res.end();
	}
};

export function twitchPlaylistRelay() {
	return {
		name: 'twitch-playlist-relay',
		// Block bodies: a function returned from these hooks would run as a post hook.
		configureServer(server) { server.middlewares.use(middleware); },
		configurePreviewServer(server) { server.middlewares.use(middleware); },
	};
}
