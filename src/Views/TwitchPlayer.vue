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

// A channel name, or any twitch.tv link (channel, clip, VOD): the plugin reads the link itself.
const sourceFrom = (value: string): { url: string; title: string } | undefined => {
  const text = value.trim();
  if (CHANNEL_NAME.test(text)) return { url: `https://www.twitch.tv/${text.toLowerCase()}`, title: text.toLowerCase() };

  try {
    const url = new URL(/^https?:\/\//u.test(text) ? text : `https://${text}`);
    if (!/^(?:www\.|m\.|clips\.)?twitch\.tv$/u.test(url.hostname)) return undefined;
    return url.pathname.length > 1 ? { url: url.href, title: url.pathname.split('/').filter(Boolean).at(-1)! } : undefined;
  }
  catch {
    return undefined;
  }
};

const blocked = 'The Twitch player could not load. A content blocker may be blocking it.';

const createPlayer = () => {
  // Live plays in this player: only Twitch's master playlist goes through this site's relay
  // (workers/twitch-playlist), video loads straight from Twitch. Clips play their raw file.
  const instance = nmplayer('twitch-player')
    .addPlugin(DesktopUiPlugin)
    .addPlugin(TwitchPlugin, { proxyUrl: `${location.origin}/twitch-playlist` })
    .setup({ playlist: [] });

  instance.on('plugin:twitch:channel:offline' as never, (({ channel: name }: { channel: string }) => {
    message.value = `${name} is offline right now. Try another channel.`;
  }) as never);
  instance.on('plugin:twitch:channel:ended' as never, (({ channel: name }: { channel: string }) => {
    message.value = `The stream of ${name} has ended.`;
  }) as never);
  // Only a fatal error stops playback; the player recovers from plain 'error' events by itself.
  instance.on('fatal', () => { message.value = blocked; });
  instance.on('playing', () => { message.value = ''; });

  player = instance;
  window.player = instance;
};

const play = async () => {
  const source = sourceFrom(field.value);
  if (!source) {
    message.value = 'Enter a channel name (4 to 25 letters, digits or underscores) or a twitch.tv link.';
    return;
  }

  message.value = `Loading ${source.title}...`;

  if (!player) createPlayer();

  // item() before the player is ready loses autoplay: setup pauses the element.
  await player!.ready();
  player!.getPlugin(TwitchPlugin)?.useTwitchPlayer(useEmbed.value);
  player!.queue([{ id: source.url, title: source.title, url: source.url }]);
  await player!.item(0, { autoplay: true });
};

// Live channels play either in the NoMercy player (raw stream via the relay) or in Twitch's own embed.
// Clips always play raw; VODs always use the embed (Twitch locks VOD video to its own site).
const useEmbed = ref(false);
const useNoMercy = ref(true);

const choosePlayer = (embed: boolean) => {
  if (useEmbed.value === embed) return;
  useEmbed.value = embed;
  useNoMercy.value = !embed;
  // A playing channel restarts in the chosen player; the old message belongs to the old player.
  message.value = '';
  player?.getPlugin(TwitchPlugin)?.useTwitchPlayer(embed);
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
  {
    label: 'NoMercy player',
    level: 0,
    active: useNoMercy,
    action: () => choosePlayer(false),
  },
  {
    label: 'Twitch embed',
    level: 0,
    active: useEmbed,
    action: () => choosePlayer(true),
  },
];

onUnmounted(() => {
  void player?.dispose();
});
</script>

<template>
  <Layout :theme="theme" title="NoMercy Entertainment - Twitch Plugin" :options="options">
    <!-- The form lives in the sidebar, so the video keeps the whole 16:10 box on every screen. -->
    <template #menu>
      <form class="flex shrink-0 flex-col gap-2 w-full" @submit.prevent="play">
        <input v-model="field"
          id="twitch-channel"
          type="text"
          class="w-full min-w-0 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500"
          placeholder="Channel name or twitch.tv link"
          aria-label="Twitch channel name, or a channel or clip link"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false" />
        <button id="twitch-play"
          type="submit"
          class="w-full px-6 py-2 rounded-lg bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition-colors">
          Play channel or clip
        </button>
      </form>

      <p id="twitch-message" role="status" class="shrink-0 my-2 min-h-6 text-sm text-neutral-300">{{ message }}</p>
    </template>

    <div id="twitch-player" class="group nomercyplayer rounded-md !overflow-unset w-full flex-1 min-h-0"></div>
  </Layout>
</template>
