"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../../domain/entities/ticket"));
const ticket_repository_1 = __importDefault(require("./ticket-repository"));
require("uuid");
jest.mock('uuid', () => ({ v4: () => 'testId' }));
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => 'any_ticket_number' }));
jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));
class DatabaseStub {
    async update(id, updates) {
        throw new Error('Method not implemented.');
    }
    async save(element) {
        return new Promise(resolve => resolve(new ticket_1.default('id_vehicle', 'any_type', 'XXXXX')));
    }
}
const systemUnderTest = () => {
    const databaseStub = new DatabaseStub();
    const sut = new ticket_repository_1.default(databaseStub);
    return { sut, databaseStub };
};
describe('Ticket Repository', () => {
    test('should calls database with correct values', async () => {
        const { sut, databaseStub } = systemUnderTest();
        const saveSpy = jest.spyOn(databaseStub, 'save');
        const ticket = new ticket_1.default('id_vehicle', 'any_type', 'XXXXX');
        await sut.create(ticket);
        expect(saveSpy).toHaveBeenCalledWith(ticket);
    });
    test('should returns ticket if the database successfully saves the ticket', async () => {
        const { sut } = systemUnderTest();
        const ticket = new ticket_1.default('id_vehicle', 'any_type', 'XXXXX');
        const result = await sut.create(ticket);
        expect(result).toEqual(ticket);
    });
});
