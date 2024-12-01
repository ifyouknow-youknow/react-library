"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./App.css");
var _Clickable = require("./COMPONENTS/Clickable");
function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "roboto"
  }, "NOTHING BAGEL"), /*#__PURE__*/React.createElement(_Clickable.Clickable, null, "BAGEL"));
}
var _default = exports.default = App;