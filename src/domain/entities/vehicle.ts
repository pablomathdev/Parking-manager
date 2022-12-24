import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export default class Vehicle {
  id?: string
  email: string
  licensePlate: string
  type: string
  start_date: string
  end_date: string | null
  ticket?: object | null

  constructor (
    email: string,
    licensePlate: string,
    type: string
  ) {
    if (!this.id) {
      this.id = uuidv4()
    }

    this.start_date = dayjs().format('ddd, MMM D, YYYY h:mm A')
    this.end_date = null
    this.ticket = null
    this.email = email
    this.licensePlate = licensePlate
    this.type = type
  }
}
