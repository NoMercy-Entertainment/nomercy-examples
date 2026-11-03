import Plugin from '@nomercy-entertainment/nomercy-video-player/src/plugin';
import type { Icon, NMPlayer } from '@nomercy-entertainment/nomercy-video-player/src/types';

const icons: Icon = {
	play: {
		classes: [],
		title: 'Pause',
		normal: 'M7.60846 4.61586C7.1087 4.34394 6.5 4.7057 6.5 5.27466V18.727C6.5 19.2959 7.1087 19.6577 7.60846 19.3858L19.97 12.6596C20.4921 12.3755 20.4921 11.6261 19.97 11.342L7.60846 4.61586ZM5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
		hover: 'M5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
	},
	pause: {
		classes: [],
		title: 'Play',
		normal: 'M6.25 3C5.00736 3 4 4.00736 4 5.25V18.75C4 19.9926 5.00736 21 6.25 21H8.75C9.99264 21 11 19.9926 11 18.75V5.25C11 4.00736 9.99264 3 8.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H8.75C9.16421 4.5 9.5 4.83579 9.5 5.25V18.75C9.5 19.1642 9.16421 19.5 8.75 19.5H6.25C5.83579 19.5 5.5 19.1642 5.5 18.75V5.25ZM15.25 3C14.0074 3 13 4.00736 13 5.25V18.75C13 19.9926 14.0074 21 15.25 21H17.75C18.9926 21 20 19.9926 20 18.75V5.25C20 4.00736 18.9926 3 17.75 3H15.25ZM14.5 5.25C14.5 4.83579 14.8358 4.5 15.25 4.5H17.75C18.1642 4.5 18.5 4.83579 18.5 5.25V18.75C18.5 19.1642 18.1642 19.5 17.75 19.5H15.25C14.8358 19.5 14.5 19.1642 14.5 18.75V5.25Z',
		hover: 'M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609ZM14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z',
	},
	seekBack: {
		classes: [],
		title: 'Seek Back',
		hover: 'M3 2.25C2.44772 2.25 2 2.69772 2 3.25V9C2 9.55228 2.44772 10 3 10H8.25C8.80228 10 9.25 9.55228 9.25 9C9.25 8.44772 8.80228 8 8.25 8H4.86322C5.84764 6.82148 7.07149 5.88667 8.54543 5.43056C10.5599 4.80719 12.6883 4.86076 14.6512 5.5909C16.6322 6.3278 18.4615 7.82215 19.373 9.48443C19.6385 9.96869 20.2463 10.146 20.7306 9.88048C21.2149 9.61495 21.3922 9.00712 21.1267 8.52286C19.9517 6.38003 17.7122 4.59567 15.3485 3.71639C12.9665 2.83033 10.3848 2.76779 7.9542 3.51995C6.37802 4.00769 5.0679 4.8994 4 5.97875V3.25C4 2.69772 3.55228 2.25 3 2.25ZM9.75015 12C9.75015 11.5806 9.48843 11.2057 9.0947 11.0612C8.70097 10.9167 8.2589 11.0333 7.98758 11.3531C7.91356 11.4403 7.84033 11.5288 7.76611 11.6185C7.25079 12.2412 6.68817 12.921 5.48566 13.6425C5.01208 13.9266 4.85851 14.5409 5.14266 15.0145C5.42681 15.4881 6.04107 15.6416 6.51465 15.3575C6.9978 15.0676 7.40387 14.7762 7.75015 14.4929V19.9998C7.75015 20.5521 8.19795 20.9998 8.75028 20.9998C9.30252 20.9997 9.75015 20.552 9.75015 19.9998V12ZM16.25 11C14.8639 11 13.8505 11.6354 13.2417 12.6611C12.678 13.6107 12.5 14.8223 12.5 16C12.5 17.1777 12.678 18.3893 13.2417 19.3389C13.8505 20.3646 14.8639 21 16.25 21C17.6361 21 18.6495 20.3646 19.2583 19.3389C19.822 18.3893 20 17.1777 20 16C20 14.8223 19.822 13.6107 19.2583 12.6611C18.6495 11.6354 17.6361 11 16.25 11ZM14.5 16C14.5 14.9686 14.6658 14.1802 14.9615 13.682C15.212 13.26 15.5736 13 16.25 13C16.9264 13 17.288 13.26 17.5385 13.682C17.8342 14.1802 18 14.9686 18 16C18 17.0314 17.8342 17.8198 17.5385 18.318C17.288 18.74 16.9264 19 16.25 19C15.5736 19 15.212 18.74 14.9615 18.318C14.6658 17.8198 14.5 17.0314 14.5 16Z',
		normal: 'M2.74999 2.5C2.33578 2.5 2 2.83579 2 3.25V8.75C2 9.16421 2.33578 9.5 2.74999 9.5H8.25011C8.66432 9.5 9.00011 9.16421 9.00011 8.75C9.00011 8.33579 8.66432 8 8.25011 8H4.34273C5.40077 6.60212 6.77033 5.4648 8.47169 4.93832C10.5381 4.29885 12.7232 4.35354 14.7384 5.10317C16.7673 5.85787 18.6479 7.38847 19.5922 9.11081C19.7914 9.47401 20.2473 9.607 20.6105 9.40785C20.9736 9.20871 21.1066 8.75284 20.9075 8.38964C19.7655 6.30687 17.5773 4.55877 15.2614 3.69728C12.9318 2.83072 10.4069 2.7693 8.02826 3.50536C6.14955 4.08673 4.65345 5.26153 3.49999 6.64949V3.25C3.49999 2.83579 3.1642 2.5 2.74999 2.5ZM8.95266 11.0278C9.27643 11.1186 9.50022 11.4138 9.50022 11.75V20.25C9.50022 20.6642 9.16443 21 8.75022 21C8.33601 21 8.00023 20.6642 8.00023 20.25V13.8328C7.61793 14.202 7.16004 14.5788 6.63611 14.8931C6.28093 15.1062 5.82024 14.9911 5.60713 14.6359C5.39402 14.2807 5.5092 13.82 5.86438 13.6069C6.53976 13.2017 7.10401 12.6421 7.50653 12.1678C7.70552 11.9334 7.85963 11.7261 7.96279 11.5793C8.01427 11.5061 8.05276 11.4483 8.07751 11.4103C8.08989 11.3913 8.0988 11.3772 8.10417 11.3687L8.10951 11.3602L8.11019 11.359C8.28503 11.072 8.629 10.9371 8.95266 11.0278ZM13.1988 12.629C13.7527 11.6377 14.6822 11 16.002 11C17.3218 11 18.2513 11.6377 18.8052 12.629C19.3266 13.5624 19.502 14.7762 19.502 16C19.502 17.2238 19.3266 18.4376 18.8052 19.371C18.2513 20.3623 17.3218 21 16.002 21C14.6822 21 13.7527 20.3623 13.1988 19.371C12.6774 18.4376 12.502 17.2238 12.502 16C12.502 14.7762 12.6774 13.5624 13.1988 12.629ZM14.5083 13.3606C14.1704 13.9654 14.002 14.8766 14.002 16C14.002 17.1234 14.1704 18.0346 14.5083 18.6394C14.8139 19.1863 15.2593 19.5 16.002 19.5C16.7447 19.5 17.1901 19.1863 17.4957 18.6394C17.8336 18.0346 18.002 17.1234 18.002 16C18.002 14.8766 17.8336 13.9654 17.4957 13.3606C17.1901 12.8137 16.7447 12.5 16.002 12.5C15.2593 12.5 14.8139 12.8137 14.5083 13.3606Z',
	},
	seekForward: {
		classes: [],
		title: 'Seek Forward',
		hover: 'M21 2.25C21.5523 2.25 22 2.69772 22 3.25001V9.00005C22 9.55234 21.5523 10.0001 21 10.0001H15.75C15.1977 10.0001 14.75 9.55234 14.75 9.00005C14.75 8.44777 15.1977 8.00005 15.75 8.00005H19.1369C18.1525 6.82145 16.9286 5.88657 15.4546 5.43043C13.4401 4.80706 11.3117 4.86063 9.34883 5.59077C7.3678 6.32768 5.53848 7.82204 4.62703 9.48433C4.3615 9.9686 3.75367 10.1459 3.2694 9.88039C2.78514 9.61486 2.60782 9.00703 2.87335 8.52276C4.04829 6.37991 6.28776 4.59554 8.65155 3.71625C11.0335 2.83019 13.6152 2.76764 16.0458 3.51981C17.622 4.00755 18.9321 4.89926 20 5.97863V3.25001C20 2.69772 20.4477 2.25 21 2.25ZM9.0947 11.0611C9.48843 11.2056 9.75015 11.5805 9.75015 11.9999V19.9998C9.75015 20.552 9.30252 20.9997 8.75028 20.9998C8.19795 20.9998 7.75015 20.5521 7.75015 19.9998V14.4929C7.40387 14.7762 6.9978 15.0675 6.51465 15.3574C6.04107 15.6416 5.42681 15.488 5.14266 15.0144C4.85851 14.5409 5.01208 13.9266 5.48566 13.6424C6.68817 12.9209 7.25079 12.2411 7.76611 11.6184C7.84033 11.5288 7.91356 11.4403 7.98758 11.353C8.2589 11.0332 8.70097 10.9166 9.0947 11.0611ZM13.2417 12.6611C13.8505 11.6354 14.8639 10.9999 16.25 10.9999C17.6361 10.9999 18.6495 11.6354 19.2583 12.6611C19.822 13.6106 20 14.8222 20 16C20 17.1777 19.822 18.3893 19.2583 19.3389C18.6495 20.3645 17.6361 21 16.25 21C14.8639 21 13.8505 20.3645 13.2417 19.3389C12.678 18.3893 12.5 17.1777 12.5 16C12.5 14.8222 12.678 13.6106 13.2417 12.6611ZM14.9615 13.682C14.6658 14.1801 14.5 14.9686 14.5 16C14.5 17.0314 14.6658 17.8198 14.9615 18.318C15.212 18.74 15.5736 19 16.25 19C16.9264 19 17.288 18.74 17.5385 18.318C17.8342 17.8198 18 17.0314 18 16C18 14.9686 17.8342 14.1801 17.5385 13.682C17.288 13.2599 16.9264 12.9999 16.25 12.9999C15.5736 12.9999 15.212 13.2599 14.9615 13.682Z',
		normal: 'M21.25 2.5C21.6642 2.5 22 2.83579 22 3.25V8.75C22 9.16421 21.6642 9.5 21.25 9.5H15.7499C15.3357 9.5 14.9999 9.16421 14.9999 8.75C14.9999 8.33578 15.3357 8 15.7499 8H19.6573C18.5992 6.60212 17.2297 5.4648 15.5283 4.93832C13.4619 4.29885 11.2768 4.35354 9.26156 5.10317C7.23271 5.85787 5.35214 7.38846 4.40776 9.11081C4.20861 9.47401 3.75274 9.607 3.38955 9.40785C3.02635 9.2087 2.89336 8.75283 3.09251 8.38964C4.23451 6.30687 6.42268 4.55877 8.73861 3.69728C11.0682 2.83072 13.5931 2.7693 15.9717 3.50536C17.8504 4.08673 19.3465 5.26153 20.5 6.64949V3.25C20.5 2.83579 20.8358 2.5 21.25 2.5ZM16.0018 11C14.6821 11 13.7525 11.6377 13.1987 12.629C12.6772 13.5624 12.5019 14.7762 12.5019 16C12.5019 17.2238 12.6772 18.4376 13.1987 19.371C13.7525 20.3623 14.6821 21 16.0018 21C17.3216 21 18.2512 20.3623 18.805 19.371C19.3265 18.4376 19.5018 17.2238 19.5018 16C19.5018 14.7762 19.3265 13.5624 18.805 12.629C18.2512 11.6377 17.3216 11 16.0018 11ZM14.0019 16C14.0019 14.8766 14.1703 13.9654 14.5082 13.3606C14.8137 12.8137 15.2591 12.5 16.0018 12.5C16.7446 12.5 17.19 12.8137 17.4955 13.3606C17.8334 13.9654 18.0018 14.8766 18.0018 16C18.0018 17.1234 17.8334 18.0346 17.4955 18.6394C17.19 19.1863 16.7446 19.5 16.0018 19.5C15.2591 19.5 14.8137 19.1863 14.5082 18.6394C14.1703 18.0346 14.0019 17.1234 14.0019 16ZM9.50005 11.75C9.50005 11.4138 9.27626 11.1186 8.9525 11.0278C8.62884 10.9371 8.28486 11.072 8.11003 11.359L8.10935 11.3602L8.10401 11.3687C8.09864 11.3772 8.08972 11.3913 8.07735 11.4103C8.05259 11.4483 8.0141 11.5061 7.96263 11.5793C7.85946 11.7261 7.70536 11.9334 7.50637 12.1678C7.10384 12.6421 6.5396 13.2016 5.86422 13.6069C5.50903 13.82 5.39386 14.2807 5.60697 14.6359C5.82008 14.9911 6.28077 15.1062 6.63595 14.8931C7.15988 14.5788 7.61776 14.202 8.00007 13.8328V20.25C8.00007 20.6642 8.33585 21 8.75006 21C9.16427 21 9.50005 20.6642 9.50005 20.25V11.75Z',
	},
};

