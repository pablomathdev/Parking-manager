"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_json_1 = __importDefault(require("./database-json"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
jest.mock('uuid', () => ({ v4: () => 'testId' }));
const item = {
    id: uuid_1.v4(),
    name: 'any_name',
    email: 'any_email',
    created_at: dayjs_1.default().format('ddd, MMM D, YYYY h:mm A')
};
describe('DatabaseJson', () => {
    beforeAll(async () => {
        await promises_1.default.writeFile(path_1.default.join(__dirname + '/collections/' + 'test.json'), JSON.stringify([]));
    });
    afterAll(async () => {
        await promises_1.default.unlink(path_1.default.join(__dirname + '/collections/' + 'test.json'));
    });
    afterEach(async () => {
        await new database_json_1.default('test').clear();
    });
    test('should save item in json', async () => {
        const sut = new database_json_1.default('test');
        const result = await sut.save(item);
        expect(result).toEqual(item);
    });
    test('should not save if item already exists', async () => {
        const sut = new database_json_1.default('test');
        await sut.save(item);
        const result = await sut.save(item);
        expect(result).toEqual(new Error('item already exists !'));
    });
    test('should update item by id', async () => {
        const sut = new database_json_1.default('test');
        await sut.save(item);
        const result = await sut.update(item.id, { name: 'pablo' });
        expect(result).toEqual({
            id: uuid_1.v4(),
            name: 'pablo',
            email: 'any_email',
            created_at: dayjs_1.default().format('ddd, MMM D, YYYY h:mm A')
        });
    });
});
