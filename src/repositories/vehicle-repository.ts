import Repository from '../domain/interfaces/repository-interface'
import Database from '../domain/interfaces/database-interface'
import Vehicle from '../domain/entities/vehicle'

export default class VehicleRepository implements Repository {
  constructor (private readonly database: Database) { }

  async create (element: Vehicle): Promise<any> {
    const { driver, name, model, licensePlate, type } = element
    const vehicle = new Vehicle(driver, name, model, licensePlate, type)
    const saveVehicle = await this.database.save(vehicle)
    if (saveVehicle) {
      return saveVehicle
    }
    return null
  }
}
