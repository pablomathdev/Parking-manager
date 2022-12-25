import { MailtrapProvider } from '../../mail/mailtrap-provider'
import { GenerateView } from './generate-view'
import { content } from './helpers/template'

interface SendTicketDTO {
  source: string
  ticket: string
  licensePlate: string
  created_at: string
  type: string
  email: string

}

export class Sendticket {
  constructor (private readonly generateView: GenerateView,
    private readonly emailProvider: MailtrapProvider) {}

  async sendTicket ({
    source,
    ticket,
    licensePlate,
    created_at,
    type,
    email
  }: SendTicketDTO): Promise<void> {
    await this.generateView.generate(source, await content(
      ticket,
      licensePlate,
      created_at,
      type))
    await this.emailProvider.sendEmail(email, ticket)
  }
}
