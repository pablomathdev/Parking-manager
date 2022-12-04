import ClientRequest from '../helpers/client-request'
import ServerResponse from '../helpers/server-response'

export interface Controller {
  handle(clientRequest: ClientRequest): Promise<ServerResponse>
}
