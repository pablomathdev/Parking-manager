import ClientRequest from '../helpers/client-request'
import ServerResponse from '../helpers/server-response'

export default interface Controller {
  handle(clientRequest: ClientRequest): Promise<ServerResponse>
}
