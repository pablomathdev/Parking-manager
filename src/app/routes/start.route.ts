import { Router } from 'express'
import { registerVehicleControllerFactory } from '../../input/factories/register-vehicle'
import ExpressRouterAdapter from '../express-route-adapter'
let startRoute = Router()

startRoute.post('/start', ExpressRouterAdapter.execute(registerVehicleControllerFactory()))

export { startRoute }
