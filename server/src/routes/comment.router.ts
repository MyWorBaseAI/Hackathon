import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getById, create } from '../controllers/comment.controller'

export default Router()
    .get('/:id', authMiddleware, getById)
    .post('/', authMiddleware, create)