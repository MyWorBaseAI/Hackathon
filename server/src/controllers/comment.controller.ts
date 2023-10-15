import { Response, Request } from 'express'
import commentModel from "../models/comment.model"

export const getById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await commentModel.find({ parent: req.params.id })
            .populate('sender', 'name image email')
        return res.status(200).json({ status: "ok", result: result[0] })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const create = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        await commentModel.create(req.body).then(comment => {
            comment.populate('sender', 'name email image')
        }).then(result => {
            return res.status(200).json({ status: "ok", result })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}