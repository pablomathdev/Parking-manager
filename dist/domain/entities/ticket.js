"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _customUuid = require("custom-uuid");
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Ticket {
  constructor(id_vehicle, type, licensePlate) {
    this.id = (0, _uuid.v4)();
    this.id_vehicle = id_vehicle;
    this.type = type;
    this.licensePlate = licensePlate;
    this.ticket = (0, _customUuid.generateCustomUuid)('0123456789', 10);
    this.created_at = (0, _dayjs.default)().format('MM/DD/YYYY');
    this.hour = (0, _dayjs.default)().format('h:mm:ss A');
  }
}
exports.default = Ticket;