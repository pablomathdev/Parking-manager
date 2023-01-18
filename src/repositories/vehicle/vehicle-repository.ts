
import Vehicle from '../../domain/entities/vehicle'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import DatabaseVehicleInterface from '../../domain/interfaces/database-vehicle'

export default class VehicleRepository implements VehicleRepositoryInterface {
  constructor (private readonly database: DatabaseVehicleInterface) { }
  async findByTicket (ticket: string): Promise<Vehicle> {
    const result = await this.database.findByTicket(ticket)
    return result
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
