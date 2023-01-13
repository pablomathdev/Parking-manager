import Controller from 'input/protocols/controller'
import ServerResponse from 'input/helpers/server-response'
import ClientRequest from 'input/helpers/client-request'
import UseCase from 'input/protocols/use-case'

class StopParkingController implements Controller {
  constructor (private readonly stopParkingUseCase: UseCase) {}
  async handle (clientRequest: ClientRequest): Promise<ServerResponse> {
    try {
      const vehicle = await this.stopParkingUseCase.execute(
        clientRequest.request
      )

      if (vehicle) {
        return {
          status: 200,
          response: vehicle
        }
      }
      return {
        status: 404,
        response: 'Item Not Exists!'
      }
    } catch {
      return {
        status: 500,
        response: 'Internal Error'
      }
    }
  }
}

const makeStopParkingUseCaseStub = (): any => {
  class StopParkingUseCaseStub implements UseCase {
    async execute (input: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'fd4108f7-61fb-4b40-afd0-02318fb5a6ae',
          id_vehicle: 'f41c53bc-b39c-4263-9330-7e11362fa16a',
          type: 'any-type',
          licensePlate: 'XXXXX',
          ticket: '0123456789',
          created_at: '01/12/2023',
          hour: '8:22:05 PM'
        })
      )
    }
  }
  return new StopParkingUseCaseStub()
}

const systemUnderTest = (): any => {
  const stopParkingUseCaseStub = makeStopParkingUseCaseStub()
  const sut = new StopParkingController(stopParkingUseCaseStub)

  return { sut, stopParkingUseCaseStub }
}

describe('Stop parking controller', () => {
  test('calls stop parking usecase with correct values', async () => {
    const { sut, stopParkingUseCaseStub } = systemUnderTest()
    const executeSpy = jest.spyOn(stopParkingUseCaseStub, 'execute')
    const clientRequest = {
      request: '0123456789'
    }
    await sut.handle(clientRequest)
    expect(executeSpy).toHaveBeenCalledWith('0123456789')
  })
  test('returns vehicle if use case returns a vehicle', async () => {
    const { sut } = systemUnderTest()
    const clientRequest = {
      request: '0123456789'
    }
    const serverResponse = await sut.handle(clientRequest)
    expect(serverResponse.status).toBe(200)
    expect(serverResponse.response).toEqual({
      id: 'fd4108f7-61fb-4b40-afd0-02318fb5a6ae',
      id_vehicle: 'f41c53bc-b39c-4263-9330-7e11362fa16a',
      type: 'any-type',
      licensePlate: 'XXXXX',
      ticket: '0123456789',
      created_at: '01/12/2023',
      hour: '8:22:05 PM'
    })
  })
  test('returns 404 if use case not returns a vehicle', async () => {
    const { sut, stopParkingUseCaseStub } = systemUnderTest()
    jest.spyOn(stopParkingUseCaseStub, 'execute')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const clientRequest = {
      request: '0123456789'
    }
    const serverResponse = await sut.handle(clientRequest)
    expect(serverResponse.status).toBe(404)
    expect(serverResponse.response).toEqual('Item Not Exists!')
  })
  test('throws if use case throws', async () => {
    const { sut, stopParkingUseCaseStub } = systemUnderTest()
    jest.spyOn(stopParkingUseCaseStub, 'execute')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const clientRequest = {
      request: '0123456789'
    }
    const serverResponse = await sut.handle(clientRequest)
    expect(serverResponse.status).toBe(500)
    expect(serverResponse.response).toEqual('Internal Error')
  })
})
