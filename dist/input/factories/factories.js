"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerVehicleControllerFactory = void 0;
var _databaseJson = _interopRequireDefault(require("../../data/db/database-json"));
var _ticketRepository = _interopRequireDefault(require("../../repositories/ticket/ticket-repository"));
var _vehicleRepository = _interopRequireDefault(require("../../repositories/vehicle/vehicle-repository"));
var _registerVehicleUsecase = _interopRequireDefault(require("../../use-cases/register-vehicle-usecase"));
var _registerVehicleController = _interopRequireDefault(require("../controllers/register-vehicle/register-vehicle-controller"));
var _validateFields = _interopRequireDefault(require("../validation/validate-fields"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerVehicleUseCaseFactory = () => {
  const vehicleRepository = new _vehicleRepository.default(new _databaseJson.default('vehicle'));
  const ticketRepository = new _ticketRepository.default(new _databaseJson.default('ticket'));
  return new _registerVehicleUsecase.default(vehicleRepository, ticketRepository);
};
const registerVehicleControllerFactory = () => {
  const validateFields = new _validateFields.default();
  return new _registerVehicleController.default(validateFields, registerVehicleUseCaseFactory());
};
exports.registerVehicleControllerFactory = registerVehicleControllerFactory;