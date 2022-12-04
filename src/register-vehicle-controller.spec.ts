
import ClientRequest from './helpers/client-request'
import ServerResponse from './helpers/server-response'
import { Controller } from './protocols/controller'

interface Validation {
  validate(input: any): Error
}

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

interface UseCase {
  execute(input: any): Promise<any>
}

class SaveVehicleUseCase implements UseCase {
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

class RegisterVehicleController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly saveVehicleUseCase: UseCase) {}

  async handle (clientRequest: ClientRequest): Promise<ServerResponse> {
    try {
      const error = this.validation.validate(clientRequest.request)
      if (error) {
        return {
          status: 400,
          response: error
        }
      }

      const ticket = await this.saveVehicleUseCase.execute(clientRequest.request)
      if (!ticket) {
        throw new Error('Error: could not create ticket!')
      } else {
        return {
          status: 201,
          response: ticket
        }
      }
    } catch (err) {
      return {
        status: 500,
        response: err
      }
    }
  }
}

const systemUnderTestFactory = (): any => {
  const saveVehicleUseCaseStub = new SaveVehicleUseCase()
  const validationStub = new ValidationStub()
  const sut = new RegisterVehicleController(validationStub, saveVehicleUseCaseStub)
  return { sut, validationStub, saveVehicleUseCaseStub }
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
    const { sut, saveVehicleUseCaseStub } = systemUnderTestFactory()
    const saveSpy = jest.spyOn(saveVehicleUseCaseStub, 'execute')

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(saveSpy).toHaveBeenCalledWith(fakeVehicle)
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
    const { sut, saveVehicleUseCaseStub } = systemUnderTestFactory()
    jest.spyOn(saveVehicleUseCaseStub, 'execute').mockResolvedValueOnce(null)

    const clientRequest: ClientRequest = {
      request: fakeVehicle
    }

    const response = await sut.handle(clientRequest)
    expect(response.status).toBe(500)
    expect(response.response).toEqual(new Error('Error: could not create ticket!'))
  })
})
