import UseCase from '../../input/protocols/use-case'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import VehicleDTO from '../../input/dtos/vehicle-DTO'
import Repository from '../../domain/interfaces/repository-interface'
import Ticket from '../../domain/entities/ticket'
import Vehicle from '../../domain/entities/vehicle'

export default class RegisterVehicleUseCase implements UseCase {
  constructor (private readonly vehicleRepository: VehicleRepositoryInterface,
    private readonly ticketRepository: Repository) {}

  async execute ({ email, licensePlate, type }: VehicleDTO): Promise<Ticket | null> {
    const vehicle = new Vehicle(email, licensePlate, type)

    const addVehicle = await this.vehicleRepository.create(vehicle)
    if (addVehicle) {
      const ticket = new Ticket(addVehicle.id, addVehicle.type, addVehicle.licensePlate)
      await this.vehicleRepository.update(addVehicle.id, { ticket: { id: ticket.id, ticket: ticket.ticket } })
      await this.ticketRepository.create(ticket)
      return ticket
    }
    return null
  }
}
