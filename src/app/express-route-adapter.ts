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
      if (serverResponse.status === 201) {
        const response = serverResponse.response
        return res.render('codebar', { response })
      }
      res.status(serverResponse.status)
        .json(serverResponse.response)
    }
  }
}

// export default class RouteAdapter {
//   controller: Controller
//   constructor (controller: Controller) {
//     this.controller = controller
//   }

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   async handle (request: Request, response: Response): Promise<Response> {
//     const clientRequest: ClientRequest = {
//       request: request.body
//     }
//     const serverResponse = await this.controller.handle(clientRequest)
//     return response.status(serverResponse.status)
//       .json(serverResponse.response)
//   }
// }
