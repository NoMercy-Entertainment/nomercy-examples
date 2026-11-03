import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { transformWithEsbuild } from 'vite';

const source = readFileSync(new URL('../src/components/VideoPlayer/plugins/UIPlugin/baseUIPlugin.ts', import.meta.url), 'utf8');
const classSource = source.slice(source.indexOf('export class BaseUIPlugin'));
const { code } = await transformWithEsbuild(classSource.replace('export class', 'class'), 'baseUIPlugin.ts', { loader: 'ts' });

function node() {
  const listeners = new Map();
  return {
    style: {},
    appendChild() {},
    addEventListener(name, listener) { listeners.set(name, listener); },
    dispatch(name, event) { listeners.get(name)?.(event); },
    focus() { this.focused = true; },
  };
}

function plugin(globals = {}) {
  const BaseUIPlugin = runInNewContext(`${code}\nBaseUIPlugin`, { Plugin: class {}, setTimeout() {}, ...globals });
  return new BaseUIPlugin();
}

test('ArrowRight on a language button focuses the subtitle button', () => {
  const instance = plugin();
  const language = node();
  const subtitle = node();
  instance.getClosestElement = (_button, selector) => selector.includes('subtitle') ? subtitle : null;
  instance.player = { options: { disableTouchControls: false } };
  instance.addKeyEventsToLanguageButton(language, node());

  language.dispatch('keydown', { key: 'ArrowRight' });
  assert.equal(subtitle.focused, true);
});

test('Escape on a control button closes the menu', () => {
  const instance = plugin();
  const control = node();
  control.blur = () => { control.blurred = true; };
  const emitted = [];
  instance.player = {
    createElement() {
      const builder = {
        addClasses() { return builder; },
        appendTo() { return builder; },
        get() { return control; },
      };
      return builder;
    },
    emit(name, value) { emitted.push([name, value]); },
  };
  instance.buttons = { play: { title: 'Play' } };
  instance.createUiButton(node(), 'play');

  control.dispatch('keydown', { key: 'Escape' });
  assert.equal(control.blurred, true);
  assert.deepEqual(emitted, [['show-menu', false]]);
});

test('opening a playlist centers the current episode', () => {
  const current = { scrollIntoView(options) { this.scrollOptions = options; } };
  const document = {
    querySelector() { return null; },
    getElementById(id) { return id === 'playlist-episode-25' ? current : null; },
  };
  const instance = plugin({ document, setTimeout(callback) { callback(); } });
  const button = node();
  instance.createUiButton = () => button;
  instance.createSVGElement = () => {};
  instance.buttons = { playlist: {} };
  instance.menuFrame = { showModal() {} };
  instance.player = {
    addClasses() {},
    emit() {},
    on() {},
    playlistItem() { return { id: 'episode-25' }; },
    hasPlaylists() { return true; },
  };
  instance.createPlaylistsButton(node());

  button.dispatch('click', { stopPropagation() {} });
  assert.equal(current.scrollOptions?.block, 'center');
});
