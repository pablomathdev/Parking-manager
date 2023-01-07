import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { startRoute } from '../routes/start.route'

const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  app.use(cors())
  next()
})
app.use(startRoute)
export default app
