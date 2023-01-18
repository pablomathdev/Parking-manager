import DatabaseVehicle from '../../data/db/database-vehicle'
import VehicleRepository from '../../repositories/vehicle/vehicle-repository'
import StopParkingUseCase from '../../use-cases/stop-parking/stop-parking-usecase'
import StopParkingController from '../controllers/stop-parking/stop-parking-controller'

const stopParkingUseCaseFactory = (): StopParkingUseCase => {
  const databaseVehicle = new DatabaseVehicle('vehicle')
  const vehicleRepository = new VehicleRepository(databaseVehicle)
  return new StopParkingUseCase(vehicleRepository)
}

export const stopParkingControllerFactory = (): StopParkingController => {
  return new StopParkingController(stopParkingUseCaseFactory())
}
