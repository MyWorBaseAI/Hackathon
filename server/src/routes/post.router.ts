import { Router } from 'express'
import { localeUpload } from '../middlewares/file.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getById, getMyTape, create, viewpost } from '../controllers/post.controller'

export default Router()
    .get('/', authMiddleware, getMyTape)
    .get('/:id', authMiddleware, getById)
    .put('/view/:id', authMiddleware, viewpost)
    .post('/', authMiddleware, localeUpload.array('file', 10), create)