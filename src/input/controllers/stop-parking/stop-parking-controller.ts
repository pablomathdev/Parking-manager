import Controller from 'input/protocols/controller'
import ServerResponse from 'input/helpers/server-response'
import ClientRequest from 'input/helpers/client-request'
import UseCase from 'input/protocols/use-case'

export default class StopParkingController implements Controller {
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
