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

export async function clipSlug(login = 'twitch') {
	const data = await gql(`{ user(login: "${login}") { clips(first: 1, criteria: { period: LAST_MONTH }) { edges { node { slug } } } } }`);
	return data?.user?.clips?.edges?.[0]?.node?.slug;
}
