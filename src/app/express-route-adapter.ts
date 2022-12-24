import { source, content } from './generate-ticket/helpers/template'
import { GenerateView } from './generate-ticket/generate-view'
import { MailtrapProvider } from '../mail/mailtrap-provider'
import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'

export default class ExpressRouteAdapter {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const clientRequest: ClientRequest = {
        request: req.body
      }
      const { email } = clientRequest.request
      const serverResponse = await controller.handle(clientRequest)
      const { ticket, licensePlate, created_at, type } = serverResponse.response

      if (serverResponse.status === 201) {
        await new GenerateView().generate(source, await content(ticket, licensePlate, created_at, type))

        await new MailtrapProvider().sendEmail(email, ticket)
        return res.status(serverResponse.status).json(serverResponse.response)
      }
      res.status(serverResponse.status).json(serverResponse.response)
    }
  }
}