export class StepPlugin extends Plugin {
	declare player: NMPlayer<any>;

	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private overlay!: HTMLDivElement;
	private centerButton!: HTMLButtonElement;
	private spinner!: HTMLDivElement;
	private bottomRow!: HTMLDivElement;
	private playbackButton!: HTMLButtonElement;
	private sliderBar!: HTMLDivElement;
	private isMouseDown = false;
	private currentTimeLabel!: HTMLSpanElement;
	private durationLabel!: HTMLSpanElement;

	initialize(player: NMPlayer<any>) {
		this.player = player;
	}

	use() {
		this.overlay = this.player.overlay;
		this.createTopBar();
		this.createCenterButton();
		this.createSpinner();
		this.createBottomBar();
		this.createProgressBar();
		this.createBottomRow();
		this.createPlaybackButton();
		this.createSkipButtons();
		this.createTimeDisplay();

		if (this.player.videoElement?.paused) {
			this.player.container.classList.add('paused');
		} else {
			this.centerButton.style.display = 'none';
			this.player.emit('play');
		}
	}

	dispose() {
		this.topBar?.remove();
		this.bottomBar?.remove();
		this.centerButton?.remove();
		this.spinner?.remove();
	}

	private createTopBar() {
		this.topBar = this.player
			.createElement('div', 'top-bar')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'right-0',
				'flex', 'items-center', 'gap-2',
				'p-4', 'pb-12',
				'bg-gradient-to-b', 'from-black/80', 'to-transparent',
				'opacity-0', 'transition-opacity', 'duration-300', 'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createBottomBar() {
		this.bottomBar = this.player
			.createElement('div', 'bottom-bar')
			.addClasses([
				'absolute', 'bottom-0', 'left-0', 'right-0',
				'flex', 'flex-col', 'gap-1',
				'px-4', 'pt-12', 'pb-2',
				'bg-gradient-to-t', 'from-black/80', 'to-transparent',
				'opacity-0', 'transition-opacity', 'duration-300', 'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createCenterButton() {
		this.centerButton = this.player
			.createElement('button', 'center-play')
			.addClasses([
				'absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2',
				'w-16', 'h-16', 'rounded-full',
				'bg-black/50', 'text-white',
				'flex', 'items-center', 'justify-center',
				'transition-opacity', 'duration-300',
				'hover:bg-black/70', 'hover:scale-110',
				'cursor-pointer', 'group/button',
			])
			.appendTo(this.overlay)
			.get();

		this.player.createSVGElement(this.centerButton, 'center-paused', icons.play, false, true);

		this.centerButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
			this.player.emit('hide-tooltip');
		});

		this.player.on('play', () => {
			this.centerButton.style.display = 'none';
		});
	}

