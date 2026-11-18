<script setup lang="ts">
import { type PropType } from 'vue';
import { Option } from "@/types/types";
import Menu from "@/components/Menu.vue";
import HomeCorner from "@/components/HomeCorner.vue";
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
  title: {
    type: String,
    default: 'NoMercy Entertainment',
  },
  options: {
    type: Array as PropType<Array<Option>>,
    required: true,
  },
  backButton: {
    type: Boolean,
    default: false,
  },
  activeChild: {
    type: String,
    default: "main",
  },
});

</script>

<template>
  <HomeCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <GithubCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <div class="w-full sm:h-32 sm:min-h-32 flex items-center justify-center sm:px-8 mt-8 text-pretty landscape:hidden">
    <h1 class="text-2xl sm:text-4xl font-bold text-center py-4">
      {{ title }}
    </h1>
  </div>
  <div id="container"
    class="flex flex-nowrap landscape:flex-row landscape:h-screen landscape:max-h-screen flex-col-reverse justify-center sm:justify-evenly items-center w-full gap-4 landscape:gap-4 sm:gap-16 px-4 sm:px-16 sm:flex-row flex-1 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-16rem)] overflow-clip landscape:mt-8">

    <aside id="menu"
      class="relative overflow-clip bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col w-full landscape:w-3/5 sm:w-1/3 max-w-sm min-h-[40dvh] sm:h-available max-h-[min(39.5vw,90vh)] border border-neutral-700 p-2 sm:p-4 sm:mr-auto">
      <slot name="menu" />
      <Menu :options="options as Option[]" :class="theme" :style="`
                  --color-1: var(--color-${theme}-shadow);
                  --color-2: var(--color-${theme}-border);
            `" />
    </aside>

    <main id="wrapper"
      class="relative overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col w-full aspect-[16/10] 5xl:aspect-[16/9.5] sm:max-w-[120rem] border border-neutral-700 p-2 sm:p-4 z-0">
      <slot />
    </main>
  </div>
</template>

<style scoped>
#container {
  transition: padding 0.4s ease, gap 0.4s ease;
}

#wrapper {
  transition: max-width 0.4s ease;
}

#menu {
  transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease;
  transform-origin: left center;
}

#menu.theater-hidden {
  opacity: 0;
  transform: scaleX(0);
  width: 0;
  padding: 0;
  min-height: 0;
  overflow: hidden;
  border: none;
}
</style>