import Ticket from '../../domain/entities/ticket'
import DatabaseJson from './database-json'

export default class DatabaseVehicle extends DatabaseJson {
  constructor (file: string) {
    super(file)
  }

  async findByTicket (ticket: string): Promise<Ticket> {
    const allData = await this.getFile()
    const item = allData.find((item: { ticket: Ticket }) => item.ticket.ticket === ticket)
    return item
  }
}
