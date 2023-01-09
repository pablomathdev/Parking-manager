"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Vehicle {
  constructor(email, licensePlate, type) {
    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
    this.start_date = (0, _dayjs.default)().format('ddd, MMM D, YYYY h:mm A');
    this.end_date = null;
    this.ticket = null;
    this.email = email;
    this.licensePlate = licensePlate;
    this.type = type;
  }
}
exports.default = Vehicle;