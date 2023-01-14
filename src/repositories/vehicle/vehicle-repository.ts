import Database from '../../domain/interfaces/database-interface'
import Vehicle from '../../domain/entities/vehicle'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'

export default class VehicleRepository implements VehicleRepositoryInterface {
  constructor (private readonly database: Database) { }
  async findByTicket (ticket: string): Promise<Vehicle> {
    throw new Error('Method not implemented.')
  }

  async update (id: string, updates: any): Promise<any> {
    return await this.database.update(id, updates)
  }

  async create (vehicle: Vehicle): Promise<any> {
    const saveVehicle = await this.database.save(vehicle)
    if (saveVehicle) {
      return saveVehicle
    }
    return null
  }
}
