import StopParkingController from './stop-parking-controller'
import UseCase from 'input/protocols/use-case'

const makeStopParkingUseCaseStub = (): any => {
  class StopParkingUseCaseStub implements UseCase {
    async execute (input: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
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
