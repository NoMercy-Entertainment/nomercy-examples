
import type { VideoPlayerConfig, VideoPlaylistItem } from "@nomercy-entertainment/nomercy-video-player";
import type { DesktopUiOptions } from "@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui";

import playlist from "./playlist";

// Every playlist path is relative to the media repo root.
const BASE = 'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master';
const IMG_BASE = 'https://image.tmdb.org/t/p/w780';

const config: VideoPlayerConfig = {
	muted: false,
	autoPlay: false,
	preload: 'auto',
	playlist: playlist as VideoPlaylistItem[],
	baseUrl: BASE,
	baseImageUrl: IMG_BASE,
	playbackRates: [
		0.25,
		0.5,
		0.75,
		1,
		1.25,
		1.5,
		1.75,
		2,
	],
};

export const desktopUiOptions = {
	buttons: {
		theater: true,
		pip: true,
		speed: true,
		quality: true,
		subtitles: true,
		audio: true,
		playlist: true,
		aspectRatio: true,
	},
} as const satisfies DesktopUiOptions;

export default config;
