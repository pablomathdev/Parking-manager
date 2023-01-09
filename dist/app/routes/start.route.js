"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRoute = void 0;
var _express = require("express");
var _factories = require("../../input/factories/factories");
var _expressRouteAdapter = _interopRequireDefault(require("../express-route-adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let startRoute = (0, _express.Router)();
exports.startRoute = startRoute;
startRoute.post('/start', _expressRouteAdapter.default.execute((0, _factories.registerVehicleControllerFactory)()));