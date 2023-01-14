/* eslint-disable @typescript-eslint/no-useless-constructor */
import DatabaseJson from './database-json'
import fs from 'fs/promises'
import path from 'path'

const item = {
  id: 'any_id',
  start_date: 'any_date',
  end_date: null,
  ticket: {
    id: 'any_id_ticket',
    ticket: '0123456789'
  },
  email: 'testemail@email.com',
  licensePlate: 'XXXXX',
  type: 'any-type'
}

class DatabaseVehicle extends DatabaseJson {
  constructor (file: string) {
    super(file)
  }

  async findByTicket (ticket: string): Promise<any> {
    const allData = await this.getFile()
    const item = allData.find((item: { ticket: any }) => item.ticket.ticket === ticket)
    return item
  }
}

describe('DatabaseVehicle - findByTicket', () => {
  beforeAll(async () => {
    await fs.writeFile(
      path.join(__dirname + '/collections/' + 'testvehicle.json'),
      JSON.stringify([]))
  })
  afterAll(async () => {
    await fs.unlink(
      path.join(__dirname + '/collections/' + 'testvehicle.json'))
  })
  test('should returns vehicle for ticket', async () => {
    const sut = new DatabaseVehicle('testvehicle')
    await sut.save(item)

    const result = await sut.findByTicket('0123456789')
    expect(result).toEqual(item)
  })
})
