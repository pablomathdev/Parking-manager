"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class RegisterVehicleController {
  constructor(validation, registerVehicleUseCase) {
    this.validation = validation;
    this.registerVehicleUseCase = registerVehicleUseCase;
  }
  async handle(clientRequest) {
    try {
      const error = this.validation.validate(clientRequest.request);
      if (error) {
        return {
          status: 400,
          response: error.message
        };
      }
      const ticket = await this.registerVehicleUseCase.execute(clientRequest.request);
      if (!ticket) {
        throw new Error();
      } else {
        return {
          status: 201,
          response: ticket
        };
      }
    } catch {
      return {
        status: 500,
        response: 'Internal Error'
      };
    }
  }
}
exports.default = RegisterVehicleController;