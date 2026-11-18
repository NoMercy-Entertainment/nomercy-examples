<script setup lang="ts">

import musicPlayer, {isShuffling} from '../musicPlayerStore';

import MusicButton from './MusicButton.vue';

const handleClick = (e?: MouseEvent) => {
	e?.stopPropagation();
	musicPlayer.shuffleState(!isShuffling.value);
};

</script>

<template>
    <MusicButton label="shuffle" :onclick="handleClick">
      <span v-if="isShuffling" class="material-icons text-xl !text-[var(--color-theme-2-shadow)]">shuffle_on</span>
      <span v-else class="material-icons text-white text-xl">shuffle</span>
    </MusicButton>
</template>
