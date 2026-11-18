<script setup lang="ts">
import {ref, watch} from 'vue';

import musicPlayer from '../musicPlayerStore';

import SliderBar from '@/components/MusicPlayer/components/SliderBar.vue';

const CURVE = 1.5;

function calculateLogVolume(sliderValue: number, p = CURVE) {
  const normalizedValue = sliderValue / 100;
  return Math.pow(normalizedValue, p) * 100;
}

const volumePercentage = ref<number>(Math.pow(musicPlayer.volume() / 100, 1 / CURVE) * 100);

watch(volumePercentage, (value) => {
  const volume = calculateLogVolume(value);
  musicPlayer.volume(volume);
});

</script>

<template>
  <SliderBar
      :percentage="volumePercentage"
      :position="volumePercentage"
      @input="volumePercentage = Number(($event.target as HTMLInputElement).value)"
      :min="0"
      :step="1"
      :max="100"
  />
</template>
