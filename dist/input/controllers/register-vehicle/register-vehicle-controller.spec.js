"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_vehicle_controller_1 = __importDefault(require("./register-vehicle-controller"));
class RegisterVehicleUseCase {
    async execute({ email, licensePlate, type }) {
        const ticket = {
            id: 'id_ticket',
            id_vehicle: 'id_any_vehicle',
            type: 'any_type',
            licensePlate: 'XXXXX',
            created_at: '00/00/0000',
            hour: 'now',
            ticket: '0123456789'
        };
        return new Promise(resolve => resolve(ticket));
    }
}
class ValidationStub {
    validate(input) {
        return null;
    }
}
const systemUnderTestFactory = () => {
    const registerVehicleUseCaseStub = new RegisterVehicleUseCase();
    const validationStub = new ValidationStub();
    const sut = new register_vehicle_controller_1.default(validationStub, registerVehicleUseCaseStub);
    return { sut, validationStub, registerVehicleUseCaseStub };
};
const fakeVehicle = {
    email: 'any_email@email.com',
    licensePlate: 'XXXXX',
    type: 'any_type'
};
describe('register vehicle controller', () => {
    test('should call validation with correct values', async () => {
        const { sut, validationStub } = systemUnderTestFactory();
        const validateSpy = jest.spyOn(validationStub, 'validate');
        const clientRequest = {
            request: fakeVehicle
        };
        await sut.handle(clientRequest);
        expect(validateSpy).toHaveBeenCalledWith(fakeVehicle);
    });
    test('should returns error if validation returns a error of validation', async () => {
        const { sut, validationStub } = systemUnderTestFactory();
        jest.spyOn(validationStub, 'validate')
            .mockReturnValueOnce(new Error('fill in all fields !'));
        const clientRequest = {
            request: fakeVehicle
        };
        const response = await sut.handle(clientRequest);
        expect(response.status).toBe(400);
        expect(response.response).toEqual('fill in all fields !');
    });
    test('should call vehicle usecase with correct values', async () => {
        const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory();
        const executeSpy = jest.spyOn(registerVehicleUseCaseStub, 'execute');
        const clientRequest = {
            request: fakeVehicle
        };
        await sut.handle(clientRequest);
        expect(executeSpy).toHaveBeenCalledWith(fakeVehicle);
    });
    test('should returns ticket if vehicle usecase returns a ticket', async () => {
        const { sut } = systemUnderTestFactory();
        const clientRequest = {
            request: fakeVehicle
        };
        const response = await sut.handle(clientRequest);
        expect(response.status).toBe(201);
        expect(response.response).toEqual({
            id: 'id_ticket',
            id_vehicle: 'id_any_vehicle',
            type: 'any_type',
            licensePlate: 'XXXXX',
            ticket: '0123456789',
            created_at: '00/00/0000',
            hour: 'now'
        });
    });
    test('should throw if vehicle use case return falsy', async () => {
        const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory();
        jest.spyOn(registerVehicleUseCaseStub, 'execute').mockResolvedValueOnce(null);
        const clientRequest = {
            request: fakeVehicle
        };
        const response = await sut.handle(clientRequest);
        expect(response.status).toBe(500);
        expect(response.response).toEqual('Internal Error');
    });
});
