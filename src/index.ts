import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import routes from './routes'
import errorHandlers from './middlewares/errorHandlers'
import authorize from './middlewares/authorization'
// import './azure.js'

var app = express()
app.use(cors({ origin: true }))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(authorize)
app.use('/api', routes)
// app.use('*', (req: Request, res: Response) => res.status(400).send('Not Found'))
app.use(errorHandlers)

export default app
