<script setup lang="ts">

import {computed} from "vue";

const githubUrl = computed(() => {
  const pathname = window.location.pathname;

  if (pathname === '/videoplayer') {
    return 'https://github.com/NoMercy-Entertainment/nomercy-player-web/tree/master/packages/video-player';
  } else if (pathname === '/musicplayer') {
    return 'https://github.com/NoMercy-Entertainment/nomercy-player-web/tree/master/packages/music-player'
  } else {
    return 'https://github.com/NoMercy-Entertainment';
  }
});

</script>

<template>
  <a v-if="githubUrl" :href="githubUrl" target="_blank" class="github-corner"
     aria-label="View source on Github">
    <svg viewBox="0 0 250 250">
      <g clip-path="url(#clip0_1078_4140)">
        <path d="M0 0L250 250V0H0Z" fill="var(--color-theme)"/>
        <path d="M128.301 109C113.801 99.7003 119.001 89.6003 119.001 89.6003C122.001 82.7003 120.501 78.6003 120.501 78.6003C119.201 72.0003 123.401 76.3003 123.401 76.3003C127.301 80.9003 125.501 87.3003 125.501 87.3003C122.901 97.6003 130.601 101.9 134.401 103.2"
              fill="white" class="octo-arm"  style="transform-origin: 130px 106px;"/>
        <path d="M115 115C114.9 115.1 118.7 116.5 119.8 115.4L133.7 101.6C136.9 99.1996 139.9 98.3996 142.2 98.5996C133.8 87.9996 127.5 74.3996 143.8 57.9996C148.5 53.3996 154 51.1996 159.7 50.9996C160.3 49.3996 163.2 43.5996 171.4 40.0996C171.4 40.0996 176.1 42.4996 178.8 56.1996C183.1 58.5996 187.2 61.7996 190.9 65.3996C194.5 68.9996 197.7 73.1996 200.1 77.5996C213.8 80.1996 216.3 84.8996 216.3 84.8996C212.7 93.0996 206.9 95.9996 205.4 96.5996C205.1 102.4 203 107.8 198.3 112.5C181.9 128.9 168.3 122.5 157.7 114.1C157.9 116.9 156.7 120.9 152.7 124.9L141 136.5C139.8 137.7 141.6 141.9 141.8 141.8L115 115Z"
              fill="white" class="octo-body"/>
      </g>
      <defs>
        <clipPath id="clip0_1078_4140">
          <rect width="250" height="250" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </a>
</template>

<style scoped>

a {
  color: white;
  text-decoration: none;
}

.github-corner {
  position: absolute;
  z-index: 40;
  top: 0;
  right: 0;
  border-bottom: 0;
  text-decoration: none;
}

.github-corner svg {
  height: 70px;
  width: 70px;
}

.github-corner:hover .octo-arm {
  -webkit-animation: octocat-wave 560ms ease-in-out;
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {

  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}
</style>