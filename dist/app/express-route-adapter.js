"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailtrap_provider_1 = require("../mail/mailtrap-provider");
class ExpressRouteAdapter {
    static execute(controller) {
        return async (req, res) => {
            const clientRequest = {
                request: req.body
            };
            const { email } = clientRequest.request;
            const serverResponse = await controller.handle(clientRequest);
            const { ticket, licensePlate, created_at, hour } = serverResponse.response;
            if (serverResponse.status === 201) {
                await new mailtrap_provider_1.MailtrapProvider().sendEmail(email, ticket, licensePlate, created_at, hour);
                return res.status(serverResponse.status).json(serverResponse.response);
            }
            res.status(serverResponse.status).json(serverResponse.response);
        };
    }
}
exports.default = ExpressRouteAdapter;
