import Validation from '../protocols/validation'
import ClientRequest from '../helpers/client-request'
import RegisterVehicleController from '../register-vehicle/register-vehicle-controller'
import UseCase from '../protocols/use-case'

interface Vehicle {
  id?: string
  driver: string
  name: string
  model: string
  licensePlate: string
  type: string
  start_date: string
  end_date: Date | null

}

interface Ticket {
  id: string
  id_vehicle_Fk: string
  type_Fk: string
  licensePlate_Fk: string
  created_at: string
}

class RegisterVehicleUseCase implements UseCase {
  async execute ({ name, driver, model, licensePlate, type, id }: Vehicle): Promise<Ticket> {
    const ticket: Ticket = {
      id: 'id_ticket',
      id_vehicle_Fk: 'id_any_vehicle',
      type_Fk: 'any_type',
      licensePlate_Fk: 'XXXXX',
      created_at: 'now'
    }

    return new Promise(resolve => resolve(ticket))
  }
}

class ValidationStub implements Validation {
  validate (input: ClientRequest): any {
    return null
  }
}

const systemUnderTestFactory = (): any => {
  const registerVehicleUseCaseStub = new RegisterVehicleUseCase()
  const validationStub = new ValidationStub()
  const sut = new RegisterVehicleController(validationStub, registerVehicleUseCaseStub)
  return { sut, validationStub, registerVehicleUseCaseStub }
}

const fakeVehicle: Vehicle = {
  name: 'any_name',
  driver: 'any_driver',
  model: 'any_model',
  licensePlate: 'XXXXX',
  type: 'any_type',
  start_date: Date.now().toString(),
  end_date: null
}

describe('register vehicle controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = systemUnderTestFactory()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeVehicle)
  })
  test('should returns error if validation returns a error of validation', async () => {
    const { sut, validationStub } = systemUnderTestFactory()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(400)
    expect(response.response).toEqual(new Error())
  })
  test('should call vehicle usecase with correct values', async () => {
    const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory()
    const executeSpy = jest.spyOn(registerVehicleUseCaseStub, 'execute')

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(executeSpy).toHaveBeenCalledWith(fakeVehicle)
  })
  test('should returns ticket if vehicle usecase returns a ticket', async () => {
    const { sut } = systemUnderTestFactory()

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(201)
    expect(response.response).toEqual({
      id: 'id_ticket',
      id_vehicle_Fk: 'id_any_vehicle',
      type_Fk: 'any_type',
      licensePlate_Fk: 'XXXXX',
      created_at: 'now'
    }
    )
  })
  test('should throw if vehicle use case return falsy', async () => {
    const { sut, registerVehicleUseCaseStub } = systemUnderTestFactory()
    jest.spyOn(registerVehicleUseCaseStub, 'execute').mockResolvedValueOnce(null)

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(500)
    expect(response.response).toEqual(new Error('Error: could not create ticket!'))
  })
})
