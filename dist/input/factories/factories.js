"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_json_1 = __importDefault(require("../../data/db/database-json"));
const ticket_repository_1 = __importDefault(require("../../repositories/ticket/ticket-repository"));
const vehicle_repository_1 = __importDefault(require("../../repositories/vehicle/vehicle-repository"));
const register_vehicle_usecase_1 = __importDefault(require("../../use-cases/register-vehicle-usecase"));
const register_vehicle_controller_1 = __importDefault(require("../controllers/register-vehicle/register-vehicle-controller"));
const validate_fields_1 = __importDefault(require("../validation/validate-fields"));
const registerVehicleUseCaseFactory = () => {
    const vehicleRepository = new vehicle_repository_1.default(new database_json_1.default('vehicle'));
    const ticketRepository = new ticket_repository_1.default(new database_json_1.default('ticket'));
    return new register_vehicle_usecase_1.default(vehicleRepository, ticketRepository);
};
exports.registerVehicleControllerFactory = () => {
    const validateFields = new validate_fields_1.default();
    return new register_vehicle_controller_1.default(validateFields, registerVehicleUseCaseFactory());
};
