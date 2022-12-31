import '../app/config/dotenv'
import nodemailer from 'nodemailer'
import { nodemailerMjmlPlugin } from 'nodemailer-mjml'
import { join } from 'path'
import { generateBarcode } from './helpers/generate-barcode'

export class MailtrapProvider {
  async sendEmail (to: string, ticket: string, licensePlate: string, created_at: string, hour: string): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    })

    transport.use('compile', nodemailerMjmlPlugin({ templateFolder: join(__dirname, './helpers/') }))

    const message = transport.sendMail({
      from: 'Parking manager <noreplay@parking_manager.com>',
      to,
      subject: 'Your parking ticket',
      templateName: 'template',
      templateData: {
        ticket,
        licensePlate,
        created_at,
        hour,
        barcode: generateBarcode(ticket)
      }
    })
    console.log('Message sent: %s', (await message).messageId)
  }
}
