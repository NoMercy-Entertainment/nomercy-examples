import {RouteRecordRaw} from "vue-router";
import {computed} from "vue";

const currentPage = computed(() => {
	const host = window.location.host;
	const subdomain = host.split('.')[0];

	if (subdomain === 'videoplayer') {
		return import('@/Views/VideoPlayer.vue');
	} else if (subdomain === 'musicplayer') {
		return import('@/Views/MusicPlayer.vue');
	} else {
		return import('@/Views/Home.vue');
	}
});

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => currentPage.value,
		children: [],
	},
	{
		path: '/videoplayer',
		component: () => import('@/Views/VideoPlayer.vue'),
		props: {
			theme: 'theme-1',
		}
	},
	{
		path: '/musicplayer',
		component: () => import('@/Views/MusicPlayer.vue'),
		props: {
			theme: 'theme-2',
		}
	},
	{
		path: '/tutorial',
		component: () => import('@/Views/TutorialPlayer.vue'),
		props: {
			theme: 'theme-1',
		}
	},
	{
		path: '/twitch',
		component: () => import('@/Views/TwitchPlayer.vue'),
		props: {
			theme: 'theme-3',
		}
	},
	{
		path: '/page3',
		component: () => import('@/Views/Page3.vue'),
		props: {
			theme: 'theme-3',
		}
	},
	{
		path: '/page4',
		component: () => import('@/Views/Page4.vue'),
		props: {
			theme: 'theme-4',
		}
	},
	{
		path: '/page5',
		component: () => import('@/Views/Page5.vue'),
		props: {
			theme: 'theme-5',
		}
	},
	{
		path: '/page6',
		component: () => import('@/Views/Page6.vue'),
		props: {
			theme: 'theme-6',
		}
	}
];