import { Router } from 'express'
import { localeUpload } from '../middlewares/file.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getById, getMyTape, create } from '../controllers/post.controller'

export default Router()
    .get('/', authMiddleware, getMyTape)
    .get('/:id', authMiddleware, getById)
    .post('/', authMiddleware, localeUpload.array('file', 10), create)