	private createSpinner() {
		this.spinner = this.player
			.createElement('div', 'spinner')
			.addClasses([
				'absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2',
				'w-12', 'h-12',
				'hidden',
				'group-[&.nomercyplayer.buffering]:block',
				'pointer-events-none',
			])
			.appendTo(this.overlay)
			.get();

		this.spinner.innerHTML = `
			<svg class="animate-spin text-white" viewBox="0 0 100 101" fill="none">
				<path d="M100 50.59C100 78.2 77.6 100.59 50 100.59S0 78.2 0 50.59 22.39.59 50 .59s50 22.39 50 50z" fill="currentColor" opacity="0.25"/>
				<path d="M93.97 39.04c2.42-.64 3.89-3.13 3.04-5.49A50 50 0 0041.73 1.28c-2.47.41-3.92 2.92-3.28 5.34.66 2.43 3.14 3.85 5.62 3.48a40 40 0 0146.62 22.32c.9 2.24 3.36 3.7 5.79 3.06z" fill="currentColor"/>
			</svg>
		`;
	}

	private createBottomRow() {
		this.bottomRow = this.player
			.createElement('div', 'bottom-row')
			.addClasses(['flex', 'items-center', 'gap-1', 'h-10'])
			.appendTo(this.bottomBar)
			.get();
	}

