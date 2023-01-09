"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ticket = _interopRequireDefault(require("../domain/entities/ticket"));
var _vehicle = _interopRequireDefault(require("../domain/entities/vehicle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RegisterVehicleUseCase {
  constructor(vehicleRepository, ticketRepository) {
    this.vehicleRepository = vehicleRepository;
    this.ticketRepository = ticketRepository;
  }
  async execute({
    email,
    licensePlate,
    type
  }) {
    const vehicle = new _vehicle.default(email, licensePlate, type);
    const addVehicle = await this.vehicleRepository.create(vehicle);
    if (addVehicle) {
      const ticket = new _ticket.default(addVehicle.id, addVehicle.type, addVehicle.licensePlate);
      await this.vehicleRepository.update(addVehicle.id, {
        ticket: {
          id: ticket.id,
          ticket: ticket.ticket
        }
      });
      await this.ticketRepository.create(ticket);
      return ticket;
    }
    return null;
  }
}
exports.default = RegisterVehicleUseCase;