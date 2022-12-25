import { GenerateView } from '../../app/generate-ticket/generate-view'
import { Sendticket } from '../../app/generate-ticket/send-ticket'
import DatabaseJson from '../../data/db/database-json'
import { MailtrapProvider } from '../../mail/mailtrap-provider'
import TicketRepository from '../../repositories/ticket/ticket-repository'
import VehicleRepository from '../../repositories/vehicle/vehicle-repository'
import RegisterVehicleUseCase from '../../use-cases/register-vehicle-usecase'
import RegisterVehicleController from '../controllers/register-vehicle/register-vehicle-controller'
import ValidateFields from '../validation/validate-fields'

const registerVehicleUseCaseFactory = (): RegisterVehicleUseCase => {
  const vehicleRepository = new VehicleRepository(new DatabaseJson('vehicle'))
  const ticketRepository = new TicketRepository(new DatabaseJson('ticket'))
  return new RegisterVehicleUseCase(vehicleRepository, ticketRepository)
}

export const registerVehicleControllerFactory = (): RegisterVehicleController => {
  const validateFields = new ValidateFields()
  return new RegisterVehicleController(validateFields, registerVehicleUseCaseFactory())
}

export const sendTicketFactory = (): Sendticket => {
  const generateView = new GenerateView()
  const emailProvider = new MailtrapProvider()
  return new Sendticket(generateView, emailProvider)
}
