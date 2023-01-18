import bodyParser from 'body-parser'
import express from 'express'
import { startRoute } from '../routes/start.route'
import cors from 'cors'
import { stopRoute } from '../routes/stop.route'

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})

app.use(startRoute)
app.use(stopRoute)
export default app
