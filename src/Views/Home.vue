<script setup lang="ts">
import GithubCorner from "@/components/GithubCorner.vue";
import HomeCard from "@/components/HomeCard.vue";
import VideoPlayerCard from "@/components/VideoPlayer/VideoPlayerCard.vue";
import MusicPlayerCard from "@/components/MusicPlayer/MusicPlayerCard.vue";
import TwitchPlayerCard from "@/components/TwitchPlayer/TwitchPlayerCard.vue";
</script>

<template>
  <GithubCorner />
  <div class="w-full h-32 min-h-32 flex items-center justify-center px-8 mt-8 text-pretty">
    <h1 class="text-2xl sm:text-4xl font-bold text-center">
        NoMercy Entertainment - Library Examples
    </h1>
  </div>
  <div id="container"
       class="flex flex-wrap flex-col-reverse justify-end sm:justify-evenly items-center w-full gap-4 sm:flex-row flex-1 p-4 sm:p-16 max-w-[120rem]">

    <VideoPlayerCard />

    <MusicPlayerCard />

    <TwitchPlayerCard />

    <HomeCard route="/page3">
    </HomeCard>

    <HomeCard route="/page4">
    </HomeCard>

    <HomeCard route="/page5">
    </HomeCard>

    <HomeCard route="/page6">
    </HomeCard>
  </div>
</template>

<style scoped>
</style>