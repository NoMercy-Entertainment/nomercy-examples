<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import nmplayer, { type NMPlayer, OctopusPlugin } from "@nomercy-entertainment/nomercy-video-player";

declare global {
  interface Window {
    player: NMPlayer;
    nmplayer: typeof nmplayer;
  }
}

import config from "./config";

const props = defineProps({
  language: {
    type: String,
    default: 'en',
  },
});

const player = ref<NMPlayer>();

onMounted(() => {
    player.value = nmplayer('player1')
        .setup({ ...config, language: props.language }) as unknown as NMPlayer;

  // The local copy of the subtitle worker; the plugin's CDN default resolves to an old build.
  const octopusPlugin = new OctopusPlugin({
    workerUrl: '/js/octopus/subtitles-octopus-worker.js',
    legacyWorkerUrl: '/js/octopus/subtitles-octopus-worker-legacy.js',
    fallbackFont: '/js/octopus/default.ttf',
  });
  player.value?.registerPlugin('octopus', octopusPlugin);
  player.value?.usePlugin('octopus');

  window.player = player.value!;
  window.nmplayer = nmplayer;
});

onUnmounted(() => {
  player.value?.dispose();
});

defineExpose({
  get player() { return player.value; },
});

</script>

<template>
  <div id="player1" class="group nomercyplayer rounded-md !overflow-unset"></div>
</template>

<style >
video::-webkit-media-text-track-container {
  display: none;
}
</style>