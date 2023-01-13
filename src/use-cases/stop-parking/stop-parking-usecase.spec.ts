import VehicleRepositoryInterface from 'domain/interfaces/vehicle-repository-interface'
import UseCase from 'input/protocols/use-case'
import Vehicle from 'domain/entities/vehicle'

const makeVehicleRepository = (): any => {
  class VehicleRepositoryStub implements VehicleRepositoryInterface {
    async findByTicket (ticket: string): Promise<Vehicle> {
      return new Promise(resolve => resolve({
        id: '6d9e1bae-460c-40a0-ad4e-1f4a8713919f',
        start_date: 'Fri, Jan 13, 2023 10:36 AM',
        end_date: null,
        ticket: {
          id: '385d0aba-e8d2-4500-b840-2ce08e02ac04',
          ticket: '0123456789'
        },
        email: 'testemail@email.com',
        licensePlate: 'XXXXX',
        type: 'any-type'
      }))
    }

    async update (id: string, updates: any): Promise<any> {
      throw new Error('Method not implemented.')
    }

    async create (element: any): Promise<any> {
      throw new Error('Method not implemented.')
    }
  }
  return new VehicleRepositoryStub()
}
class StopParkingUseCase implements UseCase {
  constructor (private readonly vehicleRepository: VehicleRepositoryInterface) {}
  async execute (input: any): Promise<any> {
    await this.vehicleRepository.findByTicket(input)
  }
}

const systemUnderTest = (): any => {
  const vehicleRepositoryStub = makeVehicleRepository()
  const sut = new StopParkingUseCase(vehicleRepositoryStub)
  return { sut, vehicleRepositoryStub }
}

describe('Stop Parking Use Case', () => {
  test('calls vehicle repository with correct values', async () => {
    const { sut, vehicleRepositoryStub } = systemUnderTest()

    const findByTicketSpy = jest.spyOn(vehicleRepositoryStub, 'findByTicket')

    const ticket = '0123456789'

    await sut.execute(ticket)

    expect(findByTicketSpy).toHaveBeenCalledWith(ticket)
  })
})