	private createPlaybackButton() {
		this.playbackButton = this.player
			.createUiButton(this.bottomRow, 'playback')
			.get();
		this.playbackButton.ariaLabel = icons.play.title;

		const pausedIcon = this.player.createSVGElement(this.playbackButton, 'paused', icons.play, false, true);
		const playIcon = this.player.createSVGElement(this.playbackButton, 'playing', icons.pause, true, true);

		this.playbackButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
			this.player.emit('hide-tooltip');
		});

		this.player.on('pause', () => {
			playIcon.style.display = 'none';
			pausedIcon.style.display = 'flex';
		});
		this.player.on('play', () => {
			pausedIcon.style.display = 'none';
			playIcon.style.display = 'flex';
		});
	}

	private createProgressBar() {
		this.sliderBar = this.player
			.createElement('div', 'slider-bar')
			.addClasses([
				'relative', 'w-full', 'h-1', 'mx-2',
				'bg-white/20', 'rounded-full',
				'cursor-pointer', 'group/slider',
				'hover:h-2', 'transition-all', 'duration-150',
			])
			.appendTo(this.bottomBar)
			.get();

		const sliderBuffer = this.player
			.createElement('div', 'slider-buffer')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'h-full',
				'bg-white/30', 'rounded-full', 'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderProgress = this.player
			.createElement('div', 'slider-progress')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'h-full',
				'bg-white', 'rounded-full', 'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderNipple = this.player
			.createElement('div', 'slider-nipple')
			.addClasses([
				'absolute', 'top-1/2', '-translate-y-1/2', '-translate-x-1/2',
				'w-3', 'h-3', 'rounded-full', 'bg-white',
				'hidden', 'group-hover/slider:flex',
				'pointer-events-none', 'left-0', 'z-20',
			])
			.appendTo(this.sliderBar)
			.get();

		const getPercentFromEvent = (e: MouseEvent | TouchEvent): number => {
			const rect = this.sliderBar.getBoundingClientRect();
			const clientX = ('clientX' in e ? e.clientX : undefined)
				?? ('touches' in e ? e.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in e ? e.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return (x / rect.width) * 100;
		};

		['mousedown', 'touchstart'].forEach((event) => {
			this.sliderBar.addEventListener(event, () => {
				this.isMouseDown = true;
			}, { passive: true });
		});

		this.sliderBar.addEventListener('click', (e: MouseEvent) => {
			this.isMouseDown = false;
			const percent = getPercentFromEvent(e);
			const duration = this.player.duration();
			this.player.seek(duration * (percent / 100));
			sliderNipple.style.left = `${percent}%`;
		});

		['mousemove', 'touchmove'].forEach((event) => {
			this.sliderBar.addEventListener(event, (e: any) => {
				const percent = getPercentFromEvent(e);
				if (!this.isMouseDown) return;
				sliderNipple.style.left = `${percent}%`;
				sliderProgress.style.width = `${percent}%`;
			}, { passive: true });
		});

		this.sliderBar.addEventListener('touchend', (event: TouchEvent) => {
			if (!this.isMouseDown) return;
			this.isMouseDown = false;
			const percent = getPercentFromEvent(event);
			this.player.seek(this.player.duration() * (percent / 100));
			sliderNipple.style.left = `${percent}%`;
			sliderProgress.style.width = `${percent}%`;
		}, { passive: true });

		this.sliderBar.addEventListener('mouseleave', () => {
			this.isMouseDown = false;
		}, { passive: true });

		this.player.on('time', (data) => {
			if (this.isMouseDown) return;
			sliderProgress.style.width = `${data.percentage}%`;
			sliderNipple.style.left = `${data.percentage}%`;
			this.currentTimeLabel.textContent = data.currentTimeHuman;
			this.durationLabel.textContent = data.durationHuman;
		});

		this.player.on('item', () => {
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
		});
	}

	private createSkipButtons() {
		const skipBack = this.player.createUiButton(this.bottomRow, 'skip-back').get();
		skipBack.ariaLabel = 'Skip back 10 seconds';
		this.player.createSVGElement(skipBack, 'skip-back-icon', icons.seekBack, false, true);
		skipBack.addEventListener('click', (e) => { e.stopPropagation(); this.player.rewind(10); });

		const skipForward = this.player.createUiButton(this.bottomRow, 'skip-forward').get();
		skipForward.ariaLabel = 'Skip forward 10 seconds';
		this.player.createSVGElement(skipForward, 'skip-forward-icon', icons.seekForward, false, true);
		skipForward.addEventListener('click', (e) => { e.stopPropagation(); this.player.forward(10); });
	}

	private createTimeDisplay() {
		this.currentTimeLabel = this.player.createElement('span', 'current-time')
			.addClasses(['text-white', 'text-xs', 'tabular-nums', 'ml-2']).appendTo(this.bottomRow).get();
		this.currentTimeLabel.textContent = '0:00';

		const separator = this.player.createElement('span', 'time-separator')
			.addClasses(['text-white/50', 'text-xs', 'mx-1']).appendTo(this.bottomRow).get();
		separator.textContent = '/';

		this.durationLabel = this.player.createElement('span', 'duration')
			.addClasses(['text-white', 'text-xs', 'tabular-nums']).appendTo(this.bottomRow).get();
		this.durationLabel.textContent = '0:00';
	}
}

export default StepPlugin;
