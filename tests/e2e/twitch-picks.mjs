// Picks a channel that is live now and a clip that exists, from Twitch's public GraphQL, so the page tests never
// depend on one streamer being online.
const GQL = 'https://gql.twitch.tv/gql';
const WEB_CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

async function gql(query) {
	const response = await fetch(GQL, {
		method: 'POST',
		headers: { 'Client-Id': WEB_CLIENT_ID, 'Content-Type': 'application/json' },
		body: JSON.stringify({ query }),
	});
	return (await response.json()).data;
}

export async function liveChannel() {
	const data = await gql('{ streams(first: 5) { edges { node { broadcaster { login } } } } }');
	return data?.streams?.edges?.[0]?.node?.broadcaster?.login;
}

// Any one channel can have no clip in a period, so try the live channel and a few big ones over two periods.
export async function clipSlug() {
	const logins = [await liveChannel(), 'twitch', 'twitchgaming', 'riotgames'].filter(Boolean);
	for (const period of ['LAST_WEEK', 'ALL_TIME']) {
		for (const login of logins) {
			const data = await gql(`{ user(login: "${login}") { clips(first: 1, criteria: { period: ${period} }) { edges { node { slug } } } } }`);
			const slug = data?.user?.clips?.edges?.[0]?.node?.slug;
			if (slug) return slug;
		}
	}
	return undefined;
}
