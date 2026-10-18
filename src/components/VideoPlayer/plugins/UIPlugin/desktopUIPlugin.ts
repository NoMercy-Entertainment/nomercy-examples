import {
	humanTime,
	convertToSeconds,
	limitSentenceByCharacters,
	lineBreakShowTitle,
	unique,
	toTitleCase
} from '@nomercy-entertainment/nomercy-video-player';
import type { Chapter, PlaylistItem, Position, SubtitleStyle } from '@nomercy-entertainment/nomercy-video-player';

import { BaseUIPlugin } from "./baseUIPlugin";

import {
	Icon,
	edgeStyles,
	fontFamilies,
	SubtitleSettingAction,
	subtitleSettingActions, defaultSubtitleStyles,
	textSizes
} from './buttons';

export class DesktopUIPlugin extends BaseUIPlugin {
	topBar: HTMLDivElement = <HTMLDivElement>{};
	bottomRow: HTMLDivElement = <HTMLDivElement>{};
	frame: HTMLDivElement = <HTMLDivElement>{};
	center: HTMLDivElement = <HTMLDivElement>{};

	isMouseDown = false;
	pipEnabled = false;
	lockActive = false;
	isAutoQuality = true;
	private resizeHandler: (() => void) | null = null;
	private helpKeyupHandler: ((event: KeyboardEvent) => void) | null = null;
	private visibilityChangeHandler: (() => void) | null = null;
	private rootClickHandler: (() => void) | null = null;
	private rootElement: HTMLElement | null = null;

	get isAnyMenuOpen(): boolean {
		return this.menuOpen || this.mainMenuOpen || this.languageMenuOpen
			|| this.subtitlesMenuOpen || !!this.subtitleSettingsMenuOpen
			|| this.qualityMenuOpen || this.speedMenuOpen || this.playlistMenuOpen;
	}

	syncLockActive() {
		const locked = this.isAnyMenuOpen;
		this.lockActive = locked;
		this.player.lockActive = locked;
	}
	selectedQualityIndex = -1;

	bottomBar: HTMLDivElement = <HTMLDivElement>{};
	topRow: HTMLDivElement = <HTMLDivElement>{};

	tooltip: HTMLDivElement = <HTMLDivElement>{};
	episodeTip: HTMLDivElement = <HTMLDivElement>{};

	scrollContainerStyles = [
		'scroll-container',
		'flex',
		'flex-col',
		'gap-1',
		'language-scroll-container',
		'overflow-x-hidden',
		'overflow-y-auto',
		'p-2',
		'transition-all',
		'duration-300',
		'w-available',
		'max-h-[50vh]',
		'scroll-p-4',
		'scroll-snap-align-center',
		'scroll-smooth',
		'scroll-p-4',
	];

	subMenuContentStyles = [
		'sub-menu-content',
		'flex',
		'flex-col',
		'max-h-[60vh]',
		'w-available',
		'overflow-y-auto',
		'overflow-x-hidden',
		'min-w-52',
	];

	subtitleSettingActions: SubtitleSettingAction[] = [];

	applyScrollbarStyles(el: HTMLElement) {
		el.style.scrollbarWidth = 'thin';
		el.style.scrollbarColor = 'rgba(255,255,255,0.3) transparent';
	}

	use() {
		this.subtitleSettingActions = subtitleSettingActions(this.player);

		this.topBar = this.createTopBar(this.overlay);

		this.createBackButton(this.topBar);
		this.createCloseButton(this.topBar);
		this.createDivider(this.topBar);
		this.createTvCurrentItem(this.topBar);

		if (!this.player.options.disableTouchControls) {
			this.center = this.createCenter(this.overlay);
		}

		this.bottomBar = this.createBottomBar(this.overlay);

		this.bottomBar.onmouseleave = (e) => {
			const playerRect = this.player.videoElement?.getBoundingClientRect();
			if (!playerRect || (e.x > playerRect.left && e.x < playerRect.right && e.y > playerRect.top && e.y < playerRect.bottom)) return;
			this.player.emit('hide-tooltip');
		};

		this.topRow = this.createTopRow(this.bottomBar);

		this.player.addClasses(this.topRow, ['mt-4']);

		this.bottomRow = this.createBottomRow(this.bottomBar);

		this.createProgressBar(this.topRow);

		this.createPlaybackButton(this.bottomRow, true);

		this.createPreviousButton(this.bottomRow, true);

		if (this.player.options.seekButtons) {
			this.createSeekBackButton(this.bottomRow, true);

			this.createSeekForwardButton(this.bottomRow, true);
		}

		this.createChapterBackButton(this.bottomRow, true);

		this.createChapterForwardButton(this.bottomRow, true);

		this.createNextButton(this.bottomRow, true);

		this.createVolumeButton(this.bottomRow, true);

		this.createTime(this.bottomRow, 'current', ['ml-2']);
		this.createDivider(this.bottomRow);
		this.createTime(this.bottomRow, 'remaining', ['mr-2']);

		this.createTheaterButton(this.bottomRow, true);
		this.createPIPButton(this.bottomRow, true);

		this.createPlaylistsButton(this.bottomRow, true);

		this.createSpeedButton(this.bottomRow, true);
		this.createCaptionsButton(this.bottomRow, true);
		this.createAudioButton(this.bottomRow, true);
		this.createQualityButton(this.bottomRow, true);
		this.createSettingsButton(this.bottomRow, true);

		this.createFullscreenButton(this.bottomRow, true);

		this.frame = this.createMenuFrame(this.bottomRow);

		this.createMainMenu(this.frame);

		this.createToolTip(this.overlay);

		this.episodeTip = this.createEpisodeTip(this.overlay);

		this.modifySpinner(this.overlay);

		this.eventHandlers();
	}

	dispose() {
		if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
		if (this.helpKeyupHandler) document.removeEventListener('keyup', this.helpKeyupHandler);
		if (this.visibilityChangeHandler) document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
		if (this.rootClickHandler) this.rootElement?.removeEventListener('click', this.rootClickHandler);
		this.resizeHandler = null;
		this.helpKeyupHandler = null;
		this.visibilityChangeHandler = null;
		this.rootClickHandler = null;
		this.rootElement = null;

		this.topBar.remove();
		this.bottomBar.remove();
		this.bottomRow.remove();
		this.frame.remove();
		this.center?.remove();
		this.tooltip.remove();
		this.episodeTip.remove();
		this.loader.remove();
		this.helpOverlay?.remove();
	}

	createTopRow(parent: HTMLDivElement) {
		return this.player.createElement('div', 'top-row')
			.addClasses([
				'top-row',
				'flex',
				'gap-1',
				'h-2',
				'items-center',
				'pl-2',
				'pr-2',
				'relative',
				'w-available',
			])
			.appendTo(parent).get();
	}

	createBottomRow(parent: HTMLDivElement) {
		return this.player.createElement('div', 'bottom-row')
			.addClasses([
				'bottom-row',
				'flex',
				'h-10',
				'lg:mb-2',
				'p-1',
				'lg:px-4',
				'items-center',
				'relative',
				'w-available',
			])
			.appendTo(parent).get();
	}

	eventHandlers() {
		// this.player.on('active', (showing) => {
		// 	if (this.player.element()) {
		// 		if (showing) {
		// 			this.player.element()?.setAttribute('active', 'true');
		// 		} else {
		// 			this.player.element()?.setAttribute('active', 'false');
		// 		}
		// 	}
		// });

		this.player.on('chapters', () => {
			this.createChapterMarkers();
		});

		this.player.on('back-button', () => {
			switch (this.currentMenu) {
				case 'episode':
				case 'language':
				case 'quality':
					this.player.emit('showPauseScreen');
					break;
				case 'seek':
				case 'pause':
					this.seekContainer.style.transform = '';
					this.player.play().then();
					break;
				default:
					break;
			}
		});

		this.resizeHandler = () => {
			this.sizeMenuFrame();
		};
		window.addEventListener('resize', this.resizeHandler);

		// Subtitle size up/down via keyboard (+/-)
		const sizeValues = textSizes.map(s => s.value);

		this.player.on('subtitle-size-up', () => {
			const current = this.player.subtitleStyle().fontSize;
			const idx = sizeValues.indexOf(current);
			if (idx < sizeValues.length - 1) {
				const next = sizeValues[idx + 1];
				this.player.subtitleStyle({ fontSize: next });
				this.player.displayMessage(`${this.player.localize('Subtitle size')}: ${next}%`);
			}
		});

		this.player.on('subtitle-size-down', () => {
			const current = this.player.subtitleStyle().fontSize;
			const idx = sizeValues.indexOf(current);
			if (idx > 0) {
				const next = sizeValues[idx - 1];
				this.player.subtitleStyle({ fontSize: next });
				this.player.displayMessage(`${this.player.localize('Subtitle size')}: ${next}%`);
			}
		});

		// Keyboard shortcuts help overlay (? key)
		this.initHelpOverlay();
	}

	private helpOverlay: HTMLDivElement | null = null;

