import '../../app/config/dotenv'
import nodemailer from 'nodemailer'
import { nodemailerMjmlPlugin } from 'nodemailer-mjml'
import { join } from 'path'
import { generateBarcode } from './helpers/generate-barcode'

export class EmailProvider {
  async sendEmail (
    to: string,
    ticket: string,
    licensePlate: string,
    created_at: string,
    hour: string
  ): Promise<void> {
    const testAccount = await nodemailer.createTestAccount()

    const transport = nodemailer.createTransport({

      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })

    transport.use(
      'compile',
      nodemailerMjmlPlugin({ templateFolder: join(__dirname, './helpers/') })
    )

    await transport.sendMail({
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
    console.log('account test Email:' + '\n' + testAccount.user + '\n' + testAccount.pass)
  }
}
