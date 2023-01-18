import UseCase from '../../input/protocols/use-case'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import DateProvider from '../../providers/date/date-provider'

export default class StopParkingUseCase implements UseCase {
  constructor (private readonly vehicleRepository: VehicleRepositoryInterface) {}
  async execute (input: string): Promise<any> {
    const vehicle = await this.vehicleRepository.findByTicket(input)
    if (vehicle) {
      const vehicleUpdated = await this.vehicleRepository.update(
        vehicle.id as string,
        { end_date: DateProvider.dateNow() }
      )
      return {
        id: vehicleUpdated.id,
        start_date: vehicleUpdated.start_date,
        end_date: vehicleUpdated.end_date,
        ticket: vehicleUpdated.ticket.ticket
      }
    }
    return null
    // const calcTolerance = DateProvider.compare(vehicleUpdated.end_date as string, vehicleUpdated.start_date)
  }
}
