import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import 'dotenv/config' // load env variables from a .env file

import Joi from 'joi'

import {auth} from './controllers/auth'
import {users} from './controllers/users'
import {words} from './controllers/words'

function bootstrap() {
  // validate environment variables
  const envSchema = Joi.object({
    PORT: Joi.number().integer().min(1).max(65535).default(5050),
    DATABASE_URL: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().min(10).required(),
    ORIGIN: Joi.string().uri().required()
  }).unknown(true)

  const {error} = envSchema.validate(process.env)
  if (error) {
    console.error('Invalid environment variables')
    console.error(error.message)
    process.exit(1)
  }

  const app = express()

  // global middlewares
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(cors({origin: process.env.ORIGIN}))
  app.use(morgan('tiny'))
  app.use(express.static('public'))

  // routes
  app.get('/', (_req, res) => {
    return res.json({status: 'ok'}) // health check
  })

  // handlers from other files
  app.use('/words', words)
  app.use('/auth', auth)
  app.use('/users', users)

  // start server
  const port = process.env.PORT || 5050
  app.listen(port, () => console.log(`✅ Server running on port ${port}`))
}

bootstrap()
