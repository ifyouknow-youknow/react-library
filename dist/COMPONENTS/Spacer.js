"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spacer = Spacer;
function Spacer(_ref) {
  let {
    height
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: height !== undefined ? `${height}px` : '10px'
    }
  });
}