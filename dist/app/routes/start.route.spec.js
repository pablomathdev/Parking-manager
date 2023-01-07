"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_json_1 = __importDefault(require("../../data/db/database-json"));
const app_1 = __importDefault(require("../config/app"));
describe('start parking', () => {
    afterEach(async () => {
        await new database_json_1.default('vehicle').clear();
        await new database_json_1.default('ticket').clear();
    });
    test('should returns 201 if vehicle added', async () => {
        await supertest_1.default(app_1.default).post('/start').send({
            email: 'anyemail@gmail.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        }).expect(201);
    });
    test('should returns 400 if email is invalid', async () => {
        await supertest_1.default(app_1.default).post('/start').send({
            email: 'anyemailgmail.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        }).expect(400);
    });
    test('should returns 400 if any field no is provided', async () => {
        await supertest_1.default(app_1.default).post('/start').send({
            email: 'anyemail@gmail.com',
            type: 'any_type'
        }).expect(400);
    });
});
