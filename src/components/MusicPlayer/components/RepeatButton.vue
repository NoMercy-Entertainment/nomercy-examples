<script setup lang="ts">
import {onMounted} from 'vue';

import MusicButton from './MusicButton.vue';
import {useCycleList} from '@vueuse/core';
import type {RepeatState} from '@nomercy-entertainment/nomercy-music-player';
import musicPlayer from '../musicPlayerStore';

const states = [
  'off',
  'one',
  'all',
];

const {state, next, go} = useCycleList<'off' | 'one' | 'all'>([
  'off',
  'one',
  'all',
]);

onMounted(() => {
  go(states.indexOf(musicPlayer.repeatState()));

});

const handleClick = (e?: MouseEvent) => {
  e?.stopPropagation();
  next();
  musicPlayer.repeatState(state.value as RepeatState);
};
</script>

<template>
  <MusicButton :label="`repeat ${state}`" :key="state" :onclick="handleClick">
    <span v-if="state == 'off'" class="material-icons text-white text-xl">repeat</span>
    <span v-else-if="state == 'one'" class="material-icons  text-xl !text-[var(--color-theme-2-shadow)]">repeat_one_on</span>
    <span  v-else-if="state == 'all'" class="material-icons  text-xl !text-[var(--color-theme-2-shadow)]">repeat_on</span>
  </MusicButton>
</template>
