<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import type { Option } from "@/types/types";
import Layout from "@/Views/Layout.vue";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer.vue";

import playlists, { type PlaylistItem } from '@/components/MusicPlayer/playlists';
import { fetchPlaylist } from '@/lib/fetchPlaylist';
import { useLocalStorage } from '@vueuse/core';
import { currentSong, equalizerMenuOpen, loadPlaylist, musicPlayer, playTrack, queueMenuOpen } from '@/components/MusicPlayer/musicPlayerStore';
import { CanvasPlugin, SpectrumPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins';

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const musicPlayerRef = ref<{ player: any }>();
const visualizer = ref<HTMLDivElement>();
const audioColor = ref<HTMLDivElement>();
const currentPlaylist = ref<PlaylistItem[]>([]);

const useTheme = useLocalStorage('useTheme', true);

const colorStops = computed(() => {
  const bg = getComputedStyle(audioColor.value!).backgroundColor;

  if (!useTheme.value) {
    return [
      '#ff0000',
      '#ffff00',
      '#00ff00',
    ];
  }
  return [
    bg,
  ];
});

const options = ref<Option[]>([
  {
    label: 'Play',
    level: 0,
    action: () => musicPlayerRef.value?.player?.play(),
  },
  {
    label: 'Pause',
    level: 0,
    action: () => musicPlayerRef.value?.player?.pause(),
  },
  {
    label: 'Settings',
    level: 0,
    options: [
      {
        label: computed(() => useTheme.value ? 'Use default colors' : 'Use theme colors'),
        level: 1,
        action: () => {
          useTheme.value = !useTheme.value;
        },
      },
    ]
  },
  {
    label: 'Playlists',
    level: 0,
    options: [
      ...playlists.value.map((playlist) => ({
        label: `${playlist.artist} - ${playlist.name}`,
        level: 1,
        action: () => {
          currentPlaylist.value = playlist.tracks;
          loadPlaylist(playlist.tracks);
        },
      })),
    ]
  },
]);

const BARS = 64;

const drawBars = (ctx: CanvasRenderingContext2D, frequency: Uint8Array) => {
  const { width, height } = ctx.canvas;
  const stops = colorStops.value;
  const fill = ctx.createLinearGradient(0, 0, width, 0);
  stops.forEach((color, index) => fill.addColorStop(stops.length > 1 ? index / (stops.length - 1) : 0, color));
  ctx.fillStyle = fill;

  const step = Math.floor((frequency.length * 0.75) / BARS);
  const slot = width / BARS;
  for (let bar = 0; bar < BARS; bar++) {
    const value = frequency[bar * step] / 255;
    ctx.fillRect(bar * slot, height - value * height, slot * 0.8, value * height);
  }
};

let stopRendering: (() => void) | undefined;

onMounted(async () => {
  const playlist = playlists.value.find(p => p.name == 'Wake Up')!;
  currentPlaylist.value = playlist.tracks;
  loadPlaylist(playlist.tracks);

  musicPlayer.addPlugin(CanvasPlugin, { mount: visualizer.value });
  await musicPlayer.ready();
  const canvas = musicPlayer.getPlugin(CanvasPlugin);
  const spectrum = musicPlayer.getPlugin(SpectrumPlugin);
  if (!canvas || !spectrum) return;

  stopRendering = canvas.addRenderer((ctx) => {
    if (musicPlayer.playState() !== 'playing') return;
    drawBars(ctx, spectrum.currentFrame().frequency);
  });
});

onBeforeUnmount(() => {
  stopRendering?.();
  musicPlayer.removePlugin(CanvasPlugin);
});

const handleChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const url = input.value;

  if (!url) return;

  const playlist = await fetchPlaylist(url);
  if (!playlist) return;

  options.value = [
    ...options.value.filter((option) => option.label !== 'Playlists'),
    {
      label: 'Playlists',
      level: 0,
      options: [
        ...options.value.find((option) => option.label == 'Playlists')?.options ?? [],
        {
          label: `${playlist.artist} - ${playlist.name}`,
          level: 1,
          action: () => {
            currentPlaylist.value = playlist.tracks;
            loadPlaylist(playlist.tracks);
          },
        }
      ]
    }
  ];

  currentPlaylist.value = playlist.tracks;
  loadPlaylist(playlist.tracks);
};

const handleClick = (song: PlaylistItem) => {
  playTrack(song);
};

</script>

<template>
  <Layout :theme="theme" :title="`NoMercy Entertainment - Music Player`" :options="options as Option[]">

    <div ref="audioColor" id="audio-color"
      class="absolute top-0 left-0 overflow-clip bg-[var(--color-theme-2-shadow)] h-0 w-0"></div>

    <div class="flex gap-2 items-center justify-center h-10 flex-1 w-auto bg-black relative overflow-clip">
      <div ref="visualizer" id="visualizer" class="flex w-px flex-1 h-full" :class="{
        'opacity-0': !equalizerMenuOpen,
      }"></div>

      <div class="flex flex-col w-2/5 h-available overflow-auto py-2 gap-2 pr-4 transition-all duration-300" :class="{
        '-translate-x-0': queueMenuOpen,
        'translate-x-full !w-0': !queueMenuOpen,
      }">
        <template v-for="(song, index) in currentPlaylist" :key="index">
          <button class="flex items-center w-full h-full gap-2 text-left" @click="handleClick(song)">
            <div class="flex items-center justify-center min-w-12 w-12">
              <img :key="song?.cover" :src="song?.cover" class="min-w-12 w-12 aspect-square" />
            </div>
            <div class="flex flex-col w-full h-full" :class="{
              '!text-[var(--color-theme-2-shadow)]': song?.name == currentSong?.name,
            }">
              <h1 class="text-lg line-clamp-1">{{ song?.name }}</h1>
              <h2 class="text-sm line-clamp-1">{{ song?.album_track?.at(0)?.name }} - {{ song?.artist_track?.at(0)?.name
                }}</h2>
            </div>
          </button>
        </template>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center w-full gap-2 mt-2 mb-2 sm:my-4">
      <label for="playlist-url" class="text-pretty text-lg hidden sm:flex flex-nowrap whitespace-nowrap gap-1">
        <a class="underline underline-offset-2" target="_blank"
          :href="currentSong?.album_track?.at(0)?.url || 'https://freemusicarchive.org/music/artistShuffle'">freemusicarchive.org</a>
        url:
      </label>
      <div class="flex gap-2 flex-1 w-full">
        <input type="text" class="w-px flex-1 px-2 py-1" :placeholder="currentSong?.album_track?.at(0)?.url"
          @change="handleChange" />
        <button @click="handleChange"
          class="px-4 py-2 bg-pretty text-white rounded-lg bg-[var(--color-theme-2-shadow)]">Load</button>
      </div>
    </div>

    <MusicPlayer ref="musicPlayerRef" />
  </Layout>
</template>

<style scoped></style>
