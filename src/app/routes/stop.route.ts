import { Router } from 'express'
import { stopParkingControllerFactory } from '../../input/factories/stop-parking'
import ExpressRouterAdapter from '../express-route-adapter'
let stopRoute = Router()
stopRoute.post('/stop', ExpressRouterAdapter.execute(stopParkingControllerFactory()))

export { stopRoute }
