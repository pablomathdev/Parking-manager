import Repository from '../domain/interfaces/repository-interface'
import Database from '../domain/interfaces/database-interface'
import Vehicle from '../domain/entities/vehicle'
import VehicleDTO from '../input/dtos/vehicle-DTO'

export default class VehicleRepository implements Repository {
  constructor (private readonly database: Database) { }

  async create ({ name, driver, model, licensePlate, type }: VehicleDTO): Promise<any> {
    const vehicle = new Vehicle(driver, name, model, licensePlate, type)
    const saveVehicle = await this.database.save(vehicle)
    if (saveVehicle) {
      return saveVehicle
    }
    return null
  }
}
