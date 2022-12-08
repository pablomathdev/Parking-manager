import { v4 as uuidv4 } from 'uuid'
export default class Vehicle {
  id?: string
  driver: string
  name: string
  model: string
  licensePlate: string
  type: string
  start_date: string
  end_date: string | null
  constructor (
    driver: string,
    name: string,
    model: string,
    licensePlate: string,
    type: string
  ) {
    if (!this.id) {
      this.id = uuidv4()
    }

    this.start_date = 'now'
    this.end_date = null
    this.driver = driver
    this.name = name
    this.model = model
    this.licensePlate = licensePlate
    this.type = type
  }
}
