import VehicleRepositoryInterface from '../../domain/interfaces/vehicle-repository-interface'
import Vehicle from '../../domain/entities/vehicle'
import StopParkingUseCase from './stop-parking-usecase'
import MockDate from 'mockdate'
import dayjs from 'dayjs'
MockDate.set(
  dayjs('Fri, Jan 13, 2023 10:51 AM').format('ddd, MMM D, YYYY h:mm A')
)

const makeVehicleRepository = (): any => {
  class VehicleRepositoryStub implements VehicleRepositoryInterface {
    async findByTicket (ticket: string): Promise<Vehicle> {
      return new Promise((resolve) =>
        resolve({
          id: '6d9e1bae-460c-40a0-ad4e-1f4a8713919f',
          start_date: 'Fri, Jan 13, 2023 10:36 AM',
          end_date: 'Fri, Jan 13, 2023 10:51 AM',
          ticket: {
            id: '385d0aba-e8d2-4500-b840-2ce08e02ac04',
            ticket: '0123456789'
          },
          email: 'testemail@email.com',
          licensePlate: 'XXXXX',
          type: 'any-type'
        })
      )
    }

    async update (id: string, updates: any): Promise<any> {
      const item = {
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
      }
      return new Promise((resolve) => resolve({ ...item, ...updates }))
    }

    async create (element: any): Promise<any> {
      throw new Error('Method not implemented.')
    }
  }
  return new VehicleRepositoryStub()
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
  test('calls vehicle repository (update) with correct values', async () => {
    const { sut, vehicleRepositoryStub } = systemUnderTest()
    const updateSpy = jest.spyOn(vehicleRepositoryStub, 'update')
    const ticket = '0123456789'

    await sut.execute(ticket)

    expect(updateSpy).toHaveBeenCalledWith(
      '6d9e1bae-460c-40a0-ad4e-1f4a8713919f',
      { end_date: 'Fri, Jan 13, 2023 10:51 AM', time: 15 }
    )
  })

  test('should returns a vehicle if successfully', async () => {
    const { sut } = systemUnderTest()

    const ticket = '0123456789'

    const result = await sut.execute(ticket)

    expect(result).toEqual({
      end_date: 'Fri, Jan 13, 2023 10:51 AM',
      id: '6d9e1bae-460c-40a0-ad4e-1f4a8713919f',
      start_date: 'Fri, Jan 13, 2023 10:36 AM',
      ticket: '0123456789',
      time: 15
    })
  })
})
