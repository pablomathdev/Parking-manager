import Repository from '../domain/interfaces/repository-interface'
import Database from '../domain/interfaces/database-interface'
import Vehicle from '../domain/entities/vehicle'

export default class VehicleRepository implements Repository {
  constructor (private readonly database: Database) { }
  async update (id: string, updates: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create (vehicle: Vehicle): Promise<any> {
    const saveVehicle = await this.database.save(vehicle)
    if (saveVehicle) {
      return saveVehicle
    }
    return null
  }
}
