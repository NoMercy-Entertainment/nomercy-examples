<script setup lang="ts">
import { onUnmounted, ref } from "vue";

import nmplayer, { type NMVideoPlayer } from "@nomercy-entertainment/nomercy-video-player";
import { DesktopUiPlugin, TwitchPlugin } from "@nomercy-entertainment/nomercy-video-player/plugins";

import type { Option } from "@/types/types";

import Layout from "@/Views/Layout.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-3',
  },
});

// A Twitch login is 4 to 25 letters, digits or underscores.
const CHANNEL_NAME = /^\w{4,25}$/u;

const field = ref('');
const message = ref('');
let player: NMVideoPlayer | undefined;

const channelFrom = (value: string): string | undefined => {
  const text = value.trim();
  if (CHANNEL_NAME.test(text)) return text.toLowerCase();

  try {
    const url = new URL(/^https?:\/\//u.test(text) ? text : `https://${text}`);
    if (!/^(?:www\.|m\.)?twitch\.tv$/u.test(url.hostname)) return undefined;
    const name = url.pathname.split('/').filter(Boolean)[0] ?? '';
    return CHANNEL_NAME.test(name) ? name.toLowerCase() : undefined;
  }
  catch {
    return undefined;
  }
};

const blocked = 'The Twitch player could not load. A content blocker may be blocking it.';

const createPlayer = () => {
  // No proxyUrl: a live channel plays through Twitch's own embed.
  const instance = nmplayer('twitch-player')
    .addPlugin(DesktopUiPlugin)
    .addPlugin(TwitchPlugin)
    .setup({ playlist: [] });

  instance.on('plugin:twitch:channel:offline' as never, (({ channel: name }: { channel: string }) => {
    message.value = `${name} is offline right now. Try another channel.`;
  }) as never);
  instance.on('plugin:twitch:channel:ended' as never, (({ channel: name }: { channel: string }) => {
    message.value = `The stream of ${name} has ended.`;
  }) as never);
  instance.on('fatal', () => { message.value = blocked; });
  instance.on('error', () => { message.value = blocked; });
  instance.on('playing', () => { message.value = ''; });

  player = instance;
  window.player = instance;
};

const play = async () => {
  const name = channelFrom(field.value);
  if (!name) {
    message.value = 'Enter a channel name (4 to 25 letters, digits or underscores) or a twitch.tv link.';
    return;
  }

  message.value = `Loading ${name}...`;

  if (!player) createPlayer();

  player!.queue([{ id: name, title: name, url: `https://www.twitch.tv/${name}` }]);
  await player!.item(0, { autoplay: true });
};

const options: Option[] = [
  {
    label: 'Play',
    level: 0,
    action: () => { void play(); },
  },
  {
    label: 'Pause',
    level: 0,
    action: () => { void player?.pause(); },
  },
];

onUnmounted(() => {
  void player?.dispose();
});
</script>

<template>
  <Layout :theme="theme" title="NoMercy Entertainment - Twitch Plugin" :options="options">
    <div id="twitch-player" class="group nomercyplayer rounded-md !overflow-unset w-full aspect-video"></div>

    <form class="flex flex-col sm:flex-row gap-2 mt-4 w-full" @submit.prevent="play">
      <input v-model="field"
        id="twitch-channel"
        type="text"
        class="flex-1 min-w-0 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500"
        placeholder="Channel name or twitch.tv link"
        aria-label="Twitch channel"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false" />
      <button id="twitch-play"
        type="submit"
        class="px-6 py-2 rounded-lg bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition-colors">
        Play
      </button>
    </form>

    <p id="twitch-message" role="status" class="mt-2 min-h-6 text-sm text-neutral-300">{{ message }}</p>
  </Layout>
</template>
