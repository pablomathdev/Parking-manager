import { Router } from 'express'
import { registerVehicleControllerFactory } from '../../input/factories/factories'
import ExpressRouterAdapter from '../express-route-adapter'
let startRoute = Router()

startRoute.post('/start', ExpressRouterAdapter.execute(registerVehicleControllerFactory()))

export { startRoute }
