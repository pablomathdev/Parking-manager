import Controller from 'input/protocols/controller'
import ServerResponse from 'input/helpers/server-response'
import ClientRequest from 'input/helpers/client-request'
import UseCase from 'input/protocols/use-case'

class StopParkingController implements Controller {
  constructor (private readonly stopParkingUseCase: UseCase) {}
  async handle (clientRequest: ClientRequest): Promise<ServerResponse> {
    await this.stopParkingUseCase.execute(clientRequest.request)
    return {
      status: 200,
      response: 'any'
    }
  }
}

const makeStopParkingUseCaseStub = (): any => {
  class StopParkingUseCaseStub implements UseCase {
    async execute (input: any): Promise<any> {
      return new Promise(resolve => resolve({}))
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
})
