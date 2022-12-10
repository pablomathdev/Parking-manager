import Ticket from '../domain/entities/ticket'
import Database from '../domain/interfaces/database-interface'
import Repository from '../domain/interfaces/repository-interface'

export default class TicketRepository implements Repository {
  constructor (private readonly database: Database) { }
  async create (ticket: Ticket): Promise<any> {
    const saveticket = await this.database.save(ticket)
    if (saveticket) {
      return saveticket
    }
    return null
  }
}
