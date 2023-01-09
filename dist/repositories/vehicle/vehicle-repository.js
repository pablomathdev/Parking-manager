"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class VehicleRepository {
  constructor(database) {
    this.database = database;
  }
  async update(id, updates) {
    return await this.database.update(id, updates);
  }
  async create(vehicle) {
    const saveVehicle = await this.database.save(vehicle);
    if (saveVehicle) {
      return saveVehicle;
    }
    return null;
  }
}
exports.default = VehicleRepository;