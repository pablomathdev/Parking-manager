import Ticket from '../domain/entities/ticket'
import Database from '../domain/interfaces/database-interface'
import TicketRepository from './ticket-repository'

import 'uuid'
jest.mock('uuid', () => ({ v4: () => 'testId' }))
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => 'any_ticket_number' }))
jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'))

class DatabaseStub implements Database {
  async update (id: string, updates: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async save (element: any): Promise<any> {
    return new Promise(resolve => resolve(new Ticket('id_vehicle', 'any_type', 'XXXXX')))
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
  test('should returns ticket if the database successfully saves the ticket', async () => {
    const { sut } = systemUnderTest()

    const ticket = new Ticket('id_vehicle', 'any_type', 'XXXXX')

    const result = await sut.create(ticket)
    expect(result).toEqual(ticket)
  })
})
