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

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const data = await commentModel.create(req.body)
        const result = await data.populate('sender', 'name email image role')

        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}