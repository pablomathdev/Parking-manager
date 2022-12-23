import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'

export class MailtrapProvider {
  async sendEmail (to: string, ticket: string): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '3651b1980b7ecb',
        pass: 'ad660ece458474'
      }
    })
    const html = await fs.readFile(path.join(__dirname, '../' + '/app/generate-ticket/view/' + `view${ticket}.html`), { encoding: 'utf-8' })

    const message = await transport.sendMail({

      from: 'parking manager <parking_manager@example.com>',
      to,
      subject: 'Parking Ticket', // Subject line
      html
    })
    console.log('Message sent: %s', message.messageId)
  }
}
