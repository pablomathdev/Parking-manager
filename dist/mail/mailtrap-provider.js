"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../app/config/dotenv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mjml_1 = require("nodemailer-mjml");
const path_1 = require("path");
const generate_barcode_1 = require("./helpers/generate-barcode");
class MailtrapProvider {
    async sendEmail(to, ticket, licensePlate, created_at, hour) {
        const transport = nodemailer_1.default.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
        transport.use('compile', nodemailer_mjml_1.nodemailerMjmlPlugin({ templateFolder: path_1.join(__dirname, './helpers/') }));
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
                barcode: generate_barcode_1.generateBarcode(ticket)
            }
        });
        console.log('Message sent: %s', (await message).messageId);
    }
}
exports.MailtrapProvider = MailtrapProvider;
