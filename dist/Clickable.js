"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clickable = Clickable;
function Clickable(_ref) {
  let {
    onPress,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "pointer fit-width",
    onClick: () => onPress !== undefined ? onPress() : console.log("YOU PRESSED ME!")
  }, children);
}