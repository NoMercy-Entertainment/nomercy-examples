import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { transformWithEsbuild } from "vite";

const source = readFileSync(
  new URL(
    "../src/components/VideoPlayer/plugins/UIPlugin/desktopUIPlugin.ts",
    import.meta.url,
  ),
  "utf8",
);
const classSource = source.slice(
  source.indexOf("export class DesktopUIPlugin"),
);
const { code: javascript } = await transformWithEsbuild(
  classSource.replace("export class", "class"),
  "desktopUIPlugin.ts",
  { loader: "ts" },
);

function element(parentElement = null) {
  const classes = new Set();
  return {
    parentElement,
    children: [],
    firstChild: { focus() {} },
    style: {},
    classList: {
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
    },
    addEventListener() {},
    setAttribute() {},
    showModal() {},
    close() {},
  };
}

function pluginWithTouchControlsDisabled() {
  const listeners = new Map();
  const DesktopUIPlugin = runInNewContext(`${javascript}\nDesktopUIPlugin`, {
    BaseUIPlugin: class {},
    document: { body: { parentElement: element() } },
    setTimeout() {},
  });
  const plugin = new DesktopUIPlugin();
  plugin.player = {
    options: { disableTouchControls: true },
    on(name, listener) {
      const group = listeners.get(name) ?? [];
      group.push(listener);
      listeners.set(name, group);
    },
    emit(name, value) {
      for (const listener of listeners.get(name) ?? []) listener(value);
    },
    createElement() {
      const node = element();
      const builder = {
        addClasses() {
          return builder;
        },
        appendTo(parent) {
          node.parentElement = parent;
          parent.children.push(node);
          return builder;
        },
        get() {
          return node;
        },
      };
      return builder;
    },
  };
  plugin.sizeMenuFrame = () => {};
  plugin.mainMenu = element();
  plugin.createMenuHeader = () => {};
  plugin.createSubtitleSettingMenuHeader = () => {};
  plugin.createSubtitleSettingMenuButton = () => {};
  plugin.subtitleSettingActions = [];
  return plugin;
}

test("menus work when touch controls are disabled", () => {
  const plugin = pluginWithTouchControlsDisabled();
  assert.equal(plugin.center.classList, undefined);
  plugin.createMenuFrame(element());
  plugin.createSubtitleSettingsMenu(element());
  plugin.createSubtitleSettingMenu(element(element(element())), {
    label: "Font",
    property: "fontFamily",
    buttonType: "subtitleSetting",
  });

  let closes = 0;
  plugin.menuFrame.close = () => {
    closes += 1;
  };
  plugin.player.emit("show-menu", true);
  assert.doesNotThrow(() => plugin.player.emit("show-menu", false));
  assert.equal(closes, 1);
  assert.doesNotThrow(() => plugin.player.emit("show-main-menu", true));
  assert.doesNotThrow(() =>
    plugin.player.emit("show-subtitleSettings-menu", true),
  );
  assert.doesNotThrow(() =>
    plugin.player.emit("show-subtitleSetting-menu", "fontFamily"),
  );
});

test("dispose removes global listeners installed by the desktop UI", () => {
  function target() {
    const listeners = new Map();
    return {
      addEventListener(name, listener) {
        const group = listeners.get(name) ?? new Set();
        group.add(listener);
        listeners.set(name, group);
      },
      removeEventListener(name, listener) {
        listeners.get(name)?.delete(listener);
      },
      dispatch(name, event = {}) {
        for (const listener of listeners.get(name) ?? []) listener(event);
      },
      listenerCount(name) {
        return listeners.get(name)?.size ?? 0;
      },
    };
  }

  function node() {
    return Object.assign(target(), {
      style: {},
      children: [],
      firstChild: { style: {} },
      classList: { add() {}, remove() {} },
      append(...children) { this.children.push(...children); },
      appendChild(child) { this.children.push(child); },
      remove() {},
      setAttribute() {},
    });
  }

  const html = node();
  const document = Object.assign(target(), {
    body: { parentElement: html },
    hidden: true,
    pictureInPictureEnabled: true,
    createElement: node,
  });
  const window = target();
  const DesktopUIPlugin = runInNewContext(`${javascript}\nDesktopUIPlugin`, {
    BaseUIPlugin: class {}, document, window, textSizes: [], setTimeout() {},
  });
  const plugin = new DesktopUIPlugin();
  const emitted = [];
  let pipRequests = 0;
  let resizes = 0;
  plugin.player = {
    on() {},
    emit(name) { emitted.push(name); },
    localize(value) { return value; },
    container: { getBoundingClientRect: () => ({ width: 100 }) },
    overlay: node(),
    isMobile: () => false,
    hasListeners: () => true,
    hasPIP: () => true,
    videoElement: {
      requestPictureInPicture() {
        pipRequests += 1;
        return Promise.resolve();
      },
    },
    createElement() {
      const result = node();
      const builder = {
        addClasses() { return builder; },
        appendTo() { return builder; },
        get() { return result; },
      };
      return builder;
    },
  };
  plugin.buttons = { pipEnter: {}, pipExit: {} };
  plugin.createUiButton = () => node();
  plugin.createSVGElement = () => {};
  plugin.sizeMenuFrame = () => { resizes += 1; };

  plugin.eventHandlers();
  plugin.createPIPButton(node());
  plugin.createMenuFrame(node());
  plugin.pipEnabled = true;

  window.dispatch("resize");
  document.dispatch("keyup", { key: "?" });
  document.dispatch("visibilitychange");
  html.dispatch("click");
  assert.equal(plugin.helpOverlay.style.display, "flex");
  assert.equal(pipRequests, 1);
  assert.equal(emitted.length, 9);
  assert.ok(resizes > 1);

  for (const name of ["topBar", "bottomBar", "bottomRow", "frame", "center", "tooltip", "episodeTip", "loader"]) {
    plugin[name] = node();
  }
  plugin.dispose();
  assert.equal(window.listenerCount("resize"), 0);
  assert.equal(document.listenerCount("keyup"), 0);
  assert.equal(document.listenerCount("visibilitychange"), 0);
  assert.equal(html.listenerCount("click"), 0);

  const previousResizes = resizes;
  window.dispatch("resize");
  document.dispatch("keyup", { key: "?" });
  document.dispatch("visibilitychange");
  html.dispatch("click");
  assert.equal(resizes, previousResizes);
  assert.equal(plugin.helpOverlay.style.display, "flex");
  assert.equal(pipRequests, 1);
  assert.equal(emitted.length, 9);
});
