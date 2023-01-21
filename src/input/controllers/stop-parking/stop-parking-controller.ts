import Controller from '../../protocols/controller'
import ServerResponse from '../../helpers/server-response'
import ClientRequest from '../../helpers/client-request'
import UseCase from '../../protocols/use-case'
export default class StopParkingController implements Controller {
  constructor (private readonly stopParkingUseCase: UseCase) {}
  async handle (clientRequest: ClientRequest): Promise<ServerResponse> {
    try {
      const vehicle = await this.stopParkingUseCase.execute(
        clientRequest.request.ticket
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
    } catch (error) {
      console.log(error)
      return {

        status: 500,
        response: 'Internal Error'
      }
    }
  }
}
