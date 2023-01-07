"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factories_1 = require("../../input/factories/factories");
const express_route_adapter_1 = __importDefault(require("../express-route-adapter"));
let startRoute = express_1.Router();
exports.startRoute = startRoute;
startRoute.post('/start', express_route_adapter_1.default.execute(factories_1.registerVehicleControllerFactory()));
