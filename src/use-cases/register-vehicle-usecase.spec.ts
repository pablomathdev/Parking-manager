import UseCase from '../input/protocols/use-case'
import Ticket from '../domain/entities/ticket'
import VehicleDTO from '../input/dtos/vehicle-DTO'
import Vehicle from '../domain/entities/vehicle'
import Repository from '../domain/interfaces/repository-interface'

import 'uuid'
import { VehicleRepositoryInterface } from '../domain/interfaces/vehicle-repository-interface'
jest.mock('uuid', () => ({ v4: () => 'testId' }))

class VehicleRepositoryStub implements VehicleRepositoryInterface {
  async update (id: string, updates: any): Promise<any> {
    const item = {
      id,
      driver: 'any_driver',
      name: 'any_name',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type',
      created_at: 'now'
    }
    const itemUpdated = { ...item, ...updates }
    return new Promise(resolve => resolve(itemUpdated))
  }

  async create (element: any): Promise<any> {
    return element
  }
}

class TicketRepositoryStub implements Repository {
  async create (element: any): Promise<any> {
    return element
  }
}

class RegisterVehicleUseCase implements UseCase {
  constructor (private readonly vehicleRepository: VehicleRepositoryInterface,
    private readonly ticketRepository: Repository) {}

  async execute ({ name, driver, model, licensePlate, type }: VehicleDTO): Promise<Ticket | null> {
    const vehicle = new Vehicle(driver, name, model, licensePlate, type)

    const addVehicle = await this.vehicleRepository.create(vehicle)
    if (addVehicle) {
      const ticket = new Ticket(addVehicle.id, addVehicle.type, addVehicle.licensePlate)
      await this.vehicleRepository.update(addVehicle.id, { id_ticket: ticket.id })
      await this.ticketRepository.create(ticket)
      return ticket
    }
    return null
  }
}

const systemUnderTest = (): any => {
  const ticketRepositoryStub = new TicketRepositoryStub()
  const vehicleRepositoryStub = new VehicleRepositoryStub()
  const sut = new RegisterVehicleUseCase(vehicleRepositoryStub, ticketRepositoryStub)
  return { sut, vehicleRepositoryStub, ticketRepositoryStub }
}

describe('Register Vehicle Use Case', () => {
  test('should calls vehicle repository with correct values', async () => {
    const { sut, vehicleRepositoryStub } = systemUnderTest()
    const createSpy = jest.spyOn(vehicleRepositoryStub, 'create')

    const vehicle: VehicleDTO = {
      name: 'any_name',
      driver: 'any_driver',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }

    await sut.execute(vehicle)
    expect(createSpy).toHaveBeenCalledWith(
      new Vehicle(
        'any_driver',
        'any_name', 'any_model', 'XXXXX', 'any_type'))
  })
  test('should calls ticket repository with correct values', async () => {
    const { sut, ticketRepositoryStub } = systemUnderTest()
    const createSpy = jest.spyOn(ticketRepositoryStub, 'create')

    const vehicle: VehicleDTO = {
      name: 'any_name',
      driver: 'any_driver',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }

    await sut.execute(vehicle)
    expect(createSpy)
      .toHaveBeenCalledWith(new Ticket('testId', 'any_type', 'XXXXX'))
  })
  test('should calls vehicle repository(update) with correct values', async () => {
    const { sut, vehicleRepositoryStub } = systemUnderTest()
    const createSpy = jest.spyOn(vehicleRepositoryStub, 'update')

    const vehicle: VehicleDTO = {
      name: 'any_name',
      driver: 'any_driver',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }
    const vehicleObj = new Vehicle(
      vehicle.driver,
      vehicle.name,
      vehicle.model,
      vehicle.licensePlate,
      vehicle.type)

    await sut.execute(vehicle)
    expect(createSpy).toHaveBeenCalledWith(vehicleObj.id, { id_ticket: 'testId' })
  })
})
