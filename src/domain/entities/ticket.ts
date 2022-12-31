import dayjs from 'dayjs'
import { generateCustomUuid } from 'custom-uuid'
import { v4 as uuidV4 } from 'uuid'
export default class Ticket {
  id: string
  id_vehicle: string
  type: string
  licensePlate: string
  ticket: string
  created_at: string
  hour: string
  constructor (id_vehicle: string, type: string, licensePlate: string) {
    this.id = uuidV4()
    this.id_vehicle = id_vehicle

    this.type = type
    this.licensePlate = licensePlate
    this.ticket = generateCustomUuid('0123456789', 10)
    this.created_at = dayjs().format('MM/DD/YYYY')
    this.hour = dayjs().format('h:mm:ss A')
  }
}
