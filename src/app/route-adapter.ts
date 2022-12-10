import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'

export class RouteAdapter {
  constructor (private readonly controller: Controller) {}

  async handle (request: Request, response: Response): Promise<any> {
    const clientRequest: ClientRequest = {
      request: request.body
    }
    const serverResponse = await this.controller.handle(clientRequest)
    response.status(serverResponse.status)
      .json(serverResponse.response)
  }
}
