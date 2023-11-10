import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getById, create, likeComment, dislikeComment } from '../controllers/comment.controller'

export default Router()
    .get('/:id', authMiddleware, getById)

    .put('/like/:id', authMiddleware, likeComment)
    .put('/dislike/:id', authMiddleware, dislikeComment)

    .post('/', authMiddleware, create)