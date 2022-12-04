export interface ClientRequest {
  data: any
}

export interface ServerResponse {
  status: number
  data: any
}
export interface Controller {
  handle(clientRequest: ClientRequest): Promise<ServerResponse>
}
