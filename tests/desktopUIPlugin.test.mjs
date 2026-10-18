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
