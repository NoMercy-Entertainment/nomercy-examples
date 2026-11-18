// Loads the published 2.9.0 video player and its plugins and puts them on window for the demo pages.
import nmplayer from 'https://cdn.jsdelivr.net/npm/@nomercy-entertainment/nomercy-video-player@2.9.0/+esm';
import * as plugins from 'https://cdn.jsdelivr.net/npm/@nomercy-entertainment/nomercy-video-player@2.9.0/plugins/+esm';
import { Plugin } from 'https://cdn.jsdelivr.net/npm/@nomercy-entertainment/nomercy-player-core@2.9.1/+esm';

window.nmplayer = nmplayer;
window.nmPlugins = { ...plugins, Plugin };
