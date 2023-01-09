"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _start = require("../routes/start.route");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_start.startRoute);
var _default = app;
exports.default = _default;