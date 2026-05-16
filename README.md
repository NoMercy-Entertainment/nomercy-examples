# nomercy-examples

Live example site for the NoMercy Player SDK. Runs at [examples.nomercy.tv](https://examples.nomercy.tv).

---

## What this site demonstrates

Interactive examples of each player package in a real browser environment. Every example shows a working integration against live media.

| Example | Package | What it shows |
|---------|---------|--------------|
| Video Player | `@nomercy-entertainment/nomercy-video-player` | HLS playback, subtitle selection, quality levels, chapter navigation, skip markers, desktop UI |
| Music Player | `@nomercy-entertainment/nomercy-music-player` | Queue management, crossfade, EQ, lyrics, MediaSession |
| Tutorial Player | Both | Step-by-step plugin UI build — matches the [wiki guide](https://github.com/NoMercy-Entertainment/nomercy-video-player/wiki) |

---

## Stack

- Vue 3 (Composition API)
- Vite 6
- TypeScript

---

## Running locally

```
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`. Media sources require a live NoMercy media server or public test URLs configured in `src/lib/`.

---

## Packages used

```
@nomercy-entertainment/nomercy-video-player
@nomercy-entertainment/nomercy-music-player
@nomercy-entertainment/nomercy-player-core
```

---

## Documentation

- Player SDK docs: [docs.nomercy.tv/player](https://docs.nomercy.tv/player)
- Video player quick start: [docs.nomercy.tv/player/quickstart](https://docs.nomercy.tv/player/quickstart)
- Migration guide (v1 → v2): [docs.nomercy.tv/player/migration-v1-v2](https://docs.nomercy.tv/player/migration-v1-v2)
- Plugin standard: [docs.nomercy.tv/player/plugin-standard](https://docs.nomercy.tv/player/plugin-standard)
- Video player wiki: [github.com/NoMercy-Entertainment/nomercy-video-player/wiki](https://github.com/NoMercy-Entertainment/nomercy-video-player/wiki)
- Music player wiki: [github.com/NoMercy-Entertainment/nomercy-music-player/wiki](https://github.com/NoMercy-Entertainment/nomercy-music-player/wiki)

---

## Build

```
npm run build
```

Output goes to `dist/`. Deployed to `examples.nomercy.tv` via CI.
