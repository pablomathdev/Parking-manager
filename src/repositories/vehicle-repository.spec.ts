import Vehicle from '../domain/entities/vehicle'
import Database from '../domain/interfaces/database-interface'
import VehicleRepository from './vehicle-repository'

import 'uuid'
jest.mock('uuid', () => ({ v4: () => 'testId' }))

class DatabaseStub implements Database {
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
  test('should calls database with correct values', async () => {
    const { sut, databaseStub } = systemUnderTest()
    const saveSpy = jest.spyOn(databaseStub, 'update')

    const fakeVehicle = new Vehicle(
      'any_driver',
      'any_name',
      'any_model',
      'XXXXX',
      'any_type'
    )

    const result = await sut.create(fakeVehicle)
    await sut.update(result.id, { name: 'pablo' })
    expect(saveSpy).toHaveBeenCalledWith(result.id, { name: 'pablo' })
  })
  test('should update item by id', async () => {
    const { sut } = systemUnderTest()

    const fakeVehicle = new Vehicle(
      'any_driver',
      'any_name',
      'any_model',
      'XXXXX',
      'any_type'
    )

    const item = await sut.create(fakeVehicle)
    const result = await sut.update(item.id, { name: 'pablo' })

    expect(result.id).toBe(item.id)
    expect(result.name).toBe('pablo')
  })
})
