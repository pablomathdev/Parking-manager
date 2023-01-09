"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailtrapProvider = void 0;
require("../app/config/dotenv");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerMjml = require("nodemailer-mjml");
var _path = require("path");
var _generateBarcode = require("./helpers/generate-barcode");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MailtrapProvider {
  async sendEmail(to, ticket, licensePlate, created_at, hour) {
    const transport = _nodemailer.default.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
    transport.use('compile', (0, _nodemailerMjml.nodemailerMjmlPlugin)({
      templateFolder: (0, _path.join)(__dirname, './helpers/')
    }));
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
        barcode: (0, _generateBarcode.generateBarcode)(ticket)
      }
    });
    console.log('Message sent: %s', (await message).messageId);
  }
}
exports.MailtrapProvider = MailtrapProvider;