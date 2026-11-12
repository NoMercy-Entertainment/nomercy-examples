import { WebVTTParser } from 'webvtt-parser';
import { PlayerUIPlugin } from '@nomercy-entertainment/nomercy-video-player/src/plugins/playerUIPlugin';
import type { PreviewTime } from '@nomercy-entertainment/nomercy-video-player/src/types';

export class StepPlugin extends PlayerUIPlugin {
  private previewTime: PreviewTime[] = [];
  private sliderPop!: HTMLDivElement;
  private sliderPopImage!: HTMLDivElement;
  private sliderPopText!: HTMLSpanElement;

  use() {
    super.use();
    this.createSeekPreview();

    this.player.on('ready', () => this.fetchPreviewTime());
    this.player.on('item', () => {
      this.previewTime = [];
      this.fetchPreviewTime();
    });
  }

  private fetchPreviewTime() {
    if (this.previewTime.length > 0) return;

    const imageFile = this.player.spriteFile();
    const timeFile = this.player.timeFile();
    if (!imageFile || !timeFile) return;

    // A relative sprite path loads from basePath, like the other playlist files.
    const imageUrl = imageFile.startsWith('http') ? imageFile : (this.player.options.basePath ?? '') + imageFile;
    this.sliderPopImage.style.backgroundImage = `url('${imageUrl}')`;

    this.player.getFileContents<string>({
      url: timeFile,
      options: { type: 'text' },
      callback: (data: string) => {
        const parser = new WebVTTParser();
        const vtt = parser.parse(data, 'metadata');
        const regex = /(?<x>\d+),(?<y>\d+),(?<w>\d+),(?<h>\d+)/u;

        this.previewTime = [];
        vtt.cues.forEach((cue: any) => {
          const match = regex.exec(cue.text);
          if (!match?.groups) return;

          this.previewTime.push({
            start: cue.startTime,
            end: cue.endTime,
            x: parseInt(match.groups.x, 10),
            y: parseInt(match.groups.y, 10),
            w: parseInt(match.groups.w, 10),
            h: parseInt(match.groups.h, 10),
          });
        });
      },
    });
  }

  private createSeekPreview() {
    // Find the slider bar that PlayerUIPlugin created
    const sliderBar = this.player.container.querySelector<HTMLDivElement>('[id$="slider-bar"]');
    if (!sliderBar) return;

    // Create tooltip elements
    this.sliderPop = this.player
      .createElement('div', 'slider-pop')
      .addClasses([
        'absolute', 'bottom-full', 'mb-3',
        'flex', 'flex-col', 'items-center',
        'pointer-events-none', 'z-30',
        'opacity-0', 'transition-opacity', 'duration-150',
      ])
      .appendTo(sliderBar)
      .get();

    this.sliderPopImage = this.player
      .createElement('div', 'slider-pop-image')
      .addClasses([
        'rounded', 'overflow-hidden', 'bg-no-repeat',
        'border', 'border-white/30',
      ])
      .appendTo(this.sliderPop)
      .get();

    this.sliderPopText = this.player
      .createElement('span', 'slider-pop-text')
      .addClasses([
        'text-white', 'text-xs', 'mt-1', 'tabular-nums',
        'bg-black/70', 'px-1.5', 'py-0.5', 'rounded',
      ])
      .appendTo(this.sliderPop)
      .get();

    const humanTime = (seconds: number): string => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`;
    };

    sliderBar.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.previewTime.length === 0) return;

      const rect = sliderBar.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      const scrubTime = percent * this.player.duration();

      const preview = this.previewTime.find(
        (p) => scrubTime >= p.start && scrubTime < p.end
      ) ?? this.previewTime.at(-1);

      if (preview) {
        this.sliderPopImage.style.backgroundPosition = `-${preview.x}px -${preview.y}px`;
        this.sliderPopImage.style.width = `${preview.w}px`;
        this.sliderPopImage.style.height = `${preview.h}px`;

        const popWidth = preview.w;
        const minLeft = popWidth / 2;
        const maxLeft = rect.width - popWidth / 2;
        const clampedX = Math.max(minLeft, Math.min(x, maxLeft));
        this.sliderPop.style.left = `${clampedX}px`;
        this.sliderPop.style.transform = 'translateX(-50%)';

        this.sliderPopText.textContent = humanTime(scrubTime);
      }

      this.sliderPop.style.opacity = '1';
    });

    sliderBar.addEventListener('mouseleave', () => {
      this.sliderPop.style.opacity = '0';
    });
  }

  dispose() {
    this.sliderPop?.remove();
    super.dispose();
  }
}

export default StepPlugin;
