"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Clickable", {
  enumerable: true,
  get: function () {
    return _Clickable.default;
  }
});
Object.defineProperty(exports, "Spacer", {
  enumerable: true,
  get: function () {
    return _Spacer.default;
  }
});
var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _App = _interopRequireDefault(require("./App"));
var _Clickable = _interopRequireDefault(require("./COMPONENTS/Clickable"));
var _Spacer = _interopRequireDefault(require("./COMPONENTS/Spacer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/index.js

const root = _client.default.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_App.default, null)));