import { Response, Request } from 'express'
import commentModel from "../models/comment.model"

export const getById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await commentModel.find({ parent: req.params.id })
            .populate('sender', 'name image email')
        // console.log(result);
        
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const likeComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comment = await commentModel.findById(req.params.id);

        if (!comment) return res.status(403).json({ status: "error", message: "Comment not found" });

        const userLiked = comment.likes.includes(req.user?._id as any);
        const userDisLiked = comment.dislikes.includes(req.user?._id as any);
        
        if (userLiked) await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user?._id } });
        else await commentModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user?._id } });

        if(userDisLiked) await commentModel.findByIdAndUpdate(req.params.id, { $pull: { dislikes: req.user?._id } });
        
        return res.status(200).json({ status: "ok", userDisLiked, userLiked })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const dislikeComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comment = await commentModel.findById(req.params.id);

        if (!comment) return res.status(404).json({ status: "error", message: "Comment not found" });

        const userLiked = comment.likes.includes(req.user?._id as any);
        const userDisLiked = comment.dislikes.includes(req.user?._id as any);
        
        if (userDisLiked) await commentModel.findByIdAndUpdate(req.params.id, { $pull: { dislikes: req.user?._id } });
        else await commentModel.findByIdAndUpdate(req.params.id, { $push: { dislikes: req.user?._id } });

        if(userLiked) await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user?._id } });
    
        return res.status(200).json({ status: "ok", userDisLiked, userLiked })
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