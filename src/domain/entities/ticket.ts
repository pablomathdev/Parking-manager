import dayjs from 'dayjs'
import { v4 as uuidV4 } from 'uuid'
export default class Ticket {
  id: string
  id_vehicle: string
  type: string
  licensePlate: string
  created_at: string

  constructor (id_vehicle: string, type: string, licensePlate: string) {
    this.id = uuidV4()
    this.id_vehicle = id_vehicle
    this.type = type
    this.licensePlate = licensePlate
    this.created_at = dayjs().format('ddd, MMM D, YYYY h:mm A')
  }
}
