"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_1 = __importDefault(require("../../domain/entities/vehicle"));
const vehicle_repository_1 = __importDefault(require("./vehicle-repository"));
require("uuid");
jest.mock('uuid', () => ({ v4: () => 'testId' }));
class DatabaseStub {
    async update(id, updates) {
        const item = {
            id,
            driver: 'any_driver',
            name: 'any_name',
            model: 'any_model',
            licensePlate: 'XXXXX',
            type: 'any_type',
            created_at: 'now'
        };
        const itemUpdated = Object.assign(Object.assign({}, item), updates);
        return new Promise(resolve => resolve(itemUpdated));
    }
    async save(element) {
        return new Promise(resolve => resolve(new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type')));
    }
}
const systemUnderTest = () => {
    const databaseStub = new DatabaseStub();
    const sut = new vehicle_repository_1.default(databaseStub);
    return { sut, databaseStub };
};
describe('Vehicle repository', () => {
    test('should calls database with correct values', async () => {
        const { sut, databaseStub } = systemUnderTest();
        const saveSpy = jest.spyOn(databaseStub, 'save');
        const fakeVehicle = new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type');
        await sut.create(fakeVehicle);
        expect(saveSpy).toHaveBeenCalledWith(fakeVehicle);
    });
    test('should returns vehicle if the database successfully saves the vehicle', async () => {
        const { sut } = systemUnderTest();
        const fakeVehicle = new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type');
        const result = await sut.create(fakeVehicle);
        expect(result).toEqual(fakeVehicle);
    });
    test('should calls database with correct values', async () => {
        const { sut, databaseStub } = systemUnderTest();
        const saveSpy = jest.spyOn(databaseStub, 'update');
        const fakeVehicle = new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type');
        const result = await sut.create(fakeVehicle);
        await sut.update(result.id, { name: 'pablo' });
        expect(saveSpy).toHaveBeenCalledWith(result.id, { name: 'pablo' });
    });
    test('should update item by id', async () => {
        const { sut } = systemUnderTest();
        const fakeVehicle = new vehicle_1.default('any_email@email.com', 'XXXXX', 'any_type');
        const item = await sut.create(fakeVehicle);
        const result = await sut.update(item.id, { name: 'pablo' });
        expect(result.id).toBe(item.id);
        expect(result.name).toBe('pablo');
    });
});
