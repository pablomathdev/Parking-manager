"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_vehicle_usecase_1 = __importDefault(require("./register-vehicle-usecase"));
const ticket_1 = __importDefault(require("../domain/entities/ticket"));
const vehicle_1 = __importDefault(require("../domain/entities/vehicle"));
require("uuid");
require("custom-uuid");
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => '0123456789' }));
jest.mock('uuid', () => ({ v4: () => 'testId' }));
jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-12-08'));
class VehicleRepositoryStub {
    async update(id, updates) {
        return null;
    }
    async create(element) {
        return element;
    }
}
class TicketRepositoryStub {
    async create(element) {
        return element;
    }
}
const systemUnderTest = () => {
    const ticketRepositoryStub = new TicketRepositoryStub();
    const vehicleRepositoryStub = new VehicleRepositoryStub();
    const sut = new register_vehicle_usecase_1.default(vehicleRepositoryStub, ticketRepositoryStub);
    return { sut, vehicleRepositoryStub, ticketRepositoryStub };
};
describe('Register Vehicle Use Case', () => {
    test('should calls vehicle repository with correct values', async () => {
        const { sut, vehicleRepositoryStub } = systemUnderTest();
        const createSpy = jest.spyOn(vehicleRepositoryStub, 'create');
        const vehicle = {
            email: 'any_email@email.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        await sut.execute(vehicle);
        expect(createSpy).toHaveBeenCalledWith(new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type'));
    });
    test('should calls ticket repository with correct values', async () => {
        const { sut, ticketRepositoryStub } = systemUnderTest();
        const createSpy = jest.spyOn(ticketRepositoryStub, 'create');
        const vehicle = {
            email: 'any_email@email.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        await sut.execute(vehicle);
        expect(createSpy)
            .toHaveBeenCalledWith(new ticket_1.default('testId', 'any_type', 'XXXXX'));
    });
    test('should calls vehicle repository(update) with correct values', async () => {
        const { sut, vehicleRepositoryStub } = systemUnderTest();
        const createSpy = jest.spyOn(vehicleRepositoryStub, 'update');
        const vehicle = {
            email: 'any_email@email.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        const vehicleObj = new vehicle_1.default(vehicle.email, vehicle.licensePlate, vehicle.type);
        await sut.execute(vehicle);
        expect(createSpy).toHaveBeenCalledWith(vehicleObj.id, { ticket: { id: 'testId', ticket: '0123456789' } });
    });
    test('should returns a ticket if created vehicle successfully', async () => {
        const { sut } = systemUnderTest();
        const vehicle = {
            email: 'any_email@email.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        const result = await sut.execute(vehicle);
        expect(result).toEqual({
            created_at: '12/07/2022',
            hour: '8:00:00 PM',
            id: 'testId',
            id_vehicle: 'testId',
            licensePlate: 'XXXXX',
            type: 'any_type',
            ticket: '0123456789'
        });
    });
});