	private initHelpOverlay() {
		const overlay = document.createElement('div');
		overlay.id = 'keyboard-help-overlay';
		Object.assign(overlay.style, {
			position: 'absolute',
			inset: '0',
			width: '100%',
			height: '100%',
			maxWidth: '100%',
			maxHeight: '100%',
			background: 'rgba(0, 0, 0, 0.92)',
			color: 'white',
			padding: '2rem',
			border: 'none',
			zIndex: '10000',
			overflow: 'auto',
		});
		this.helpOverlay = overlay;

		const container = document.createElement('div');
		Object.assign(container.style, {
			maxWidth: '56rem',
			margin: '0 auto',
		});

		const header = document.createElement('div');
		Object.assign(header.style, {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '1.5rem',
		});

		const title = document.createElement('h2');
		title.textContent = this.player.localize('Keyboard Shortcuts');
		Object.assign(title.style, { margin: '0', fontSize: '1.5rem', fontWeight: '600' });

		const hint = document.createElement('span');
		hint.textContent = this.player.localize('Press ? or Esc to close');
		Object.assign(hint.style, { fontSize: '0.875rem', opacity: '0.6' });

		header.append(title, hint);
		container.appendChild(header);

		const categories: Record<string, { key: string; label: string }[]> = {
			'Playback': [
				{ key: 'Space', label: 'Play / Pause' },
				{ key: 'e', label: 'Next frame (paused)' },
				{ key: ']', label: 'Speed up' },
				{ key: '[', label: 'Speed down' },
				{ key: '=', label: 'Normal speed' },
				{ key: 't', label: 'Show time' },
			],
			'Volume': [
				{ key: '↑', label: 'Volume up' },
				{ key: '↓', label: 'Volume down' },
				{ key: 'm', label: 'Mute / Unmute' },
			],
			'Seeking': [
				{ key: '← / →', label: 'Seek back / forward' },
				{ key: 'Shift + ← / →', label: 'Seek 3 seconds' },
				{ key: 'Alt + ← / →', label: 'Seek 10 seconds' },
				{ key: 'Ctrl + ← / →', label: 'Seek 1 minute' },
			],
			'Quick Seek': [
				{ key: '3', label: 'Seek 30 seconds' },
				{ key: '6', label: 'Seek 60 seconds' },
				{ key: '9', label: 'Seek 90 seconds' },
				{ key: '1', label: 'Seek 120 seconds' },
			],
			'Navigation': [
				{ key: 'n', label: 'Next item' },
				{ key: 'p', label: 'Previous item' },
				{ key: 'Shift + N', label: 'Next chapter' },
				{ key: 'Shift + P', label: 'Previous chapter' },
			],
			'Tracks & Subtitles': [
				{ key: 'v / 5', label: 'Cycle subtitles' },
				{ key: 'b / 2', label: 'Cycle audio' },
				{ key: '+', label: 'Subtitle size up' },
				{ key: '-', label: 'Subtitle size down' },
			],
			'Display': [
				{ key: 'f / F11', label: 'Toggle fullscreen' },
				{ key: 'Esc', label: 'Exit fullscreen' },
				{ key: 'a', label: 'Cycle aspect ratio' },
			],
		};

		const grid = document.createElement('div');
		Object.assign(grid.style, {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
			gap: '1.5rem',
		});

		for (const [category, shortcuts] of Object.entries(categories)) {
			const section = document.createElement('div');

			const catTitle = document.createElement('h3');
			catTitle.textContent = this.player.localize(category);
			Object.assign(catTitle.style, {
				margin: '0 0 0.75rem 0',
				fontSize: '0.9rem',
				fontWeight: '600',
				textTransform: 'uppercase',
				letterSpacing: '0.05em',
				opacity: '0.7',
			});
			section.appendChild(catTitle);

			for (const shortcut of shortcuts) {
				const row = document.createElement('div');
				Object.assign(row.style, {
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0.35rem 0',
					borderBottom: '1px solid rgba(255,255,255,0.08)',
				});

				const label = document.createElement('span');
				label.textContent = this.player.localize(shortcut.label);
				Object.assign(label.style, { fontSize: '0.875rem' });

				const kbd = document.createElement('kbd');
				kbd.textContent = shortcut.key;
				Object.assign(kbd.style, {
					background: 'rgba(255,255,255,0.12)',
					borderRadius: '0.25rem',
					padding: '0.15rem 0.5rem',
					fontSize: '0.8rem',
					fontFamily: 'monospace',
					minWidth: '1.5rem',
					textAlign: 'center',
				});

				row.append(label, kbd);
				section.appendChild(row);
			}

			grid.appendChild(section);
		}

		container.appendChild(grid);
		overlay.appendChild(container);
		this.player.overlay.appendChild(overlay);

		// Close on click outside content
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) {
				overlay.style.display = 'none';
				this.player.lockActive = false;
			}
		});

		overlay.style.display = 'none';

		// Listen for ? key to toggle
		this.helpKeyupHandler = (e) => {
			if (document.activeElement?.nodeName === 'INPUT') return;
			if (this.player.container.getBoundingClientRect().width === 0) return;

			if (e.key === '?') {
				const isVisible = overlay.style.display !== 'none';
				if (isVisible) {
					overlay.style.display = 'none';
					this.player.lockActive = false;
				} else {
					overlay.style.display = 'flex';
					this.player.lockActive = true;
				}
			} else if (e.key === 'Escape' && overlay.style.display !== 'none') {
				overlay.style.display = 'none';
				this.player.lockActive = false;
			}
		};
		document.addEventListener('keyup', this.helpKeyupHandler);
	}

	createCenter(parent: HTMLElement) {

		const center = this.player.createElement('div', 'center')
			.addClasses([
				'center',
				'absolute',
				'grid',
				'grid-cols-3',
				'grid-rows-6',
				'h-full',
				'w-full',
				'z-0',

				'transition-all',
				'duration-300',

				'bg-transparent',
				'group-[&.nomercyplayer:not(.buffering).paused]:bg-gradient-circle-c',

				'from-15%',
				'from-black/50',
				'via-40%',
				'via-black/30',
				'to-100%',
				'to-black/0',
			])
			.appendTo(parent).get();

		this.createSpinnerContainer(center);

		if (this.player.isMobile()) {
			this.createTouchSeekBack(center, { x: { start: 1, end: 1 }, y: { start: 2, end: 6 } });
			this.createTouchPlayback(center, { x: { start: 2, end: 2 }, y: { start: 3, end: 5 } });
			this.createTouchSeekForward(center, { x: { start: 3, end: 3 }, y: { start: 2, end: 6 } });
			this.createTouchVolUp(center, { x: { start: 2, end: 2 }, y: { start: 1, end: 3 } });
			this.createTouchVolDown(center, { x: { start: 2, end: 2 }, y: { start: 5, end: 7 } });
		}
		else {
			this.createTouchSeekBack(center, { x: { start: 1, end: 2 }, y: { start: 2, end: 6 } });
			this.createTouchPlayback(center, { x: { start: 2, end: 3 }, y: { start: 2, end: 6 } });
			this.createTouchSeekForward(center, { x: { start: 3, end: 4 }, y: { start: 2, end: 6 } });
		}

		return center;

	}

	createTouchSeekBack(parent: HTMLElement, currentTime: Position) {
		const touchSeekBack = this.createTouchBox(parent, 'touchSeekBack', currentTime);
		['click'].forEach((event) => {
			touchSeekBack.addEventListener(event, this.doubleTap(
				() => {
					this.player.rewind();
				},
				() => {
					if (this.controlsVisible) {
						this.player.ui_removeActiveClass();
					}
				}
			));
		});

		this.createSeekRipple(touchSeekBack, 'left');

		return touchSeekBack;

	}

	/**
	 * Attaches a double tap event listener to the element.
	 * @param doubleTap - The function to execute when a double tap event occurs.
	 * @param singleTap - An optional function to execute when a second double tap event occurs.
	 * @returns A function that detects double tap events.
	 */
	doubleTap(doubleTap: (event: Event) => void, singleTap?: (event2: Event) => void) {
		const delay = this.player.options.doubleClickDelay ?? 300;
		let lastTap = 0;
		let timeout: NodeJS.Timeout;
		let timeout2: NodeJS.Timeout;
		return function detectDoubleTap(event: Event, event2?: Event) {
			const curTime = new Date().getTime();
			const tapLen = curTime - lastTap;
			if (tapLen > 0 && tapLen < delay) {
				event.preventDefault();
				doubleTap(event);
				clearTimeout(timeout2);
			} else {
				timeout = setTimeout(() => {
					clearTimeout(timeout);
				}, delay);
				timeout2 = setTimeout(() => {
					singleTap?.(event2!);
				}, delay);
			}
			lastTap = curTime;
		};
	}

	createTouchSeekForward(parent: HTMLElement, currentTime: Position) {
		const touchSeekForward = this.createTouchBox(parent, 'touchSeekForward', currentTime);
		['mouseup', 'touchend'].forEach((event) => {
			touchSeekForward.addEventListener(event, this.doubleTap(
				() => {
					this.player.forward();
				},
				() => {
					if (this.controlsVisible) {
						this.player.ui_removeActiveClass();
					}
				}
			));
		});

		this.createSeekRipple(touchSeekForward, 'right');

		return touchSeekForward;
	}

	createTouchPlayback(parent: HTMLElement, currentTime: Position, hovered = false) {
		const touchPlayback = this.createTouchBox(parent, 'touchPlayback', currentTime);
		this.player.addClasses(touchPlayback, [
			'touch-playback',
			'flex',
			'-ml-2',
			'items-center',
			'justify-center',
		]);

		['click'].forEach((event) => {
			touchPlayback.addEventListener(event, this.doubleTap(
				() => {
					this.player.toggleFullscreen();
				},
				() => {
					this.controlsVisible && this.player.togglePlayback();
				}
			));
		});

		const playButton = this.createSVGElement(touchPlayback, 'bigPlay', this.buttons.bigPlay, false, hovered);
		this.player.addClasses(playButton, [
			'touch-playback-button',
			'pointer-events-none',
			'fill-white',
		]);

		this.player.on('ready', () => {
			playButton.style.display = 'flex';
		});
		this.player.on('pause', () => {
			playButton.style.display = 'flex';
		});

		this.player.on('play', () => {
			playButton.style.display = 'none';
		});
		this.player.on('time', () => {
			playButton.style.display = 'none';
		});
		this.player.on('firstFrame', () => {
			playButton.style.display = 'none';
		});

		return touchPlayback;
	}

	createTouchVolUp(parent: HTMLElement, currentTime: Position) {
		if (!this.player.isMobile()) return;
		const touchVolUp = this.createTouchBox(parent, 'touchVolUp', currentTime);
		['click'].forEach((event) => {
			touchVolUp.addEventListener(event, this.doubleTap(
				() => {
					this.player.volumeUp();
				},
				() => {
					if (this.controlsVisible) {
						this.player.ui_removeActiveClass();
					}
				}
			));
		});

		return touchVolUp;
	}

	createTouchVolDown(parent: HTMLElement, currentTime: Position) {
		if (!this.player.isMobile()) return;
		const touchVolDown = this.createTouchBox(parent, 'touchVolDown', currentTime);
		['click'].forEach((event) => {
			touchVolDown.addEventListener(event, this.doubleTap(
				() => {
					this.player.volumeDown();
				},
				() => {
					if (this.controlsVisible) {
						this.player.ui_removeActiveClass();
					}
				}
			));
		});

		return touchVolDown;
	}

	createTouchBox(parent: HTMLElement, id: string, currentTime: Position) {
		const touch = this.player.createElement('div', `touch-box-${id}`)
			.addClasses([`touch-box-${id}`, 'z-40'])
			.appendTo(parent).get();

		touch.style.gridColumnStart = currentTime.x.start.toString();
		touch.style.gridColumnEnd = currentTime.x.end.toString();
		touch.style.gridRowStart = currentTime.y.start.toString();
		touch.style.gridRowEnd = currentTime.y.end.toString();

		parent.appendChild(touch);

		return touch;

	}

	createSpeedButton(parent: HTMLDivElement, hovered = false) {
		if (this.player.isMobile()) return;
		const speedButton = this.createUiButton(
			parent,
			'speed'
		);

		if (this.player.hasSpeeds()) {
			speedButton.style.display = 'flex';
		} else {
			speedButton.style.display = 'none';
		}

		this.createSVGElement(speedButton, 'speed', this.buttons.speed, false, hovered);

		// Outlined when normal (1x), filled when any other speed
		this.player.on('speed', (speed) => {
			const path = speedButton.querySelector('path');
			if (path) {
				path.setAttribute('d', speed === 1
					? this.buttons.speed.normal
					: this.buttons.speed.hover);
			}
		});

		speedButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit('hide-tooltip');

			if (this.speedMenuOpen) {
				this.player.emit('show-menu', false);

				this.menuFrame.close();
			} else {
				this.player.emit('show-speed-menu', true);

				this.menuFrame.showModal();
			}
		});

		this.player.on('pip', (data) => {
			if (data) {
				speedButton.style.display = 'none';
			} else if (this.player.hasSpeeds()) {
				speedButton.style.display = 'flex';
			}
		});

		parent.appendChild(speedButton);
		return speedButton;
	}

	createPIPButton(parent: HTMLDivElement, hovered = false) {
		if (this.player.isMobile() || !this.player.hasListeners('pip')) return;
		const pipButton = this.createUiButton(
			parent,
			'pip'
		);

		if (this.player.hasPIP()) {
			pipButton.style.display = 'flex';
		} else {
			pipButton.style.display = 'none';
		}

		pipButton.ariaLabel = this.buttons.pipEnter?.title;

		this.createSVGElement(pipButton, 'pip-enter', this.buttons.pipEnter, false, hovered);
		this.createSVGElement(pipButton, 'pip-exit', this.buttons.pipExit, true, hovered);

		this.visibilityChangeHandler = () => {
			if (this.pipEnabled) {
				if (document.hidden) {
					if (document.pictureInPictureEnabled) {
						this.player.videoElement.requestPictureInPicture().then();
					}
				} else if (document.pictureInPictureElement) {
					document.exitPictureInPicture().then();
				}
			}
		};
		document.addEventListener('visibilitychange', this.visibilityChangeHandler);

		pipButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit('hide-tooltip');

			this.player.ui_removeActiveClass();

			this.pipEnabled = !this.pipEnabled;

			if (this.pipEnabled) {
				pipButton.querySelector<any>('.pip-enter-icon').style.display = 'none';
				pipButton.querySelector<any>('.pip-exit-icon').style.display = 'flex';
				pipButton.ariaLabel = this.buttons.pipExit?.title;
				this.player.emit('show-menu', false);
			} else {
				pipButton.querySelector<any>('.pip-exit-icon').style.display = 'none';
				pipButton.querySelector<any>('.pip-enter-icon').style.display = 'flex';
				pipButton.ariaLabel = this.buttons.pipEnter?.title;
			}

			this.player.emit('pip', this.pipEnabled);
		});

		this.player.on('fullscreen', () => {
			if (this.player.fullscreen()) {
				pipButton.style.display = 'none';
			} else {
				pipButton.style.display = 'flex';
			}
		});

		parent.appendChild(pipButton);
		return pipButton;
	}

	createMenuFrame(parent: HTMLDivElement) {

		this.menuFrame = this.player.createElement('dialog', 'menu-frame-dialog')
			.addClasses([
				'group-[&.nomercyplayer:has(.open)]:backdrop:bg-black/60',
				'group-[&.nomercyplayer:has(.open)]:backdrop:pointer-events-none',
			])
			.appendTo(parent).get();

		this.menuFrame.setAttribute('popover', 'manual');
		this.menuFrame.setAttribute('role', 'modal');

		const menuWrapper = this.player.createElement('div', 'menu-wrapper')
			.addClasses([
				'menu-wrapper',
				'text-white',
			])
			.appendTo(this.menuFrame).get();

		this.rootClickHandler = () => {
			this.player.emit('show-menu', false);
			this.player.emit('show-main-menu', false);
			this.player.emit('show-language-menu', false);
			this.player.emit('show-subtitles-menu', false);
			this.player.emit('show-subtitleSettings-menu', false);
			this.player.emit('show-subtitleSetting-menu', false);
			this.player.emit('show-quality-menu', false);
			this.player.emit('show-speed-menu', false);
			this.player.emit('show-playlist-menu', false);
		};
		this.rootElement = document.body.parentElement as HTMLElement;
		this.rootElement.addEventListener('click', this.rootClickHandler);

		const menuFrame = this.player.createElement('div', 'menu-frame')
			.addClasses([
				'menu-frame',
				'absolute',
				'flex-col',
				'h-available',
				'hidden',
				'inset-4',
				'justify-self-end',
				'max-h-[calc(100%-2rem)]',
				'max-w-[min(70rem,calc(100%-2rem))]',
				'overflow-clip',
				'rounded-lg',
				'w-fit',
				'z-50',
			])
			.appendTo(menuWrapper).get();

		this.sizeMenuFrame();

		const menuContent = this.player.createElement('div', 'menu-content')
			.addClasses([
				'menu-content',
				'flex',
				'flex-row',
				'h-available',
				'justify-end',
				'mt-auto',
				'overflow-clip',
				'w-full',
			])
			.appendTo(menuFrame).get();

		this.player.on('resize', () => {
			this.sizeMenuFrame();
		});
		this.player.on('fullscreen', () => {
			this.sizeMenuFrame();
		});
		this.player.on('show-menu', (showing) => {
			this.menuOpen = showing;
			this.syncLockActive();
			if (showing) {

				this.sizeMenuFrame();

				menuFrame.style.display = 'flex';
				menuFrame.classList.add('open');

				this.menuFrame.showModal();
			} else {
				menuFrame.style.display = 'none';
				menuFrame.classList.remove('open');

				this.menuFrame.classList.remove('group-[&.nomercyplayer:has(.open)]:backdrop:!hidden');
				this.center.classList?.remove('!bg-none');

				this.menuFrame.close();
			}
			menuContent.classList.add('translate-x-0');
			menuContent.classList.remove('sub-menu-open');

			setTimeout(() => {
				(Array.from(this.mainMenu.children).find(el =>
					(el as HTMLButtonElement).style.display != 'none' && el.id != 'menu-header') as HTMLButtonElement)?.focus();
			}, 200);

			this.player.emit('show-language-menu', false);
			this.player.emit('show-subtitles-menu', false);
			this.player.emit('hide-subtitleSettings-menu');
			this.player.emit('show-subtitleSettings-menu', false);
			this.player.emit('show-subtitleSetting-menu', false);
			this.player.emit('show-quality-menu', false);
			this.player.emit('show-speed-menu', false);
			this.player.emit('show-playlist-menu', false);
		});
		this.player.on('show-main-menu', (showing) => {
			this.mainMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.add('translate-x-0');
				menuContent.classList.remove('sub-menu-open');
				menuFrame.style.display = 'flex';
				this.menuFrame.classList.remove('group-[&.nomercyplayer:has(.open)]:backdrop:!hidden');
				this.center.classList?.remove('!bg-none');

				setTimeout(() => {
					(Array.from(this.mainMenu.children).find(el =>
						(el as HTMLButtonElement).style.display != 'none' && el.id != 'menu-header') as HTMLButtonElement)?.focus();
				}, 200);
			}
		});
		this.player.on('show-language-menu', (showing) => {
			this.languageMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-subtitles-menu', (showing) => {
			this.subtitlesMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-subtitleSettings-menu', (property) => {
			if (property === false && typeof this.subtitleSettingsMenuOpen === 'string') {
				// A subtitle-setting sub-menu is open; hide visually but keep the flag
			} else {
				this.subtitleSettingsMenuOpen = property;
				this.syncLockActive();
			}
			if (property) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-subtitleSetting-menu', (property) => {
			this.subtitleSettingsMenuOpen = property;
			this.syncLockActive();
			if (property) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-quality-menu', (showing) => {
			this.qualityMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-speed-menu', (showing) => {
			this.speedMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-playlist-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';
			}
		});
		this.player.on('show-playlist-menu', (showing) => {
			// this.createCalcMenu(menuContent);
			this.playlistMenuOpen = showing;
			this.syncLockActive();
			if (showing) {
				menuFrame.classList.add('open');
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				menuContent.classList.remove('translate-x-0');
				menuContent.classList.add('sub-menu-open');
				menuFrame.style.display = 'flex';

				this.player.emit('switch-season', this.player.playlistItem().season);
			} else {
				menuFrame.style.width = '';
			}
		});
		this.player.on('active', (showing) => {
			if (!showing && this.isAnyMenuOpen) {
				return;
			}
			if (!showing) {
				this.player.emit('show-menu', false);
				this.player.emit('show-main-menu', false);
				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-subtitleSettings-menu', false);
				this.player.emit('show-subtitleSetting-menu', false);
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
			}
		});

		return menuContent;
	}

	sizeMenuFrame() {
		const rect = this.player?.element()?.getBoundingClientRect();
		if (!rect) return;

		const {
			width,
			height,
			top,
			bottom,
			left,
		} = rect;

		(this.menuFrame.firstChild as HTMLDivElement).style.width = `${width}px`;
		(this.menuFrame.firstChild as HTMLDivElement).style.height = `${height}px`;
		(this.menuFrame.firstChild as HTMLDivElement).style.top = `${top}px`;
		(this.menuFrame.firstChild as HTMLDivElement).style.bottom = `${bottom}px`;
		(this.menuFrame.firstChild as HTMLDivElement).style.left = `${left}px`;
		(this.menuFrame.firstChild as HTMLDivElement).style.padding = '2rem';
		(this.menuFrame.firstChild as HTMLDivElement).style.position = 'fixed';
		// (this.menuFrame.firstChild as HTMLDivElement).style.background = 'red';
	}

	createMainMenu(parent: HTMLDivElement) {

		this.mainMenu = this.player.createElement('div', 'main-menu')
			.addClasses([
				'main-menu',
				'bg-neutral-900/95',
				'flex',
				'flex-col',
				'gap-1',
				'group-[&.nomercyplayer:has(.sub-menu-open)]:!hidden',
				'h-auto',
				'max-h-[60vh]',
				'min-w-64',
				'mt-auto',
				'overflow-y-auto',
				'overflow-x-hidden',
				'p-2',
				'pt-0',
				'rounded-lg',
				'pointer-events-auto',
			])
			.appendTo(parent).get();

		this.mainMenu.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(this.mainMenu);

		const mainHeader = this.createMainMenuHeader(this.mainMenu);
		mainHeader.classList.add('!min-h-[2rem]', '-mr-1');

		this.player.addClasses(this.mainMenu, [
			'main-menu',
			'bg-neutral-900/95',
			'flex',
			'flex-col',
			'gap-1',
			'group-[&.nomercyplayer:has(.sub-menu-open)]:!hidden',
			'h-auto',
			'max-h-[60vh]',
			'min-w-64',
			'mt-auto',
			'overflow-y-auto',
			'overflow-x-hidden',
			'p-2',
			'pt-0',
			'rounded-lg',
		]);

		const createButtons = () => {
			this.createMenuButton(this.mainMenu, 'language');
			this.createMenuButton(this.mainMenu, 'subtitles');
			this.createMenuButton(this.mainMenu, 'subtitle settings');
			this.createMenuButton(this.mainMenu, 'quality');
			this.createMenuButton(this.mainMenu, 'speed');
			this.createMenuButton(this.mainMenu, 'playlist');
		};

		if (Object.keys(this.player.translations).length > 0) {
			createButtons();
		} else {
			this.player.once('translationsLoaded', createButtons);
		}

		this.createSubMenu(parent);

		return this.mainMenu;
	}

	createSubMenu(parent: HTMLDivElement) {

		const submenu = this.player.createElement('div', 'sub-menu')
			.addClasses([
				'sub-menu',
				'bg-neutral-900/95',
				'flex-col',
				'gap-1',
				'group-[&.nomercyplayer:has(.sub-menu-open)]:flex',
				'h-auto',
				'hidden',
				'max-h-full',
				'min-w-64',
				'mt-auto',
				'overflow-clip',
				'rounded-lg',
				'pointer-events-auto',
				'w-full',
			])
			.appendTo(parent).get();

		submenu.style.transform = 'translateX(0)';

		const createSubMenus = () => {
			this.createLanguageMenu(submenu);
			this.createSubtitleMenu(submenu);
			this.createSubtitleSettingsMenu(submenu);
			this.createQualityMenu(submenu);
			this.createSpeedMenu(submenu);
		};

		const createEpisodeMenuWhenReady = () => {
			if (this.player.options.playlist && Array.isArray(this.player.options.playlist)) {
				this.createEpisodeMenu(submenu);
			} else {
				this.player.once('playlist', () => {
					this.createEpisodeMenu(submenu);
				});
			}
		};

		if (Object.keys(this.player.translations).length > 0) {
			createSubMenus();
			createEpisodeMenuWhenReady();
		} else {
			this.player.once('translationsLoaded', () => {
				createSubMenus();
				createEpisodeMenuWhenReady();
			});
		}

		return submenu;
	}

	createMainMenuHeader(parent: HTMLDivElement, hovered = false) {
		const menuHeader = this.player.createElement('div', 'menu-header')
			.addClasses([
				'menu-header',
				'flex',
				'h-9',
				'items-center',
				'min-h-[2.5rem]',
				'py-2',
				'text-white',
				'w-available',
			])
			.addClasses(['border-b', 'border-gray-300/20', '!p-0'])
			.appendTo(parent).get();

		const close = this.createUiButton(
			menuHeader,
			'close'
		);

		this.createSVGElement(close, 'menu', this.buttons.close, hovered);
		this.player.addClasses(close, ['ml-auto', 'w-8']);
		close.classList.remove('w-5');

		close.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit('show-menu', false);
			this.lockActive = false;
			this.player.ui_removeActiveClass();

			this.menuFrame.close();

			this.player.emit('dynamicControls');
		});

		return menuHeader;
	}

	createMenuHeader(parent: HTMLDivElement, title: string, hovered = false) {
		const menuHeader = this.player.createElement('div', 'menu-header')
			.addClasses([
				'menu-header',
				'flex',
				'h-9',
				'items-center',
				'min-h-[2.5rem]',
				'py-2',
				'text-white',
				'w-available',
			])
			.addClasses(['border-b', 'border-gray-300/20'])
			.appendTo(parent).get();

		if (title !== 'Episodes') {
			const back = this.createUiButton(
				menuHeader,
				'back'
			);
			this.createSVGElement(back, 'menu', this.buttons.chevronL, hovered);
			this.player.addClasses(back, ['w-8']);
			back.classList.remove('w-5');

			back.addEventListener('click', (event) => {
				event.stopPropagation();
				this.player.emit('show-main-menu', true);

				this.player.emit('show-language-menu', false);
				this.player.emit('show-subtitles-menu', false);
				this.player.emit('hide-subtitleSettings-menu');
				this.player.emit('show-quality-menu', false);
				this.player.emit('show-speed-menu', false);
				this.player.emit('show-playlist-menu', false);
			});
		}

		const menuButtonText = this.player.createElement('span', 'menu-button-text')
			.addClasses(this.menuButtonTextStyles)
			.appendTo(menuHeader).get();

		menuButtonText.innerText = this.player.localize(toTitleCase(title));

		if (title !== 'Seasons') {
			const close = this.createUiButton(
				menuHeader,
				'close'
			);

			this.createSVGElement(close, 'menu', this.buttons.close, hovered);
			this.player.addClasses(close, ['ml-auto', 'w-8']);
			close.classList.remove('w-5');

			close.addEventListener('click', (event) => {
				event.stopPropagation();
				this.player.emit('show-menu', false);
				this.lockActive = false;
				this.player.ui_removeActiveClass();

				this.menuFrame.close();

				this.player.emit('dynamicControls');
			});
		}

		return menuHeader;
	}

	createSubtitleSettingMenuHeader(parent: HTMLDivElement, title: string) {
		const menuHeader = this.player.createElement('div', 'menu-header')
			.addClasses([
				'menu-header',
				'flex',
				'h-9',
				'items-center',
				'min-h-[2.5rem]',
				'py-2',
				'text-white',
				'w-available',
			])
			.addClasses(['border-b', 'border-gray-300/20'])
			.appendTo(parent).get();

		const back = this.createUiButton(
			menuHeader,
			'back'
		);
		this.createSVGElement(back, 'menu', this.buttons.chevronL, false);
		this.player.addClasses(back, ['w-8']);
		back.classList.remove('w-5');

		back.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit('show-subtitleSettings-menu', true);
			this.player.emit('show-subtitleSetting-menu', false);
		});

		const menuButtonText = this.player.createElement('span', 'menu-button-text')
			.addClasses(this.menuButtonTextStyles)
			.appendTo(menuHeader).get();

		menuButtonText.innerText = toTitleCase(this.player.localize(toTitleCase(title)));

		const close = this.createUiButton(
			menuHeader,
			'close'
		);

		this.createSVGElement(close, 'menu', this.buttons.close, false);
		this.player.addClasses(close, ['ml-auto', 'w-8']);
		close.classList.remove('w-5');

		close.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit('show-menu', false);
			this.lockActive = false;
			this.player.ui_removeActiveClass();

			this.menuFrame.close();

			this.player.emit('dynamicControls');
		});


		return menuHeader;
	}

	createMenuButton(parent: HTMLDivElement, item: string, hovered = false) {
		const id = this.spaceToCamel(item);

		const menuButton = this.player.createElement('button', `menu-button-${id}`)
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		if (id !== 'speed') {
			menuButton.style.display = 'none';
		}
		else if (this.player.hasSpeeds()) {
			menuButton.style.display = 'flex';
		}
		else {
			menuButton.style.display = 'none';
		}

		this.createSVGElement(menuButton, 'menu', this.buttons[id], hovered);

		const menuButtonText = this.player.createElement('span', `menu-button-${id}`)
			.addClasses(this.menuButtonTextStyles)
			.appendTo(menuButton).get();

		menuButtonText.innerText = toTitleCase(this.player.localize(toTitleCase(item)));

		const chevron = this.createSVGElement(menuButton, 'menu', this.buttons.chevronR, false, hovered);
		this.player.addClasses(chevron, ['ml-auto']);

		menuButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.emit(`show-${id}-menu`, true);

			if (id === 'playlist') {
				window.nmplayer().emit('switch-season', window.nmplayer().playlistItem().season);
			}
		});

		if (id === 'language') {
			this.player.on('id', () => {
				menuButton.style.display = 'none';
			});
			if (this.player.hasAudioTracks()) {
				menuButton.style.display = 'flex';
			}
			this.player.on('audioTracks', (tracks) => {
				if (tracks.length > 1) {
					menuButton.style.display = 'flex';
				} else {
					menuButton.style.display = 'none';
				}
			});
		}
		else if (id === 'subtitles') {
			this.player.on('id', () => {
				menuButton.style.display = 'none';
			});
			if (this.player.hasSubtitles()) {
				menuButton.style.display = 'flex';
			}
			this.player.on('subtitleList', (captions) => {
				if (captions.length > 0) {
					menuButton.style.display = 'flex';
				} else {
					menuButton.style.display = 'none';
				}
			});
		}
		else if (id === 'subtitleSettings') {
			menuButton.style.display = 'flex';
		}
		else if (id === 'quality') {
			this.player.on('item', () => {
				menuButton.style.display = 'none';
			});
			if (this.player.hasQualities()) {
				menuButton.style.display = 'flex';
			}
			this.player.on('levels', (levels) => {
				if (levels.length > 1) {
					menuButton.style.display = 'flex';
				} else {
					menuButton.style.display = 'none';
				}
			});
		}
		else if (id === 'playlist') {
			if (this.player.options.playlist && Array.isArray(this.player.options.playlist)) {
				menuButton.style.display = 'flex';
			}
			this.player.on('playlist', (playlist) => {
				if (playlist.length > 1) {
					menuButton.style.display = 'flex';
				} else {
					menuButton.style.display = 'none';
				}
			});
		}
	}

	createLanguageMenu(parent: HTMLDivElement) {
		const languageMenu = this.player.createElement('div', 'language-menu')
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent).get();

		this.createMenuHeader(languageMenu, 'Language');

		const scrollContainer = this.player.createElement('div', 'language-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(languageMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		this.player.on('item', () => {
			scrollContainer.innerHTML = '';
		});

		if (this.player.hasAudioTracks()) {
			Object.values(this.player.audioTracks()).forEach((track) => {
				this.createLanguageMenuButton(scrollContainer, {
					language: track.language!,
					label: track.label!,
					type: 'audio',
					id: track.id!,
					buttonType: 'audio',
				});
			});
		}

		this.player.on('audioTracks', (tracks) => {
			scrollContainer.innerHTML = '';

			Object.values(tracks).forEach((track) => {
				this.createLanguageMenuButton(scrollContainer, {
					language: track.language!,
					label: track.label!,
					type: 'audio',
					id: track.id!,
					buttonType: 'audio',
				});
			});
		});

		this.player.on('show-language-menu', (showing) => {
			if (showing) {
				languageMenu.style.display = 'flex';

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				languageMenu.style.display = 'none';
			}
		});

		return languageMenu;
	}

	createSubtitleMenu(parent: HTMLDivElement) {
		const subtitleMenu = this.player.createElement('div', 'subtitle-menu')
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent).get();

		this.createMenuHeader(subtitleMenu, 'subtitles');

		const scrollContainer = this.player.createElement('div', 'subtitle-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(subtitleMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		this.player.on('item', () => {
			scrollContainer.innerHTML = '';
		});

		const addOffButton = () => {
			this.createLanguageMenuButton(scrollContainer, {
				language: '',
				label: this.player.localize('Off'),
				type: 'off',
				id: -1,
				buttonType: 'subtitle',
			});
		};

		if (this.player.hasSubtitles()) {
			addOffButton();
			Object.values(this.player.subtitles()).forEach((track) => {
				this.createLanguageMenuButton(scrollContainer, {
					language: track.language!,
					label: track.label!,
					type: track.type!,
					id: track.id!,
					buttonType: 'subtitle',
				});
			});
		}

		this.player.on('subtitleList', (tracks) => {
			scrollContainer.innerHTML = '';

			addOffButton();
			Object.values(tracks).forEach((track) => {
				this.createLanguageMenuButton(scrollContainer, {
					language: track.language!,
					label: track.label!,
					type: track.type!,
					id: track.id!,
					buttonType: 'subtitle',
				});
			});
		});

		this.player.on('show-subtitles-menu', (showing) => {
			if (showing) {
				subtitleMenu.style.display = 'flex';

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				subtitleMenu.style.display = 'none';
			}
		});

		return subtitleMenu;
	}

	createSubtitleSettingMenuButton(parent: HTMLDivElement, data: {
		label: string;
		property: keyof SubtitleStyle | '';
		buttonType: string;
	}
	) {

		const subtitleSettingButton = this.player.createElement('button', `subtitleSetting-button-${this.spaceToCamel(data.label)}`)
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		const subtitleSettingButtonText = this.player.createElement('span', `menu-button-text-${this.spaceToCamel(data.label)}`)
			.addClasses(this.menuButtonTextStyles)
			.appendTo(subtitleSettingButton).get();

		subtitleSettingButtonText.innerText = this.player.localize(data.label);

		const subtitleSettingButtonValueText = this.player.createElement('span', `menu-button-text-${this.spaceToCamel(data.label)}`)
			.addClasses(this.menuButtonSubTextStyles)
			.appendTo(subtitleSettingButton).get();
		this.player.addClasses(subtitleSettingButtonValueText, ['ml-auto']);

		if (data.property) {
			const value = this.player.subtitleStyle()[data.property as keyof SubtitleStyle]!.toString();
			const isNumber = !isNaN(parseInt(value, 10));

			if (data.property === 'fontFamily') {
				console.log(fontFamilies.find(f => f.value == value))
				subtitleSettingButtonValueText.innerText = fontFamilies.find(f => f.value == value)!.name;
			} else if (data.property === 'edgeStyle') {
				subtitleSettingButtonValueText.innerText = edgeStyles.find(f => f.value == value)!.name;
			}
			else {
				subtitleSettingButtonValueText.innerText = toTitleCase(value + (isNumber ? '%' : ''));
			}

			const chevron = this.createSVGElement(subtitleSettingButton, 'menu', this.buttons.chevronR, false, false);
			this.player.addClasses(chevron, ['ml-2']);

			this.createSubtitleSettingMenu(parent, data);

			this.player.on('set-subtitle-style', (style: SubtitleSettingAction) => {
				if (data.property != style.property) return;

				const value = this.player.subtitleStyle()[style.property as keyof SubtitleStyle]!.toString();
				const isNumber = !isNaN(parseInt(value, 10));

				if (data.property === 'fontFamily') {
					console.log(fontFamilies.find(f => f.value == value))
					subtitleSettingButtonValueText.innerText = fontFamilies.find(f => f.value == value)!.name;
				} else if (data.property === 'edgeStyle') {
					subtitleSettingButtonValueText.innerText = edgeStyles.find(f => f.value == value)!.name;
				}
				else {
					subtitleSettingButtonValueText.innerText = toTitleCase(value + (isNumber ? '%' : ''));
				}
			});
		}

		subtitleSettingButton.addEventListener('click', (event) => {
			event.stopPropagation();
			if (data.property) {
				this.player.emit('show-subtitleSetting-menu', data.property);
				this.player.emit('hide-subtitleSettings-menu');
			}
			else {
				this.player.subtitleStyle(defaultSubtitleStyles);
			}
		});

		this.addKeyEventsToLanguageButton(subtitleSettingButton, parent);

		return subtitleSettingButton;
	}

	createSubtitleSettingsMenu(parent: HTMLDivElement) {

		const subtitleSettingsMenu = this.player.createElement('div', 'subtitleSettings-menu')
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent).get();

		subtitleSettingsMenu.addEventListener('click', (e) => e.stopPropagation());

		this.createMenuHeader(subtitleSettingsMenu, 'Subtitle Settings');

		const scrollContainer = this.player.createElement('div', 'subtitleSettings-scroll-container')
			.addClasses([
				...this.scrollContainerStyles,
				'!w-80',
			])
			.appendTo(subtitleSettingsMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Font',
			property: 'fontFamily',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Text size',
			property: 'fontSize',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Text color',
			property: 'textColor',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Text opacity',
			property: 'textOpacity',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Edge style',
			property: 'edgeStyle',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Area color',
			property: 'backgroundColor',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Area opacity',
			property: 'backgroundOpacity',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Background color',
			property: 'areaColor',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Background opacity',
			property: 'windowOpacity',
			buttonType: 'subtitleSetting',
		});
		this.createSubtitleSettingMenuButton(scrollContainer, {
			label: 'Reset',
			property: '',
			buttonType: 'subtitleSetting',
		});

		this.player.on('show-subtitleSettings-menu', (property) => {
			if (property != false) {
				subtitleSettingsMenu.style.display = 'flex';
				this.menuFrame.classList.add('group-[&.nomercyplayer:has(.open)]:backdrop:!hidden');
				this.center.classList?.add('!bg-none');

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				subtitleSettingsMenu.style.display = 'none';
			}
		});

		return subtitleSettingsMenu;
	}

	createSubtitleSettingMenu(parent: HTMLDivElement, data: {
		label: string;
		property: keyof SubtitleStyle | '';
		buttonType: string;
	}
	) {

		const subtitleSettingMenu = this.player.createElement('div', `subtitleSetting-menu-${data.property}`)
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent.parentElement!.parentElement!).get();
		subtitleSettingMenu.style.display = 'none';

		subtitleSettingMenu.addEventListener('click', (e) => e.stopPropagation());

		this.createSubtitleSettingMenuHeader(subtitleSettingMenu, data.label);

		const scrollContainer = this.player.createElement('div', `subtitleSetting-scroll-container-${data.property}`)
			.addClasses([
				...this.scrollContainerStyles,
				'!w-80',
			])
			.appendTo(subtitleSettingMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		this.subtitleSettingActions
			.filter(a => a.property == data.property)
			.forEach((action) => {
				this.createSubtitleSettingActionButton(scrollContainer, action);
			});

		this.player.on('show-subtitleSetting-menu', (property: string) => {
			if (data.property == property) {
				subtitleSettingMenu.style.display = 'flex';
				this.menuFrame.classList.add('group-[&.nomercyplayer:has(.open)]:backdrop:!hidden');
				this.center.classList?.add('!bg-none');

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				subtitleSettingMenu.style.display = 'none';
			}
		});

		this.player.on('hide-subtitleSetting-menu', () => {
			subtitleSettingMenu.style.display = 'none';
		});

		return scrollContainer;
	}

	createSubtitleSettingActionButton(parent: HTMLDivElement, data: SubtitleSettingAction) {

		const subtitleSettingActionButton = this.player.createElement('button', `subtitleSetting-action-button-${data.property}`)
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		const subtitleSettingActionButtonText = this.player.createElement('span', 'menu-button-text')
			.addClasses(this.menuButtonTextStyles)
			.appendTo(subtitleSettingActionButton).get();

		subtitleSettingActionButtonText.innerText = toTitleCase(this.player.localize(data.label));

		const chevron = this.createSVGElement(subtitleSettingActionButton, 'checkmark', this.buttons.checkmark, false, false);
		this.player.addClasses(chevron, ['ml-auto']);

		if (data.value != this.player.subtitleStyle()[data.property as keyof SubtitleStyle]) {
			chevron.classList.add('hidden');
		}

		this.player.on('set-subtitle-style', (style) => {
			if (data.property != style.property) return;

			if (data.value == style.value) {
				chevron.classList.remove('hidden');
			} else {
				chevron.classList.add('hidden');
			}
		});

		subtitleSettingActionButton.addEventListener('click', (event) => {
			event.stopPropagation();
			data.action(event);

			this.player.emit('set-subtitle-style', data);
		});

		this.addKeyEventsToLanguageButton(subtitleSettingActionButton, parent);

		return subtitleSettingActionButton;
	}

	createSpeedMenu(parent: HTMLDivElement, hovered = false) {
		const speedMenu = this.player.createElement('div', 'speed-menu')
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent).get();

		this.createMenuHeader(speedMenu, 'speed');

		const scrollContainer = this.player.createElement('div', 'speed-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(speedMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		for (const speed of this.player.speeds() ?? []) {
			const speedButton = this.player.createElement('button', `speed-button-${speed}`)
				.addClasses(this.languageMenuStyles)
				.appendTo(scrollContainer).get();

			const speedButtonSpan = this.player.createElement('span', `menu-button-text-${speed}`)
				.appendTo(speedButton).get();

			const speedButtonText = this.player.createElement('span', `menu-button-text-${speed}`)
				.addClasses(this.menuButtonTextStyles)
				.appendTo(speedButtonSpan).get();

			speedButtonText.innerText = speed == 1 ? this.player.localize('Normal') : speed.toString();

			const chevron = this.createSVGElement(speedButton, 'menu', this.buttons.checkmark, false, hovered);
			this.player.addClasses(chevron, [
				'ml-auto',
				'hidden',
			]);

			this.player.on('speed', (event) => {
				if (event === speed) {
					chevron.classList.remove('hidden');
					speedButton.classList.add('bg-white/20');
				} else {
					chevron.classList.add('hidden');
					speedButton.classList.remove('bg-white/20');
				}
			});

			speedButton.addEventListener('click', () => {
				this.player.emit('show-menu', false);
				this.player.speed(speed);
			});

			if (speed == this.player.speed()) {
				chevron.classList.remove('hidden');
				speedButton.classList.add('bg-white/20');
			}
		}

		this.player.on('show-speed-menu', (showing) => {
			if (showing) {
				speedMenu.style.display = 'flex';

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				speedMenu.style.display = 'none';
			}
		});

		return speedMenu;
	}

	createQualityMenu(parent: HTMLDivElement) {
		const qualityMenu = this.player.createElement('div', 'quality-menu')
			.addClasses(this.subMenuContentStyles)
			.appendTo(parent).get();

		this.createMenuHeader(qualityMenu, 'quality');

		const scrollContainer = this.player.createElement('div', 'quality-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(qualityMenu).get();

		scrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(scrollContainer);

		this.player.on('item', () => {
			scrollContainer.innerHTML = '';
		});

		const addAutoButton = (container: HTMLDivElement) => {
			this.createAutoQualityButton(container);
		};

		if (this.player.hasQualities()) {
			addAutoButton(scrollContainer);
			Object.values(this.player.qualityLevels()).forEach((level) => {
				this.createQualityMenuButton(scrollContainer, {
					id: level.id,
					width: level.width ?? 0,
					height: level.height ?? 0,
					label: level.label,
					bitrate: level.bitrate ?? 0,
				});
			});
			this.highlightCurrentQuality(scrollContainer);
		}

		this.player.on('levels', (levels) => {
			scrollContainer.innerHTML = '';

			addAutoButton(scrollContainer);
			Object.values(levels).forEach((level) => {
				this.createQualityMenuButton(scrollContainer, {
					id: level.id,
					width: level.width ?? 0,
					height: level.height ?? 0,
					label: level.label,
					bitrate: level.bitrate ?? 0,
				});
			});
			this.isAutoQuality = true;
			this.highQuality = false;
			this.highlightCurrentQuality(scrollContainer);
		});

		this.player.on('show-quality-menu', (showing) => {
			if (showing) {
				qualityMenu.style.display = 'flex';

				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				qualityMenu.style.display = 'none';
			}
		});

		return qualityMenu;
	}

	createQualityMenuButton(parent: HTMLDivElement, data: {
		width: number;
		id: number;
		bitrate: number;
		label: string;
		height: number
	}, hovered = false) {

		const qualityButton = this.player.createElement('button', `quality-button-${data.height}-${data.bitrate}`)
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		qualityButton.dataset.levelId = String(data.id);

		const qualityButtonText = this.player.createElement('span', 'menu-button-text')
			.addClasses(this.menuButtonTextStyles)
			.appendTo(qualityButton).get();

		qualityButtonText.innerText = `${this.player.localize((data.label)
			?.replace('segment-metadata', 'Off'))}`;

		const chevron = this.createSVGElement(qualityButton, 'checkmark', this.buttons.checkmark, false, hovered);
		this.player.addClasses(chevron, ['ml-auto']);

		if (data.id > 0) {
			chevron.classList.add('hidden');
		}

		this.player.on('levelsChanging', (level) => {
			if (!this.isAutoQuality && level.id == data.id) {
				chevron.classList.remove('hidden');
				qualityButton.classList.add('bg-white/20');
			} else {
				chevron.classList.add('hidden');
				qualityButton.classList.remove('bg-white/20');
			}
		});

		qualityButton.addEventListener('click', (event) => {
			event.stopPropagation();

			this.isAutoQuality = false;
			this.highQuality = true;
			this.selectedQualityIndex = data.id;
			this.player.quality(data.id);
			this.highlightCurrentQuality(parent);
			this.updateQualityButtonIcon();

			this.player.emit('show-menu', false);
		});

		return qualityButton;
	}

	createAutoQualityButton(parent: HTMLDivElement, hovered = false) {
		const autoButton = this.player.createElement('button', 'quality-button-auto')
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		const autoButtonText = this.player.createElement('span', 'menu-button-text')
			.addClasses(this.menuButtonTextStyles)
			.appendTo(autoButton).get();

		const updateAutoLabel = () => {
			if (!this.isAutoQuality) {
				autoButtonText.innerText = this.player.localize('auto');
				return;
			}
			const levels = this.player.qualityLevels();
			const currentId = this.player.quality();
			const current = levels.find(l => l.id === currentId);
			if (current?.label) {
				autoButtonText.innerText = `${this.player.localize('auto')} (${this.player.localize(current.label)})`;
			} else {
				autoButtonText.innerText = this.player.localize('auto');
			}
		};

		updateAutoLabel();
		this.player.on('levelsChanging', updateAutoLabel);
		this.player.on('levelsChanged', updateAutoLabel);

		const chevron = this.createSVGElement(autoButton, 'checkmark', this.buttons.checkmark, false, hovered);
		this.player.addClasses(chevron, ['ml-auto']);

		autoButton.addEventListener('click', (event) => {
			event.stopPropagation();

			this.isAutoQuality = true;
			this.highQuality = false;
			this.player.quality(-1);
			this.highlightCurrentQuality(parent);
			this.updateQualityButtonIcon();

			this.player.emit('show-menu', false);
		});

		return autoButton;
	}

	updateQualityButtonIcon() {
		const qualityBtn = this.player.container.querySelector('#quality');
		const path = qualityBtn?.querySelector('path');
		if (path) {
			path.setAttribute('d', this.highQuality
				? this.buttons.quality.hover
				: this.buttons.quality.normal);
		}
	}

	highlightCurrentQuality(container: HTMLDivElement) {
		const buttons = container.querySelectorAll('button');
		buttons.forEach((btn) => {
			const chevron = btn.querySelector('.checkmark, [id*="checkmark"]');
			const levelId = (btn as HTMLElement).dataset.levelId;
			if (levelId === undefined) {
				// Auto button
				chevron?.classList.toggle('hidden', !this.isAutoQuality);
				btn.classList.toggle('bg-white/20', this.isAutoQuality);
			} else {
				// Level buttons
				const isActive = !this.isAutoQuality && Number(levelId) === this.selectedQualityIndex;
				chevron?.classList.toggle('hidden', !isActive);
				btn.classList.toggle('bg-white/20', isActive);
			}
		});
	}

	createSeekRipple(parent: HTMLDivElement, side: string) {

		const seekRipple = this.player.createElement('div', 'seek-ripple')
			.addClasses(['seek-ripple', side])
			.appendTo(parent).get();

		const arrowHolder = this.player.createElement('div', 'seek-ripple-arrow')
			.addClasses(['seek-ripple-arrow'])
			.appendTo(seekRipple).get();

		const text = this.player.createElement('p', 'seek-ripple-text')
			.addClasses(['seek-ripple-text'])
			.appendTo(seekRipple).get();

		if (side == 'left') {
			seekRipple.style.borderRadius = '0 50% 50% 0';
			seekRipple.style.left = '0px';
			arrowHolder.innerHTML = `
				<div class="arrow arrow2 arrow-left"></div>
				<div class="arrow arrow1 arrow-left"></div>
				<div class="arrow arrow3 arrow-left"></div>
			`;
			this.player.on('rewind', (val: number) => {
				text.innerText = `${Math.abs(val)} ${this.player.localize('seconds')}`;
				seekRipple.style.display = 'flex';
			});
			this.player.on('remove-rewind', () => {
				seekRipple.style.display = 'none';
			});
		} else if (side == 'right') {
			seekRipple.style.borderRadius = '50% 0 0 50%';
			seekRipple.style.right = '0px';
			arrowHolder.innerHTML = `
				<div class="arrow arrow3 arrow-right"></div>
				<div class="arrow arrow1 arrow-right"></div>
				<div class="arrow arrow2 arrow-right"></div>
			`;
			this.player.on('forward', (val: number) => {
				text.innerText = `${Math.abs(val)} ${this.player.localize('seconds')}`;
				seekRipple.style.display = 'flex';
			});
			this.player.on('remove-forward', () => {
				seekRipple.style.display = 'none';
			});
		}

		return seekRipple;
	}

	createProgressBar(parent: HTMLDivElement) {

		this.sliderBar = this.player.createElement('div', 'slider-bar')
			.addClasses([
				'slider-bar',
				'bg-white/20',
				'flex',
				'group/slider',
				'h-2',
				'mx-4',
				'pointer-events-auto',
				'relative',
				'rounded-full',
				'w-available',
			])
			.appendTo(parent).get();

		const sliderBuffer = this.player.createElement('div', 'slider-buffer')
			.addClasses([
				'slider-buffer',
				'absolute',
				'flex',
				'h-full',
				'overflow-clip',
				'overflow-hidden',
				'pointer-events-none',
				'rounded-full',
			])
			.appendTo(this.sliderBar).get();
		sliderBuffer.style.zIndex = '1';
		sliderBuffer.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';

		const sliderHover = this.player.createElement('div', 'slider-hover')
			.addClasses([
				'slider-hover',
				'absolute',
				'bg-white/30',
				'flex',
				'h-full',
				'opacity-1',
				'overflow-clip',
				'overflow-hidden',
				'pointer-events-none',
				'rounded-full',
				'z-0',
			])
			.appendTo(this.sliderBar).get();

		const sliderProgress = this.player.createElement('div', 'slider-progress')
			.addClasses([
				'slider-progress',
				'absolute',
				'bg-white',
				'flex',
				'h-full',
				'overflow-clip',
				'overflow-hidden',
				'pointer-events-none',
				'rounded-full',
				'z-10',
			])
			.appendTo(this.sliderBar).get();

		this.chapterBar = this.player.createElement('div', 'chapter-progress')
			.addClasses([
				'chapter-bar',
				'bg-transparent',
				'flex',
				'h-2',
				'overflow-clip',
				'relative',
				'rounded-full',
				'w-available',
			])
			.appendTo(this.sliderBar).get();

		const sliderNipple = document.createElement('div');
		this.player.addClasses(sliderNipple, [
			'slider-nipple',
			'!-translate-x-1/2',
			'!-translate-y-1/4',
			'absolute',
			'bg-white',
			'group-hover/slider:flex',
			'h-4',
			'hidden',
			'left-0',
			'rounded-full',
			'top-0',
			'w-4',
			'z-20',
		]);
		sliderNipple.id = 'slider-nipple';

		if (this.player.options.nipple != false) {
			this.sliderBar.append(sliderNipple);
		}

		const sliderPop = this.player.createElement('div', 'slider-pop')
			.addClasses([
				'slider-pop',
				'-translate-x-1/2',
				'absolute',
				'bg-neutral-900/95',
				'bottom-4',
				'flex',
				'flex-col',
				'font-semibold',
				'gap-1',
				'hover:scale-110',
				'overflow-clip',
				'pb-1',
				'pointer-events-none',
				'rounded-md',
				'text-center',
				'z-20',
			])
			.appendTo(this.sliderBar).get();

		sliderPop.style.setProperty('--visibility', '0');
		sliderPop.style.opacity = 'var(--visibility)';

		this.sliderPopImage = this.player.createElement('div', 'slider-pop-image')
			.addClasses(['slider-pop-image'])
			.appendTo(sliderPop).get();

		const sliderText = this.player.createElement('div', 'slider-text')
			.addClasses([
				'slider-pop-text',
				'font-mono',
			])
			.appendTo(sliderPop).get();

		this.chapterText = this.player.createElement('div', 'chapter-text')
			.addClasses(['chapter-text'])
			.appendTo(sliderPop).get();

		if (this.player.options.chapters && !this.player.isTv() && this.player.chapters()?.length > 0) {
			this.sliderBar.style.background = '';
		}

		['mousedown', 'touchstart'].forEach((event) => {
			this.sliderBar.addEventListener(event, () => {
				if (this.isMouseDown) return;

				this.isMouseDown = true;
				this.isScrubbing = true;
			}, {
				passive: true,
			});
		});

		this.bottomBar.addEventListener('click', (e: any) => {
			this.player.emit('hide-tooltip');
			if (!this.isMouseDown) return;

			this.isMouseDown = false;
			this.isScrubbing = false;
			sliderPop.style.setProperty('--visibility', '0');
			const scrubTime = this.getScrubTime(e);
			sliderNipple.style.left = `${scrubTime.scrubTime}%`;
			this.player.seek(scrubTime.scrubTimePlayer);
		}, {
			passive: true,
		});

		['mousemove', 'touchmove'].forEach((event) => {
			this.sliderBar.addEventListener(event, (e: any) => {
				const scrubTime = this.getScrubTime(e);
				this.getSliderPopImage(scrubTime);
				sliderText.innerText = humanTime(scrubTime.scrubTimePlayer);

				const sliderPopOffsetX = this.getSliderPopOffsetX(sliderPop, scrubTime);
				sliderPop.style.left = `${sliderPopOffsetX}%`;

				if (!this.player.options.chapters || this.player.chapters()?.length == 0) {
					sliderHover.style.width = `${scrubTime.scrubTime}%`;
				}

				if (!this.isMouseDown) return;

				this.chapterText.innerText = this.getChapterText(scrubTime.scrubTimePlayer) ?? '';
				sliderNipple.style.left = `${scrubTime.scrubTime}%`;
				if (this.previewTime.length > 0) {
					sliderPop.style.setProperty('--visibility', '1');
				}
			}, {
				passive: true,
			});
		});
		this.sliderBar.addEventListener('mouseover', (e: MouseEvent) => {
			const scrubTime = this.getScrubTime(e);
			this.getSliderPopImage(scrubTime);
			sliderText.innerText = humanTime(scrubTime.scrubTimePlayer);
			this.chapterText.innerText = this.getChapterText(scrubTime.scrubTimePlayer) ?? '';
			if (this.previewTime.length > 0) {
				sliderPop.style.setProperty('--visibility', '1');
				const sliderPopOffsetX = this.getSliderPopOffsetX(sliderPop, scrubTime);
				sliderPop.style.left = `${sliderPopOffsetX}%`;
			}
		}, {
			passive: true,
		});

		this.player.on('active', (value) => {
			setTimeout(() => {
				this.controlsVisible = value;
			}, (this.player.options.doubleClickDelay ?? 300) + 10);
			if (value) return;
			sliderPop.style.setProperty('--visibility', '0');
		});

		this.sliderBar.addEventListener('mouseleave', () => {
			sliderPop.style.setProperty('--visibility', '0');
			sliderHover.style.width = '0';
		}, {
			passive: true,
		});

		this.player.on('seeked', () => {
			sliderPop.style.setProperty('--visibility', '0');
		});

		this.player.on('item', () => {
			this.sliderBar.classList.add('bg-white/20');
			this.previewTime = [];
			this.chapters = [];
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
			this.fetchPreviewTime();
		});

		this.player.on('chapters', () => {
			if (this.player.chapters()?.length > 0 && !this.player.isTv()) {
				this.sliderBar.classList.remove('bg-white/20');
			} else {
				this.sliderBar.classList.add('bg-white/20');
			}
		});

		const updateBuffer = () => {
			const video = this.player.videoElement;
			if (video && video.buffered.length > 0 && video.duration > 0) {
				const bufferedEnd = video.buffered.end(video.buffered.length - 1);
				const bufferPct = (bufferedEnd / video.duration) * 100;
				sliderBuffer.style.width = `${bufferPct}%`;
			}
		};

		this.player.videoElement?.addEventListener('progress', updateBuffer);

		this.player.on('time', (data) => {
			if (this.player.chapters()?.length == 0) {
				sliderProgress.style.width = `${data.percentage}%`;
			}
			if (!this.isScrubbing) {
				sliderNipple.style.left = `${data.percentage}%`;
			}
			updateBuffer();
		});

		this.player.on('active', (showing) => {
			if (!showing && !this.isAnyMenuOpen) {
				sliderPop.style.setProperty('--visibility', '0');
				this.menuFrame.close();
			}
		});

		this.player.on('pip', (data) => {
			if (data) {
				this.sliderBar.style.display = 'none';
			} else {
				this.sliderBar.style.display = 'flex';
			}
		});

		return this.sliderBar;
	}

	getChapterText(scrubTimePlayer: number): string | null {
		if (this.player.chapters().length == 0) return null;

		const index = this.player.chapters()?.findIndex((chapter: Chapter) => {
			return chapter.startTime > scrubTimePlayer;
		});

		return this.player.chapters()[index - 1]?.title
			?? this.player.chapters()[this.player.chapters()?.length - 1]?.title
			?? null;
	}

	createChapterMarker(chapter: Chapter) {
		const chapterMarker = this.player.createElement('div', `chapter-marker-${chapter.id.replace(/\s/gu, '-')}`)
			.addClasses([
				'chapter-marker',
				'[&:last-child(2):.5px]',
				'absolute',
				'h-available',
				'last:translate-x-[1.5px]',
				'min-w-[2px]',
				'overflow-hidden',
				'rounded-sm',
			])
			.appendTo(this.chapterBar).get();
		chapterMarker.style.left = `${chapter.left}%`;
		chapterMarker.style.width = `calc(${chapter.width}% - 2px)`;

		this.player.createElement('div', `chapter-marker-bg-${chapter.id.replace(/\s/gu, '-')}`)
			.addClasses([
				'chapter-marker-bg',
				'absolute',
				'bg-white/20',
				'h-available',
				'left-0',
				'rounded-sm',
				'w-available',
				'z-0',
			])
			.appendTo(chapterMarker).get();

		const chapterMarkerHover = this.player.createElement('div', `chapter-marker-hover-${chapter.id.replace(/\s/gu, '-')}`)
			.addClasses([
				'chapter-marker-hover',
				'absolute',
				'bg-gray-200',
				'h-available',
				'left-0',
				'origin-left',
				'rounded-sm',
				'scale-x-0',
				'w-available',
				'z-10',
			])
			.appendTo(chapterMarker).get();

		const chapterMarkerProgress = this.player.createElement('div', `chapter-marker-progress-${chapter.id.replace(/\s/gu, '-')}`)
			.addClasses([
				'chapter-marker-progress',
				'absolute',
				'bg-white',
				'h-available',
				'left-0',
				'origin-left',
				'rounded-sm',
				'scale-x-0',
				'w-available',
				'z-20',
			])
			.appendTo(chapterMarker).get();

		const left = chapter.left;
		const right = chapter.left + chapter.width;

		this.player.on('time', (data) => {
			if (data.percentage < left) {
				chapterMarkerProgress.style.transform = 'scaleX(0)';
			} else if (data.percentage > right) {
				chapterMarkerProgress.style.transform = 'scaleX(1)';
			} else {
				chapterMarkerProgress.style.transform = `scaleX(${(data.percentage - left) / (right - left)})`;
			}
		});

		['mousemove', 'touchmove'].forEach((event) => {
			this.chapterBar.addEventListener(event, (e: any) => {
				const { scrubTime } = this.getScrubTime(e);

				if (scrubTime < left) {
					chapterMarkerHover.style.transform = 'scaleX(0)';
				} else if (scrubTime > right) {
					chapterMarkerHover.style.transform = 'scaleX(1)';
				} else {
					chapterMarkerHover.style.transform = `scaleX(${(scrubTime - left) / (right - left)})`;
				}

			});
		});

		this.chapterBar.addEventListener('mouseleave', () => {
			chapterMarkerHover.style.transform = 'scaleX(0)';
		});

		return chapterMarker;
	}

	createChapterMarkers() {
		if (this.player.isTv()) return;

		this.chapterBar.style.background = '';

		this.player.on('item', () => {
			this.chapterBar.style.background = '';
		});

		this.chapterBar.querySelectorAll('.chapter-marker').forEach((element) => {
			this.chapterBar.classList.add('bg-white/20');
			element.remove();
		});
		this.player.chapters()?.forEach((chapter: Chapter) => {
			this.createChapterMarker(chapter);
		});
	}

	getSliderPopOffsetX(sliderPop: HTMLDivElement, scrubTime: any) {
		const sliderBarRect = this.sliderBar.getBoundingClientRect();
		const sliderPopRect = sliderPop.getBoundingClientRect();
		const sliderPopPercentageWidth = ((sliderPopRect.width * 0.5) / sliderBarRect.width) * 100;
		let offsetX = scrubTime.scrubTime;
		if (offsetX <= sliderPopPercentageWidth) {
			offsetX = sliderPopPercentageWidth;
		}
		if (offsetX >= 100 - sliderPopPercentageWidth) {
			offsetX = 100 - sliderPopPercentageWidth;
		}

		return offsetX;
	}

	createEpisodeMenu(parent: HTMLDivElement) {
		if (!this.player.videoElement) return;

		const playlistMenu = this.player.createElement('div', 'playlist-menu')
			.addClasses([
				...this.subMenuContentStyles,
				'!flex-row',
				'!gap-0',
			])
			.appendTo(parent).get();

		const subMenu = this.player.createElement('div', 'sub-menu-content')
			.addClasses([
				...this.subMenuContentStyles,
				'!w-1/3',
				'border-r-2',
				'border-gray-500/20',
			])
			.appendTo(playlistMenu).get();

		this.createMenuHeader(subMenu, 'Seasons');

		const seasonScrollContainer = this.player.createElement('div', 'playlist-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(subMenu).get();
		seasonScrollContainer.style.transform = 'translateX(0)';
		this.applyScrollbarStyles(seasonScrollContainer);

		seasonScrollContainer.innerHTML = '';
		for (const [, item] of unique(this.player.playlist(), 'season').entries() ?? []) {
			this.createSeasonMenuButton(seasonScrollContainer, item);
		}

		const episodeMenu = this.player.createElement('div', 'episode-menu')
			.addClasses([
				...this.subMenuContentStyles,
				'!w-[63rem]',
			])
			.appendTo(playlistMenu).get();

		this.createMainMenuHeader(episodeMenu);

		const scrollContainer = this.player.createElement('div', 'playlist-scroll-container')
			.addClasses(this.scrollContainerStyles)
			.appendTo(episodeMenu).get();

		scrollContainer.innerHTML = '';
		scrollContainer.tabIndex = 1;
		this.applyScrollbarStyles(scrollContainer);

		scrollContainer.addEventListener('focus', () => {
			(scrollContainer.firstChild as HTMLButtonElement)?.focus();
		});

		for (const [index, item] of this.player.playlist().entries() ?? []) {
			this.createEpisodeMenuButton(scrollContainer, item, index);
		}

		this.player.on('show-playlist-menu', (showing) => {
			if (showing) {
				playlistMenu.style.display = 'flex';
				setTimeout(() => {
					(scrollContainer.firstChild as HTMLButtonElement).focus();
				}, 200);
			} else {
				playlistMenu.style.display = 'none';
			}
		});

		return playlistMenu;
	}

	createSeasonMenuButton(parent: HTMLDivElement, item: PlaylistItem, hovered = false) {
		if (!item?.season) return;

		const seasonButton = this.player.createElement('button', `season-${item.id}`)
			.addClasses(this.languageMenuStyles)
			.appendTo(parent).get();

		const buttonSpan = this.player.createElement('span', `season-${item.id}-span`)
			.addClasses(this.menuButtonTextStyles)
			.appendTo(seasonButton).get();

		buttonSpan.innerText = item?.seasonName
			? item?.seasonName
			: item?.season
				? this.player.localize('Season') + ` ${item?.season}`
				: '';

		const chevron = this.createSVGElement(seasonButton, 'menu', this.buttons.chevronR, false, hovered);
		this.player.addClasses(chevron, ['ml-auto']);

		seasonButton.addEventListener('click', () => {
			this.player.emit('switch-season', item?.season);
		});

		seasonButton.addEventListener('focus', () => {
			setTimeout(() => {
				this.scrollCenter(seasonButton, parent, {
					duration: 100,
					margin: 1,
				});
			}, 50);
		});

		return seasonButton;
	}

	createEpisodeMenuButton(parent: HTMLDivElement, item: PlaylistItem, index: number) {

		const button = this.player.createElement('button', `playlist-${item.id}`)
			.addClasses([
				'playlist-menu-button',
				'duration-300',
				'flex',
				'focus-visible:outline-2',
				'focus-visible:outline-white',
				'gap-2',
				'hover:bg-neutral-600/20',
				'outline',
				'outline-1',
				'outline-solid',
				'outline-transparent',
				'p-2',
				'relative',
				'rounded-lg',
				'snap-center',
				'text-white',
				'transition-all',
				'w-available',
			])
			.appendTo(parent).get();

		if (this.player.playlistItem()?.season !== 1) {
			button.style.display = 'none';
		}

		const leftSide = this.player.createElement('div', `playlist-${item.id}-left`)
			.addClasses([
				'episode-menu-button-left',
				'h-available',
				'overflow-clip',
				'pointer-events-none',
				'relative',
				'rounded-md',
				'self-center',
				'w-[30%]',
			])
			.appendTo(button).get();

		this.player.createElement('div', `episode-${item.id}-shadow`)
			.addClasses([
				'episode-menu-button-shadow',
				'!h-available',
				'absolute',
				'bg-[linear-gradient(0deg,rgba(0,0,0,0.87)_0%,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_100%)]',
				'bottom-0',
				'left-0',
				'shadow-[inset_0px_1px_0px_rgba(255,255,255,0.24),inset_0px_-1px_0px_rgba(0,0,0,0.24),inset_0px_-2px_0px_rgba(0,0,0,0.24)]',
				'w-available',
			])
			.appendTo(leftSide).get();

		const image = this.player.createElement('img', `episode-${item.id}-image`)
			.addClasses([
				'episode-menu-button-image',
				'aspect-video',
				'h-auto',
				'object-cover',
				'w-available',
			])
			.appendTo(leftSide).get();
		image.setAttribute('loading', 'lazy');
		image.src = item.image && item.image != '' ? `${item.image.startsWith('http') ? '' : this.imageBaseUrl}${item.image}` : '';

		const progressContainer = this.player.createElement('div', `episode-${item.id}-progress-container`)
			.addClasses([
				'episode-menu-progress-container',
				'absolute',
				'bottom-0',
				'flex',
				'flex-col',
				'px-3',
				'w-available',
			])
			.appendTo(leftSide).get();

		const progressContainerItemBox = this.player.createElement('div', `episode-${item.id}-progress-box`)
			.addClasses([
				'episode-menu-progress-box',
				'flex',
				'h-available',
				'justify-between',
				'mb-1',
				'px-1',
				'sm:mx-2',
			])
			.appendTo(progressContainer).get();


		const progressContainerItemText = this.player.createElement('div', `episode-${item.id}-progress-item`)
			.addClasses([
				'progress-item-text',
				'text-[0.7rem]',
			])
			.appendTo(progressContainerItemBox).get();

		if (item.episode) {
			progressContainerItemText.innerText = `${this.player.localize('E')}${item.episode}`;
		}

		const progressContainerDurationText = this.player.createElement('div', `episode-${item.id}-progress-duration`)
			.addClasses([
				'progress-duration',
				'text-[0.7rem]',
			])
			.appendTo(progressContainerItemBox).get();
		progressContainerDurationText.innerText = item.duration?.replace(/^00:/u, '') ?? '';

		const sliderContainer = this.player.createElement('div', `episode-${item.id}-slider-container`)
			.addClasses([
				'slider-container',
				'bg-gray-500/80',
				'h-1',
				'hidden',
				'mb-2',
				'mx-1',
				'overflow-clip',
				'rounded-md',
				'sm:mx-2',
			])
			.appendTo(progressContainer).get();

		const progressBar = this.player.createElement('div', `episode-${item.id}-progress-bar`)
			.addClasses([
				'progress-bar',
				'bg-white',
			])
			.appendTo(sliderContainer).get();

		if (item.progress?.time) {
			progressBar.style.width = `${(item.progress.time / convertToSeconds(item.duration)) * 100}%`;
			sliderContainer.style.display = 'flex';
		}

		const episodeMenuButtonRightSide = this.player.createElement('div', `episode-${item.id}-right-side`)
			.addClasses([
				'playlist-card-right',
				'flex',
				'flex-col',
				'gap-1',
				'pointer-events-none',
				'text-left',
				'w-3/4',
			])
			.appendTo(button).get();

		const episodeMenuButtonTitle = this.player.createElement('span', `episode-${item.id}-title`)
			.addClasses([
				'playlist-menu-button-title',
				'font-bold',
				'line-clamp-2',
				'text-white',
			])
			.appendTo(episodeMenuButtonRightSide).get();

		if (item.episode) {
			episodeMenuButtonTitle.innerText = lineBreakShowTitle(item.title?.replace(item.show ?? '', '').replace('%S', this.player.localize('S'))
				.replace('%E', this.player.localize('E')));
		}

		const episodeMenuButtonOverview = this.player.createElement('span', `episode-${item.id}-overview`)
			.addClasses([
				'playlist-menu-button-overview',
				'leading-[1rem]',
				'line-clamp-4',
				'overflow-hidden',
				'text-[0.7rem]',
				'text-white',
			])
			.appendTo(episodeMenuButtonRightSide).get();
		episodeMenuButtonOverview.innerText = limitSentenceByCharacters(item.description, 600);

		this.player.on('item', (playlistItem) => {
			if (playlistItem.season == item.season) {
				button.style.display = 'flex';
			} else {
				button.style.display = 'none';
			}

			if (this.player.playlistItem().season == item.season && this.player.playlistItem().episode == item.episode) {
				button.style.background = 'rgba(255,255,255,.1)';
			} else {
				button.style.background = '';
			}
		});

		this.player.on('switch-season', (season) => {
			if (season == item.season) {
				button.style.display = 'flex';
			}
			else {
				button.style.display = 'none';
			}
		});

		this.player.on('time', (data) => {
			if (this.player.playlistItem()?.id == item.id) {
				progressBar.style.width = `${data.percentage}%`;
				if (data.percentage > 0) {
					sliderContainer.style.display = 'flex';
				}
			}
		});

		if (item.episode && item.show) {
			progressContainerItemText.innerText
				= item.season == undefined ? `${item.episode}` : `${this.player.localize('S')}${item.season}: ${this.player.localize('E')}${item.episode}`;
		}

		button.addEventListener('click', () => {
			this.player.emit('show-menu', false);

			if (item.episode && item.season) {
				this.setEpisode(item.season, item.episode);
			} else {
				this.player.playlistItem(index);
			}
			this.player.emit('playlist-menu-button-clicked', item);
		});

		button.addEventListener('focus', () => {
			setTimeout(() => {
				this.scrollCenter(button, parent, {
					duration: 100,
					margin: 1,
				});
			}, 50);
		});

		return button;
	}

	createToolTip(parent: HTMLDivElement) {
		this.tooltip = this.player.createElement('div', 'tooltip')
			.addClasses([
				'tooltip',
				'absolute',
				'bg-neutral-900/95',
				'bottom-0',
				'font-medium',
				'hidden',
				'left-0',
				'pointer-events-none',
				'px-3',
				'py-2',
				'rounded-lg',
				'text-white',
				'text-xs',
				'z-50',
			])
			.appendTo(parent).get();

		this.tooltip.style.transform = 'translateX(10px)';
		this.tooltip.innerText = 'Play (space)';

		this.player.on('show-tooltip', (data) => {
			this.tooltip.innerText = data.text;
			this.tooltip.style.display = 'block';
			this.tooltip.style.transform = `translate(calc(${data.x} - 50%), calc(${data.y} - 100%))`;
			if (data.currentTime == 'top') {
				this.tooltip.classList.add('top-0');
				this.tooltip.classList.remove('bottom-0');
			} else {
				this.tooltip.classList.remove('top-0');
				this.tooltip.classList.add('bottom-0');
			}
		});

		this.player.on('hide-tooltip', () => {
			this.tooltip.style.display = 'none';
		});

		return this.tooltip;
	}

	createEpisodeTip(parent: HTMLDivElement) {

		const nextTip = this.player.createElement('div', 'episode-tip')
			.addClasses([
				'episode-tip',
				'!w-96',
				'-bottom-10',
				'absolute',
				'bg-neutral-900/95',
				'font-medium',
				'gap-2',
				'h-24',
				'hidden',
				'left-0',
				'px-2',
				'py-2',
				'rounded-lg',
				'text-white',
				'text-xs',
				'z-50',
				'group-[&.nomercyplayer:not(.active)]:!hidden',
			])
			.appendTo(parent).get();

		const leftSide = this.player.createElement('div', 'next-tip-left')
			.addClasses([
				'next-tip-left',
				'overflow-clip',
				'relative',
				'rounded-sm',
				'self-center',
				'w-[40%]',
			])
			.appendTo(nextTip).get();

		const image = this.player.createElement('img', 'next-tip-image')
			.addClasses([
				'playlist-card-image',
				'aspect-video',
				'h-auto',
				'object-cover',
				'rounded-md',
				'w-available',
			])
			.appendTo(leftSide).get();
		image.setAttribute('loading', 'eager');

		const rightSide = this.player.createElement('div', 'next-tip-right-side')
			.addClasses([
				'next-tip-right',
				'flex',
				'flex-col',
				'gap-1',
				'text-left',
				'w-[60%]',
			])
			.appendTo(nextTip).get();

		const header = this.player.createElement('span', 'next-tip-header')
			.addClasses([
				'next-tip-header',
				'font-bold',
			])
			.appendTo(rightSide).get();

		const title = this.player.createElement('span', 'next-tip-title')
			.addClasses([
				'next-tip-header',
				'font-bold',
				'font-sm',
				'line-clamp-3',
			])
			.appendTo(rightSide).get();

		this.player.on('show-episode-tip', (data) => {
			this.getTipData({ direction: data.direction, header, title, image });
			nextTip.style.display = 'flex';
			nextTip.style.transform = `translate(${data.x}, calc(${data.y} - 50%))`;
		});

		this.player.on('hide-episode-tip', () => {
			nextTip.style.display = 'none';
		});

		return nextTip;
	}

	getTipDataIndex(direction: string) {
		let index: number = this.player.playlistIndex();
		if (direction == 'previous') {
			index -= 1;
		} else {
			index += 1;
		}

		return this.player.playlist().at(index);
	}

	getTipData({ direction, header, title, image }: { direction: string; header: HTMLSpanElement; title: HTMLSpanElement; image: HTMLImageElement; }) {

		const item = this.getTipDataIndex(direction);
		if (!item) return;

		image.src = item.image && item.image != '' ? `${item.image.startsWith('http') ? '' : this.imageBaseUrl}${item.image}` : '';
		header.innerText = `${this.player.localize(`${toTitleCase(direction)} Episode`)} ${this.getButtonKeyCode(direction)}`;
		title.innerText = item.title?.replace(item.show ?? '', '').replace('%S', this.player.localize('S'))
			.replace('%E', this.player.localize('E'));

		this.player.once('item', () => {
			this.getTipData({ direction, header, title, image });
		});
	}

	createButton(match: string, id: string, insert: 'before' | 'after' = 'after', icon: Icon['path'], click?: () => void, rightClick?: () => void) {

		const element = document.querySelector<HTMLButtonElement>(`${match}`);
		if (!element) {
			throw new Error('Element not found');
		}

		const button = this.createUiButton(element, id.replace(/\s/gu, '_'));
		button.ariaLabel = id;

		if (insert === 'before') {
			element?.before(button);
		} else {
			element?.after(button);
		}

		this.createSVGElement(button, `${id.replace(/\s/gu, '_')}-enabled`, icon, true, false);
		this.createSVGElement(button, id.replace(/\s/gu, '_'), icon, false);

		button.addEventListener('click', (event) => {
			event.stopPropagation();
			click?.();
			this.player.emit('hide-tooltip');
		});
		button.addEventListener('contextmenu', (event) => {
			event.stopPropagation();
			rightClick?.();
			this.player.emit('hide-tooltip');
		});

		return button;
	}
}

