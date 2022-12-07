export default interface Vehicle {
  id?: string
  driver: string
  name: string
  model: string
  licensePlate: string
  type: string
  start_date: string
  end_date: string | null
}
