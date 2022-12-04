
import { Controller, ServerResponse, ClientRequest } from './protocols/controller'

interface Validation {
  validate(input: any): Error
}

interface Vehicle {
  driver: string
  name: string
  model: string
  licensePlate: string

}

class ValidationStub implements Validation {
  validate (input: ClientRequest): any {
    return null
  }
}

class RegisterVehicleController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: ClientRequest): Promise<ServerResponse> {
    const error = this.validation.validate(request.request)
    if (error) {
      return {
        status: 400,
        response: error
      }
    }
    return {
      status: 200,
      response: {}
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
})
