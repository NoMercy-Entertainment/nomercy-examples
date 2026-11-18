<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import nmplayer, { type NMVideoPlayer } from "@nomercy-entertainment/nomercy-video-player";
import {
  DesktopUiPlugin,
  OctopusPlugin,
  SubtitleOverlayPlugin,
} from "@nomercy-entertainment/nomercy-video-player/plugins";

declare global {
  interface Window {
    player: NMVideoPlayer;
    nmplayer: typeof nmplayer;
  }
}

import config, { desktopUiOptions } from "./config";

const props = defineProps({
  language: {
    type: String,
    default: 'en',
  },
  withUi: {
    type: Boolean,
    default: true,
  },
});

const player = ref<NMVideoPlayer>();

onMounted(() => {
  const instance = nmplayer('player1');

  if (props.withUi) {
    instance.addPlugin(DesktopUiPlugin, desktopUiOptions);
  }

  instance
    .addPlugin(SubtitleOverlayPlugin)
    // The local copy of the subtitle worker; the plugin's default points at the fork's own build.
    .addPlugin(OctopusPlugin, {
      workerUrl: '/js/octopus/subtitles-octopus-worker.js',
      legacyWorkerUrl: '/js/octopus/subtitles-octopus-worker-legacy.js',
      fallbackFont: '/js/octopus/default.ttf',
    })
    .setup({ ...config, language: props.language });

  player.value = instance;
  window.player = instance;
  window.nmplayer = nmplayer;
});

onUnmounted(() => {
  void player.value?.dispose();
});

defineExpose({
  get player() { return player.value; },
});

</script>

<template>
  <div id="player1" class="group nomercyplayer rounded-md !overflow-unset w-full flex-1 min-h-0"></div>
</template>

<style >
video::-webkit-media-text-track-container {
  display: none;
}
</style>
