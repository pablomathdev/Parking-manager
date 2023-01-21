import UseCase from '../../input/protocols/use-case'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import DateProvider from '../../providers/date/date-provider'

export default class StopParkingUseCase implements UseCase {
  constructor (private readonly vehicleRepository: VehicleRepositoryInterface) {}
  async execute (input: string): Promise<any> {
    const vehicle = await this.vehicleRepository.findByTicket(input)
    if (!vehicle) {
      return null
    }
    const time = DateProvider.compare(DateProvider.dateNow(), vehicle.start_date)

    if (vehicle) {
      const vehicleUpdated = await this.vehicleRepository.update(
        vehicle.id as string,
        { end_date: DateProvider.dateNow(), time }
      )

      return {
        id: vehicleUpdated.id,
        start_date: vehicleUpdated.start_date,
        end_date: vehicleUpdated.end_date,
        ticket: vehicleUpdated.ticket.ticket,
        time: vehicleUpdated.time
      }
    }
  }
}
