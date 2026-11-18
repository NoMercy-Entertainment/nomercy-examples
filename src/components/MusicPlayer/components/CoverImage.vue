<script setup lang="ts">
import {type PropType} from 'vue';

import logo from '@/assets/logo.svg';

import type {PlaylistItem} from "@/components/MusicPlayer/playlists";

defineProps({
  data: {
    type: Object as PropType<PlaylistItem | null>,
    required: false,
  },
  className: {
    type: String,
    required: false,
    default: '',
  },
});

</script>

<template>
  <div :class="`${className} aspect-square relative z-0 overflow-clip`">
      <img  v-if="data"
            :src="`${data?.cover}`"
           alt="cover image"
           :id="data.id"
           class="aspect-square !absolute inset-0 overflow-clip z-10 h-available w-available object-cover"
           tabindex="-1"
           crossorigin="anonymous"
      />

    <img v-else :src="logo" alt="logo"
                   class="z-0 overflow-clip bg-black p-[15%] h-available w-available" />
  </div>
</template>
