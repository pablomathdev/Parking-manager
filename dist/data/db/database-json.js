"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DatabaseJson {
  constructor(file) {
    this.file = file;
  }
  async getFile() {
    const filename = _path.default.join(__dirname + '/collections/' + `${this.file}.json`);
    const data = await _promises.default.readFile(filename, {
      encoding: 'utf-8'
    });
    return JSON.parse(data.toString());
  }
  async writeFile(data) {
    const filename = _path.default.join(__dirname + '/collections/' + `${this.file}.json`);
    await _promises.default.writeFile(filename, JSON.stringify(data));
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
    const item = allData.find(item => item.id === id);
    return item;
  }
  async update(id, updates) {
    const allData = await this.getFile();
    const updateDates = allData.map(item => item.id === id ? {
      ...item,
      ...updates
    } : new Error('item does not exists !'));
    const index = allData.findIndex(item => item.id === id);
    allData.splice(index, 1);
    await this.writeFile([...allData, ...updateDates].filter(el => Object.keys(el).length));
    return await this.findById(id);
  }
  async clear() {
    const filename = _path.default.join(__dirname + '/collections/' + `${this.file}.json`);
    await _promises.default.writeFile(filename, JSON.stringify([]));
  }
}
exports.default = DatabaseJson;