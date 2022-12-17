/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable quote-props */
import { source, content } from './generate-ticket/helpers/template'
import { GenerateView } from './generate-ticket/generate-view'
import { GenerateBarCode } from './generate-ticket/generate-barcode'
import { Request, Response } from 'express'
import ClientRequest from '../input/helpers/client-request'
import Controller from '../input/protocols/controller'

export default class ExpressRouteAdapter {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const clientRequest: ClientRequest = {
        request: req.body
      }

      const serverResponse = await controller.handle(clientRequest)
      const { ticket, licensePlate, created_at, type } = serverResponse.response

      if (serverResponse.status === 201) {
        await new GenerateView().generate(source, content(ticket, licensePlate, created_at, type))
        await new GenerateBarCode().generate(ticket)
        return res.status(serverResponse.status).json(serverResponse.response)
      }
      res.status(serverResponse.status).json(serverResponse.response)
    }
  }
}
