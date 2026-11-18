import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { twitchPlaylistRelay } from './workers/twitch-playlist/vite-plugin.mjs'

// Stub out @jofr/capacitor-media-session — only used on native, not web.
// Must be enforce: 'pre' so it runs before Rollup's own resolution, which
// otherwise errors on the missing named export before our plugin can intercept.
function stubCapacitorMediaSession() {
  const id = '\0capacitor-media-session-stub';
  return {
    name: 'stub-capacitor-media-session',
    enforce: 'pre',
    resolveId(source) { return source === '@jofr/capacitor-media-session' ? id : null; },
    load(resolvedId) {
      if (resolvedId !== id) return null;
      return 'export class MediaSession {}; export const ActionHandler = undefined; export default MediaSession;';
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    stubCapacitorMediaSession(),
    vue(),
    vueDevTools(),
    twitchPlaylistRelay(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Resolve to TS source so Vite compiles it as ESM — the CJS dist has
      // __esModule without exports.default, which breaks Rollup's default import.
      // The 1.0.0 src/index.ts doesn't have the capacitor import; the 0.1.x does
      // but the stub handles it.
      '@nomercy-entertainment/media-session': fileURLToPath(
        new URL('./node_modules/@nomercy-entertainment/media-session/src/index.ts', import.meta.url)
      ),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
