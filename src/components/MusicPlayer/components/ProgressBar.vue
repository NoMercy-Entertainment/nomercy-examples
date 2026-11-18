<script setup lang="ts">
import {PropType, ref, watch} from 'vue';
import {useDebounce} from '@vueuse/core';

import musicPlayer, {currentTime, duration, percentage} from '../musicPlayerStore';

import SliderBar from '@/components/MusicPlayer/components/SliderBar.vue';

defineProps({
	color: {
		type: String,
		required: false,
	},
  onKeyDown: {
    type: Function as PropType<(event: KeyboardEvent) => void>,
    required: false,
  },
  onKeyUp: {
    type: Function as PropType<(event: KeyboardEvent) => void>,
    required: false,
  },
});

const seekValue = ref(0);
const debouncedSeekValue = useDebounce(seekValue, 50);

watch(debouncedSeekValue, (value) => {
    musicPlayer.time(value);
});

const seek = (value: number) => {
  seekValue.value = value;
  percentage.value = value / duration.value * 100;
};

</script>

<template>
  <SliderBar
      :percentage="percentage"
      :position="currentTime"
      :min="0"
      :onKeyDown="onKeyDown"
      :onKeyUp="onKeyUp"
      :max="duration"
      @input="seek(Number(($event.target as HTMLInputElement).value))"
  />
</template>
