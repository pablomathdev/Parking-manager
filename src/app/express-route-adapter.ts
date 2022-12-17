/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable quote-props */
import {
  GenerateView,
  GenerateBarCode
} from './generate-ticket/generate-ticket'
import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'

// const template = Handlebars.compile(source)

export default class ExpressRouteAdapter {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const clientRequest: ClientRequest = {
        request: req.body
      }

      const serverResponse = await controller.handle(clientRequest)
      const { ticket, licensePlate, created_at, type } =
        serverResponse.response
      if (serverResponse.status === 201) {
        const source =
          '<p>ticket:{{ticket}}</p>' +
          '<br>' +
          '<p>licensePlate:{{licensePlate}}</p>' +
          '<br>' +
          '<p>Hour:{{created_at}}</p>' +
          '<br>' +
          '<p>type:{{type}}</p>' +
          '<br>' +
          '<img src="{{img}}">'
        const data = {
          'ticket': `${ticket}`,
          'licensePlate': `${licensePlate}`,
          'hour': `${created_at}`,
          'type': `${type}`,
          'img': `../tmp/codebar${ticket}.png`
        }
        await new GenerateView().generate(source, data)
        await new GenerateBarCode().generate(ticket)
        return res.status(serverResponse.status).json(serverResponse.response)
      }
      res.status(serverResponse.status).json(serverResponse.response)
    }
  }
}
