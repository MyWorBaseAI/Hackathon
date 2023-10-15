import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createChat, getChat, openChat, createMessage } from '../controllers/chat.controller'

export default Router()
    .get('/', authMiddleware, getChat)
    .post('/', authMiddleware, createChat)
    .put('/:id', authMiddleware, openChat)
    .post('/message', authMiddleware, createMessage)