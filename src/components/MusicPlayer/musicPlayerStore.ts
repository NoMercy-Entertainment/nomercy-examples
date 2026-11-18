import { ref, toRaw } from 'vue';

import { nmplayer, RepeatState } from '@nomercy-entertainment/nomercy-music-player';
import {
	AudioGraphPlugin,
	AutoAdvancePlugin,
	EqualizerPlugin,
	MediaSessionPlugin,
	MixerPlugin,
	SpectrumPlugin,
} from '@nomercy-entertainment/nomercy-music-player/plugins';

import type { PlaylistItem } from './playlists';

export type { PlaylistItem } from './playlists';

// The player mounts on a div that exists before the first page renders.
const container = document.createElement('div');
container.id = 'music-player';
container.hidden = true;
document.body.append(container);

export const musicPlayer = nmplayer<PlaylistItem>('music-player')
	.addPlugin(AutoAdvancePlugin)
	.addPlugin(MediaSessionPlugin)
	.addPlugin(AudioGraphPlugin)
	.addPlugin(EqualizerPlugin, { persistKey: 'equalizer' })
	.addPlugin(MixerPlugin)
	.addPlugin(SpectrumPlugin)
	.setup({ playlist: [] });
export default musicPlayer;
(window as unknown as { player: typeof musicPlayer }).player = musicPlayer;

// The data files keep the old `path` field; the player reads `url`.
export const toPlayerItem = (track: PlaylistItem): PlaylistItem => ({
	...track,
	url: track.url ?? track.path,
	artist: track.artist ?? track.artist_track?.at(0)?.name,
	album: track.album ?? track.album_track?.at(0)?.name,
});

// Loads a playlist and parks on its first track without playing it.
export const loadPlaylist = (tracks: PlaylistItem[]): void => {
	const items = tracks.map(toPlayerItem);
	musicPlayer.backlogClear();
	musicPlayer.queue(items);
	musicPlayer.item(items[0], { autoplay: false });
};

export const playTrack = (track: PlaylistItem): void => {
	musicPlayer.item(track.id, { autoplay: true });
};

export const currentTime = ref<number>(0);
export const duration = ref<number>(0);
export const remainingTime = ref<number>(0);
export const percentage = ref<number>(0);
export const currentSong = ref<PlaylistItem | null>(null);
export const currentPlaylist = ref<string | null>(null);
export const queue = ref<PlaylistItem[]>([]);
export const backlog = ref<PlaylistItem[]>([]);
export const isPlaying = ref<boolean>(false);
export const isMuted = ref<boolean>(false);
export const isShuffling = ref<boolean>(false);
export const isRepeating = ref<RepeatState>(RepeatState.OFF);
export const volume = ref<number>(100);

export const setCurrentPlaylist = (value: string): void => {
	currentPlaylist.value = value;
};

export const queueMenuOpen = ref<boolean>(false);
export const setQueueMenuOpen = (value: boolean): void => {
	queueMenuOpen.value = value;
};
export const toggleQueueMenuOpen = (): void => {
	queueMenuOpen.value = !queueMenuOpen.value;
};

export const equalizerMenuOpen = ref<boolean>(true);
export const setEqualizerMenuOpen = (value: boolean): void => {
	equalizerMenuOpen.value = value;
};
export const toggleEqualizerMenuOpen = (): void => {
	equalizerMenuOpen.value = !equalizerMenuOpen.value;
};

export const closeEqualizerMenu = (): void => {
	equalizerMenuOpen.value = false;
};

musicPlayer.on('time', (timeState) => {
	currentTime.value = timeState.position;
	duration.value = timeState.duration;
	remainingTime.value = timeState.remaining;
	percentage.value = timeState.percentage;
});

musicPlayer.on('item', ({ item }) => {
	currentSong.value = item ?? null;
});

musicPlayer.on('queue', (data) => {
	queue.value = [...Object.values(toRaw(data))];
});

musicPlayer.on('backlog', (data) => {
	backlog.value = [...Object.values(toRaw(data))];
});

musicPlayer.on('play', () => {
	isPlaying.value = true;
});
musicPlayer.on('pause', () => {
	isPlaying.value = false;
});
musicPlayer.on('stop', () => {
	isPlaying.value = false;
});

musicPlayer.on('mute', ({ muted }) => {
	isMuted.value = muted;
});

musicPlayer.on('shuffle', ({ state }) => {
	isShuffling.value = state === 'on';
});

musicPlayer.on('repeat', ({ state }) => {
	isRepeating.value = state;
});

musicPlayer.on('volume', ({ level }) => {
	volume.value = level;
});
