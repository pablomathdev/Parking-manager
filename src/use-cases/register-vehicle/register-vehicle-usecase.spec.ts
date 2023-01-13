import RegisterVehicleUseCase from './register-vehicle-usecase'
import Ticket from '../../domain/entities/ticket'
import VehicleDTO from '../../input/dtos/vehicle-DTO'
import Vehicle from '../../domain/entities/vehicle'
import Repository from '../../domain/interfaces/repository-interface'
import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import 'uuid'
import 'custom-uuid'
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => '0123456789' }))
jest.mock('uuid', () => ({ v4: () => 'testId' }))

jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-12-08'))

class VehicleRepositoryStub implements VehicleRepositoryInterface {
  async findByTicket (ticket: string): Promise<Vehicle> {
    throw new Error('Method not implemented.')
  }

  async update (id: string, updates: any): Promise<any> {
    return null
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
      email: 'any_email@email.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }

    await sut.execute(vehicle)
    expect(createSpy).toHaveBeenCalledWith(
      new Vehicle('any_email@email.com', 'XXXXX', 'any_type'))
  })
  test('should calls ticket repository with correct values', async () => {
    const { sut, ticketRepositoryStub } = systemUnderTest()
    const createSpy = jest.spyOn(ticketRepositoryStub, 'create')

    const vehicle: VehicleDTO = {
      email: 'any_email@email.com',
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
      email: 'any_email@email.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }
    const vehicleObj = new Vehicle(
      vehicle.email,
      vehicle.licensePlate,
      vehicle.type)

    await sut.execute(vehicle)
    expect(createSpy).toHaveBeenCalledWith(vehicleObj.id, { ticket: { id: 'testId', ticket: '0123456789' } })
  })
  test('should returns a ticket if created vehicle successfully', async () => {
    const { sut } = systemUnderTest()

    const vehicle: VehicleDTO = {
      email: 'any_email@email.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }

    const result = await sut.execute(vehicle)

    expect(result).toEqual(
      {
        created_at: '12/07/2022',
        hour: '8:00:00 PM',
        id: 'testId',
        id_vehicle: 'testId',
        licensePlate: 'XXXXX',
        type: 'any_type',
        ticket: '0123456789'
      })
  })
})
