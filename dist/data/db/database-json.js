"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class DatabaseJson {
    constructor(file) {
        this.file = file;
    }
    async getFile() {
        const filename = path_1.default.join(__dirname + '/collections/' + `${this.file}.json`);
        const data = await promises_1.default.readFile(filename, { encoding: 'utf-8' });
        return JSON.parse(data.toString());
    }
    async writeFile(data) {
        const filename = path_1.default.join(__dirname + '/collections/' + `${this.file}.json`);
        await promises_1.default.writeFile(filename, JSON.stringify(data));
    }
    async save(element) {
        const allData = await this.getFile();
        const itemAlreadyExists = await this.findById(element.id);
        if (itemAlreadyExists) {
            return new Error('item already exists !');
        }
        if (!itemAlreadyExists) {
            await this.writeFile([...allData, element]);
            return element;
        }
    }
    async findById(id) {
        const allData = await this.getFile();
        const item = allData.find((item) => item.id === id);
        return item;
    }
    async update(id, updates) {
        const allData = await this.getFile();
        const updateDates = allData.map((item) => item.id === id ? Object.assign(Object.assign({}, item), updates) : new Error('item does not exists !'));
        const index = allData.findIndex((item) => item.id === id);
        allData.splice(index, 1);
        await this.writeFile([...allData, ...updateDates].filter(el => Object.keys(el).length));
        return await this.findById(id);
    }
    async clear() {
        const filename = path_1.default.join(__dirname + '/collections/' + `${this.file}.json`);
        await promises_1.default.writeFile(filename, JSON.stringify([]));
    }
}
exports.default = DatabaseJson;
