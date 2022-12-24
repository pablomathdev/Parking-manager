import Ticket from '../domain/entities/ticket'
import Database from '../domain/interfaces/database-interface'
import Repository from '../domain/interfaces/repository-interface'

import 'uuid'
jest.mock('uuid', () => ({ v4: () => 'testId' }))
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => 'any_ticket_number' }))
jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'))
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

class DatabaseStub implements Database {
  async update (id: string, updates: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async save (element: any): Promise<any> {
    return new Promise(resolve => resolve(new Ticket('any_id', 'any_type', 'XXXXX')))
  }
}

const systemUnderTest = (): any => {
  const databaseStub = new DatabaseStub()
  const sut = new TicketRepository(databaseStub)
  return { sut, databaseStub }
}

describe('Ticket Repository', () => {
  test('should calls database with correct values', async () => {
    const { sut, databaseStub } = systemUnderTest()
    const saveSpy = jest.spyOn(databaseStub, 'save')

    const ticket = new Ticket('id_vehicle', 'any_type', 'XXXXX')

    await sut.create(ticket)
    expect(saveSpy).toHaveBeenCalledWith(ticket)
  })
})
