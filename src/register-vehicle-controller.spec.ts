
import { Controller, ServerResponse, ClientRequest } from './protocols/controller'

interface Validation {
  validate(input: any): boolean
}

interface Vehicle {
  driver: string
  name: string
  model: string
  licensePlate: string

}

class ValidationStub implements Validation {
  validate (input: any): boolean {
    return true
  }
}

class RegisterVehicleController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: ClientRequest): Promise<ServerResponse> {
    this.validation.validate(request.data)
    return {
      status: 200,
      data: {}
    }
  }
}

const systemUnderTestFactory = (): any => {
  const validationStub = new ValidationStub()
  const sut = new RegisterVehicleController(validationStub)
  return { sut, validationStub }
}

const fakeVehicle: Vehicle = {
  name: 'any_name',
  driver: 'any_driver',
  model: 'any_model',
  licensePlate: 'XXXXX'

}

describe('register vehicle controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = systemUnderTestFactory()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const clientRequest = {
      data: fakeVehicle
    }

    await sut.handle(clientRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeVehicle)
  })
})
