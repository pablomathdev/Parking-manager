import DatabaseJson from '../../data/db/database-json'
import TicketRepository from '../../repositories/ticket-repository'
import VehicleRepository from '../../repositories/vehicle-repository'
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
