import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'
import { EmailProvider } from '../providers/mail/email-provider'
import calcPricePerHour from './helpers/calc-price-per-hour'

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
        void new EmailProvider().sendEmail(email, ticket, licensePlate, created_at, hour)

        return res.status(serverResponse.status).json(serverResponse.response)
      }
      if (serverResponse.status === 200) {
        const { type, end_date, ticket, start_date } = serverResponse.response
        const price = calcPricePerHour(type, end_date)
        return res.status(serverResponse.status).send({ ticket, start_date, end_date, price })
      }
      return res.status(serverResponse.status).json(serverResponse.response)
    }
  }
}
