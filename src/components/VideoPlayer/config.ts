
import type { PlayerConfig } from "@nomercy-entertainment/nomercy-video-player";

import playlist from "./playlist";


const BASE = 'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Films';
const IMG_BASE = 'https://image.tmdb.org/t/p/w780';

const config: PlayerConfig = {
	muted: false,
	controls: false,
	preload: 'auto',
	debug: false,
	playlist: playlist,
	translations: ['/locales/{lang}/ui.json'],
	basePath: BASE,
	imageBasePath: IMG_BASE,
	controlsTimeout: 3000,
	doubleClickDelay: 500,
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

export default config;