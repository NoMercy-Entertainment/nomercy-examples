import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { transformWithEsbuild } from 'vite';

function element() {
  const listeners = new Map();
  return {
    style: {},
    addEventListener(name, listener) { listeners.set(name, listener); },
    dispatch(name, event) { listeners.get(name)?.(event); },
    getBoundingClientRect() { return { left: 0, width: 100 }; },
  };
}

for (const step of [3, 4, 5, 6, 7]) {
  test(`tutorial step ${step} seeks on touch release and resumes progress updates`, async () => {
    const source = readFileSync(new URL(`../src/components/TutorialPlayer/steps/step${step}Plugin.ts`, import.meta.url), 'utf8');
    const classSource = source.slice(source.indexOf('export class StepPlugin'), source.indexOf('export default StepPlugin'));
    const { code } = await transformWithEsbuild(classSource.replace('export class', 'class'), `step${step}Plugin.ts`, { loader: 'ts' });
    const StepPlugin = runInNewContext(`${code}\nStepPlugin`, { Plugin: class {} });
    const plugin = new StepPlugin();
    const elements = new Map();
    const listeners = new Map();
    const seeks = [];
    plugin.player = {
      createElement(_tag, id) {
        const node = element();
        elements.set(id, node);
        const builder = {
          addClasses() { return builder; },
          appendTo() { return builder; },
          get() { return node; },
        };
        return builder;
      },
      on(name, handler) { listeners.set(name, handler); },
      duration() { return 200; },
      seek(time) { seeks.push(time); },
    };
    plugin.bottomBar = element();
    plugin.currentTimeLabel = element();
    plugin.durationLabel = element();
    plugin.createProgressBar();

    const slider = elements.get('slider-bar');
    slider.dispatch('touchstart', { touches: [{ clientX: 20 }] });
    slider.dispatch('touchmove', { touches: [{ clientX: 75 }] });
    slider.dispatch('touchend', { touches: [], changedTouches: [{ clientX: 75 }] });
    listeners.get('time')({ percentage: 80, currentTimeHuman: '2:40', durationHuman: '3:20' });

    assert.deepEqual(seeks, [150]);
    assert.equal(elements.get('slider-progress').style.width, '80%');
  });
}
