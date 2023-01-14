/* eslint-disable @typescript-eslint/no-useless-constructor */
import DatabaseJson from './database-json'

export default class DatabaseVehicle extends DatabaseJson {
  constructor (file: string) {
    super(file)
  }

  async findByTicket (ticket: string): Promise<any> {
    const allData = await this.getFile()
    const item = allData.find((item: { ticket: any }) => item.ticket.ticket === ticket)
    return item
  }
}
