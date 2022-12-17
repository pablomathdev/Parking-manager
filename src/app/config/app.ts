import bodyParser from 'body-parser'
import express from 'express'
import { startRoute } from '../routes/start.route'
// routes

const app = express()
app.use(bodyParser.json())

app.use(startRoute)
export default app
