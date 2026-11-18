<script setup lang="ts">
import HomeCard from "@/components/HomeCard.vue";
</script>

<template>
  <HomeCard route="/twitch">
    <div class="text-right text-sm group-hover/card:text-base  group-hover/card:font-bold transition-all duration-300 delay-0">
      Twitch plugin
    </div>
    <div class="absolute center top-0 left-0 w-full h-full flex items-center justify-center !bg-gradient-circle-c from-black/40 from-15% via-70% via-black/40 to-100% to-black/0">
      <span class="material-icons text-white text-4xl -mt-10">play_arrow</span>
    </div>

    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neutral-900/60 to-neutral-800/60">
      <div class="flex items-center p-2 gap-2">
        <span class="flex flex-1 h-7 items-center px-2 rounded bg-neutral-700 text-neutral-400 text-xs">Channel name</span>
        <span class="material-icons text-white">play_arrow</span>
      </div>
    </div>
  </HomeCard>
</template>

<style scoped>
.material-icons {
  font-size: 1.2rem;
}
.center .material-icons {
  font-size: 3rem;
  transition: all 0.5s
}
.group\/card:hover  .center .material-icons {
  font-size: 3.5rem;
}
</style>
