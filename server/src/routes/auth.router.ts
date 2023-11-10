import { Router } from 'express'
import { login, verify } from '../controllers/auth.controller'

export default Router()
    .post('/login', login)
    .post('/verify', verify)