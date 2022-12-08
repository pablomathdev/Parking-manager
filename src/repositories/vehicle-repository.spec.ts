import Vehicle from '../domain/entities/vehicle'
import Database from '../domain/interfaces/database-interface'
import VehicleRepository from './vehicle-repository'

import 'uuid'

jest.mock('uuid', () => ({ v4: () => 'testId' }))

// MockDate.set('2022-12-08')
class DatabaseStub implements Database {
  async save (element: any): Promise<any> {
    return new Promise(resolve => resolve(new Vehicle(
      'any_driver',
      'any_name',
      'any_model',
      'XXXXX',
      'any_type'
    )))
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

    const fakeVehicle = new Vehicle(
      'any_driver',
      'any_name',
      'any_model',
      'XXXXX',
      'any_type'
    )

    await sut.create(fakeVehicle)
    expect(saveSpy).toHaveBeenCalledWith(fakeVehicle)
  })
  test('should returns vehicle if the database successfully saves the vehicle', async () => {
    const { sut } = systemUnderTest()

    const fakeVehicle = new Vehicle(
      'any_driver',
      'any_name',
      'any_model',
      'XXXXX',
      'any_type'
    )

    const result = await sut.create(fakeVehicle)
    expect(result).toEqual(fakeVehicle)
  })
})