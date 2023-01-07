"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../domain/entities/ticket"));
const vehicle_1 = __importDefault(require("../domain/entities/vehicle"));
class RegisterVehicleUseCase {
    constructor(vehicleRepository, ticketRepository) {
        this.vehicleRepository = vehicleRepository;
        this.ticketRepository = ticketRepository;
    }
    async execute({ email, licensePlate, type }) {
        const vehicle = new vehicle_1.default(email, licensePlate, type);
        const addVehicle = await this.vehicleRepository.create(vehicle);
        if (addVehicle) {
            const ticket = new ticket_1.default(addVehicle.id, addVehicle.type, addVehicle.licensePlate);
            await this.vehicleRepository.update(addVehicle.id, { ticket: { id: ticket.id, ticket: ticket.ticket } });
            await this.ticketRepository.create(ticket);
            return ticket;
        }
        return null;
    }
}
exports.default = RegisterVehicleUseCase;
