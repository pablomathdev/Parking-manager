import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export default class Vehicle {
  private readonly id?: string
  private readonly start_date: string
  end_date: string | null
  constructor (
    private readonly driver: string,
    private readonly name: string,
    private readonly model: string,
    private readonly licensePlate: string,
    private readonly type: string
  ) {
    if (!this.id) {
      this.id = uuidv4()
    }

    this.start_date = dayjs().format('ddd, MMM D, YYYY h:mm A')
    this.end_date = null
    this.driver = driver
    this.name = name
    this.model = model
    this.licensePlate = licensePlate
    this.type = type
  }
}
