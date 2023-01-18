import Repository from './repository-interface'
import Vehicle from '../entities/vehicle'

export default interface VehicleRepositoryInterface extends Repository {
  update(id: string, updates: any): Promise<any>
  findByTicket(ticket: string): Promise<Vehicle>
}
