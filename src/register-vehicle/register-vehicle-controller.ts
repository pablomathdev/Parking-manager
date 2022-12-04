import Controller from '../protocols/controller'
import Validation from '../protocols/validation'
import UseCase from '../protocols/use-case'
import ClientRequest from '../helpers/client-request'
import ServerResponse from '../helpers/server-response'

export default class RegisterVehicleController implements Controller {
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
