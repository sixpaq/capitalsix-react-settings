"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SettingsContext = require("./SettingsContext");

Object.keys(_SettingsContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsContext[key];
    }
  });
});