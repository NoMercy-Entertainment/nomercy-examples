import { defineConfig } from '@playwright/test';

const PORT = 4173;
const output = process.env.E2E_OUT ?? 'C:/Projects/.work/tmp/examples-proof';
// E2E_BASE_URL runs the suite against a deployed site (the live proof) instead of a local preview.
const liveBase = process.env.E2E_BASE_URL;

export default defineConfig({
	testDir: '.',
	testMatch: '*.spec.mjs',
	timeout: 60_000,
	workers: Number(process.env.E2E_WORKERS ?? 3),
	reporter: [['list'], ['./results-reporter.mjs', { file: `${output}/results.json` }]],
	use: {
		baseURL: liveBase ?? `http://127.0.0.1:${PORT}`,
		headless: true,
		launchOptions: { args: ['--mute-audio'] },
	},
	projects: [
		// The bundled Chromium has no H.264 decoder; installed Chrome does, and the media is H.264.
		{ name: 'chromium', use: { browserName: 'chromium', channel: 'chrome' } },
		{ name: 'firefox', use: { browserName: 'firefox' } },
		{ name: 'webkit', use: { browserName: 'webkit' } },
	],
	webServer: liveBase
		? undefined
		: {
				command: `corepack yarn preview --host 127.0.0.1 --port ${PORT} --strictPort`,
				cwd: '../..',
				url: `http://127.0.0.1:${PORT}/`,
				reuseExistingServer: false,
				timeout: 60_000,
			},
});
