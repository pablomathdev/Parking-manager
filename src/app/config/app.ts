import bodyParser from 'body-parser'
import path from 'path'
import express from 'express'
import { engine } from 'express-handlebars'
import { startRoute } from '../routes/start.route'
// routes

const app = express()
app.use(bodyParser.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname + '/' + '../views'))

app.use(startRoute)
export default app
