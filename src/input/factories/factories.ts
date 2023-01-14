import DatabaseJson from '../../data/db/database-json'
import DatabaseVehicle from '../../data/db/database-vehicle'
import TicketRepository from '../../repositories/ticket/ticket-repository'
import VehicleRepository from '../../repositories/vehicle/vehicle-repository'
import RegisterVehicleUseCase from '../../use-cases/register-vehicle/register-vehicle-usecase'
import RegisterVehicleController from '../controllers/register-vehicle/register-vehicle-controller'
import ValidateFields from '../validation/validate-fields'

const registerVehicleUseCaseFactory = (): RegisterVehicleUseCase => {
  const vehicleRepository = new VehicleRepository(new DatabaseVehicle('vehicle'))
  const ticketRepository = new TicketRepository(new DatabaseJson('ticket'))
  return new RegisterVehicleUseCase(vehicleRepository, ticketRepository)
}

export const registerVehicleControllerFactory =
  (): RegisterVehicleController => {
    const validateFields = new ValidateFields()
    return new RegisterVehicleController(
      validateFields,
      registerVehicleUseCaseFactory()
    )
  }
