import bodyParser from 'body-parser'
import express from 'express'
import { startRoute } from '../routes/start.route'
import cors from 'cors'

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})
app.use(bodyParser.json())
app.use(startRoute)
export default app
