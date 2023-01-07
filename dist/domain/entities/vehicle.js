"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
class Vehicle {
    constructor(email, licensePlate, type) {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
        this.start_date = dayjs_1.default().format('ddd, MMM D, YYYY h:mm A');
        this.end_date = null;
        this.ticket = null;
        this.email = email;
        this.licensePlate = licensePlate;
        this.type = type;
    }
}
exports.default = Vehicle;
