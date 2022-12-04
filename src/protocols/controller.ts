export interface ClientRequest {
  request: any
}

export interface ServerResponse {
  status: number
  response?: any
}
export interface Controller {
  handle(clientRequest: ClientRequest): Promise<ServerResponse>
}
