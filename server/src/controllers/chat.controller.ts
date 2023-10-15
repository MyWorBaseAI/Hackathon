import { Request, Response } from 'express'
import chatModel from '../models/chat.model'

export const createChat = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await chatModel.create(req.body)
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const getChat = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await chatModel.aggregate([
            {
                $match: { users: { $in: [req.user?._id] } }
            },
            {
                $lookup: {
                    from: "hkp-users",
                    foreignField: "_id",
                    localField: "users",
                    as: "user",
                    pipeline: [{
                        $match: { _id: { $ne: req.user?._id } }
                    },{
                        $project: {
                            name: 1,
                            email: 1,
                            image: 1,
                            gender: 1,
                            age: 1,

                            category: 1,
                            role: 1,

                            createdAt: 1,
                            updatedAt: 1,
                        }
                    }, {
                        $addFields: {
                            typing: false
                        }
                    }]
                },
            },
            {
                $lookup: {
                    from: "hkp-messages",
                    foreignField: "chat",
                    localField: "_id",
                    as: "messages",
                    pipeline: [{
                        $lookup: {
                            from: "hkp-users",
                            foreignField: "sender",
                            localField: "_id",
                            as: "sender",
                            pipeline: [{
                                $project: {
                                    name: 1,
                                    email: 1,
                                    image: 1,
                                    gender: 1,
                                    age: 1,

                                    category: 1,
                                    role: 1,

                                    createdAt: 1,
                                    updatedAt: 1,
                                }
                            }]
                        }
                    }, {
                        $project: {
                            sender: {$arrayElemAt: ["$sender", 0]},
                            chat: 1,
                            text: 1,
                            view: 1,

                            createdAt: 1,
                            updatedAt: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    user: {$arrayElemAt: ["$user", 0]},
                    open: 1,
                    messages: 1,
                    last_message: {$arrayElemAt: ["$messages", -1]},
                }
            },
            {
                $sort: {
                    "last_message.createdAt": 1,
                }
            }
        ])
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const openChat = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(req.user?.role === "patient") return res.status(402).json({ status: "warning", message: "You can't make this request!" })

        await chatModel.findByIdAndUpdate(req.params.id, { $set: { open: true } })
        return res.status(200).json({ status: "ok", result: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}