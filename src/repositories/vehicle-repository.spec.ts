
import Vehicle from '../domain/entities/vehicle'
import Database from '../domain/interfaces/database-interface'
import Repository from '../domain/interfaces/repository-interface'

class DatabaseStub implements Database {
  async save (element: any): Promise<any> {
    return null
  }
}

class VehicleRepository implements Repository {
  constructor (private readonly database: Database) { }

  async create (vehicle: Vehicle): Promise<any> {
    await this.database.save(vehicle)
  }
}

const systemUnderTest = (): any => {
  const databaseStub = new DatabaseStub()
  const sut = new VehicleRepository(databaseStub)
  return { sut, databaseStub }
}

describe('Vehicle repository', () => {
  test('should calls database with correct values', async () => {
    const { sut, databaseStub } = systemUnderTest()
    const saveSpy = jest.spyOn(databaseStub, 'save')

    const fakeVehicle: Vehicle = {
      id: 'any_id',
      driver: 'any_driver',
      name: 'any_name',
      model: 'any_model',
      licensePlate: 'XXXXX',
      type: 'any_type',
      start_date: 'now',
      end_date: null
    }

    await sut.create(fakeVehicle)
    expect(saveSpy).toHaveBeenCalledWith(fakeVehicle)
  })
})
