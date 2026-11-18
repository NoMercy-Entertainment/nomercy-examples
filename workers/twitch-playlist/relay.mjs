// Relays Twitch's live playlists (text only): usher sends no CORS header, and the media playlists answer 403
// to a foreign Origin. Video segments load straight from Twitch. Rules follow NomNomzBot's
// TwitchLivePlaylistAddress (https, default port, no user info, host under .ttvnw.net) and HlsPlaylistRewriter.

export const RELAY_PATH = '/twitch-playlist';

const PLAYLIST_TYPE = 'application/vnd.apple.mpegurl';

const encode = address => btoa(address).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');

/** Makes every URI absolute; child playlists go through the relay, segments straight to Twitch. */
export function rewritePlaylist(playlist, source) {
	const rewriteUri = (uri) => {
		let absolute;
		try {
			absolute = new URL(uri, source);
		}
		catch {
			return uri;
		}
		return absolute.pathname.toLowerCase().endsWith('.m3u8')
			? `${RELAY_PATH}/${encode(absolute.href)}/index.m3u8`
			: absolute.href;
	};

	return playlist.split('\n').map((raw) => {
		const line = raw.replace(/\r$/u, '');
		if (line.length === 0) return line;
		if (line.startsWith('#')) return line.replace(/URI="([^"]+)"/gu, (_, uri) => `URI="${rewriteUri(uri)}"`);
		return rewriteUri(line.trim());
	}).join('\n');
}

/** Decodes `{base64url(address)}/index.m3u8` and returns the address, or undefined when it is not a Twitch playlist. */
export function relayTarget(pathname) {
	const match = pathname.match(/^\/twitch-playlist\/([\w-]+)\/index\.m3u8$/u);
	if (!match) return undefined;

	let address;
	try {
		const base64 = match[1].replaceAll('-', '+').replaceAll('_', '/');
		address = new URL(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')));
	}
	catch {
		return undefined;
	}

	const allowed = address.protocol === 'https:'
		&& address.port === ''
		&& address.username === ''
		&& address.password === ''
		&& address.hostname.endsWith('.ttvnw.net');

	return allowed ? address.href : undefined;
}

/** Answers one relay request: 400 for a foreign address, Twitch's status otherwise, never cached. */
export async function relay(pathname, fetchImpl = fetch) {
	const headers = { 'Cache-Control': 'no-store' };
	const target = relayTarget(pathname);
	if (!target) return { status: 400, headers, body: 'not a Twitch playlist address' };

	// 'manual': Workers do not support redirect 'error'; a redirect away from Twitch counts as a failure.
	const upstream = await fetchImpl(target, { redirect: 'manual' });
	const body = await upstream.text();
	headers['X-Upstream-Status'] = String(upstream.status);
	if (!upstream.ok) return { status: upstream.status === 404 ? 404 : 502, headers, body: '' };

	return { status: 200, headers: { ...headers, 'Content-Type': PLAYLIST_TYPE }, body: rewritePlaylist(body, target) };
}
