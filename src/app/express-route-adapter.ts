import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'
import { MailtrapProvider } from '../mail/mailtrap-provider'

export default class ExpressRouteAdapter {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const clientRequest: ClientRequest = {
        request: req.body
      }
      const { email } = clientRequest.request
      const serverResponse = await controller.handle(clientRequest)
      const { ticket, licensePlate, created_at, hour } = serverResponse.response

      if (serverResponse.status === 201) {
        await new MailtrapProvider().sendEmail(email, ticket, licensePlate, created_at, hour)

        return res.status(serverResponse.status).json(serverResponse.response)
      }
      res.status(serverResponse.status).json(serverResponse.response)
    }
  }
}
