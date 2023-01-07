"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const custom_uuid_1 = require("custom-uuid");
const uuid_1 = require("uuid");
class Ticket {
    constructor(id_vehicle, type, licensePlate) {
        this.id = uuid_1.v4();
        this.id_vehicle = id_vehicle;
        this.type = type;
        this.licensePlate = licensePlate;
        this.ticket = custom_uuid_1.generateCustomUuid('0123456789', 10);
        this.created_at = dayjs_1.default().format('MM/DD/YYYY');
        this.hour = dayjs_1.default().format('h:mm:ss A');
    }
}
exports.default = Ticket;
