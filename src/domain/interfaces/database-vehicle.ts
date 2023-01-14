import Database from './database-interface'

export default interface DatabaseVehicleInterface extends Database {
  findByTicket(ticket: string): Promise<any>
}
