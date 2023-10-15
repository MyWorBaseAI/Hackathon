import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import userModel from '../models/user.model'
import { localeUpload } from '../middlewares/file.middleware'
import commentModel from '../models/comment.model'

export default Router()
    .put('/edit', authMiddleware, localeUpload.single('image'), async (req: Request, res: Response) => {
        try {
            const result = await userModel.findByIdAndUpdate(req.user?._id,{ $set: req.body }, { new: true })
            return res.status(200).json({ status: "ok", result })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: "error", message: "Internal Server Error" })
        }
    })
    .get('/:id', authMiddleware, async (req: Request, res: Response) => {
        try {
            const result = await userModel.findById(req.params.id)
            .select('name email image gender age experience category followers')
            // const comments = 
            return res.status(200).json({ status: "ok", result })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: "error", message: "Internal Server Error" })
        }
    })