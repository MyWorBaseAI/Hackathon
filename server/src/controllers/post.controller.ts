import { Response, Request } from 'express'
import postModel from "../models/post.model"
import { Types } from 'mongoose'

export const getMyTape = async (req: Request, res: Response): Promise<Response> => {
    try {
        // let findOptions: any = {}
        // if(req.user?.role === "doctor") Object.assign(findOptions, { categories: { $in: [req.user?.category] } })
        // else Object.assign(findOptions, {sender: new Types.ObjectId(req.user?._id as any)})
        // console.log(findOptions);
        
        const result = await postModel.aggregate([
            // {
            //     $match: findOptions
            // },
            {
                $lookup: {
                    from: "hkp-users",
                    foreignField: "_id",
                    localField: "sender",
                    as: "sender"
                }
            },
            {
                $lookup: {
                    from: "hkp-comments",
                    foreignField: "post",
                    localField: "_id",
                    as: "comments"
                }
            },
            {
                $sort: { _id: -1 }
            },
            {
                $project: {
                    sender: { $arrayElemAt: ["$sender", 0] },
                    title: 1,
                    start_date: 1,
                    end_date: 1,
                    text: 1,
                    intensity: 1,
                    categories: 1,
                    files: 1,
                    file_desc: 1,
                    views: { $size: "$views" },
                    comments: { $size: "$comments" },
                    createdAt: 1,
                    updatedAt: 1,
                }
            }
        ])
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const getById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await postModel.aggregate([
            { $match: { _id: new Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "hkp-comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "comments",
                    pipeline: [{
                        $match: { parent: null }
                    },
                    {
                        $lookup: {
                            from: "hkp-users",
                            localField: "sender",
                            foreignField: "_id",
                            as: "sender",
                            pipeline: [{ $project: {
                                    name: 1,
                                    email: 1,
                                    image: 1,
                                    gender: 1,
                                    age: 1,

                                    category: 1,
                                    role: 1,

                                    createdAt: 1,
                                    updatedAt: 1,
                            } }]
                        }
                    },
                    {
                        $lookup: {
                            from: "hkp-comments",
                            localField: "_id",
                            foreignField: "parent",
                            as: "reviews",
                            pipeline: [{ $project: {
                                _id: 1
                            } }]
                        }
                    },{
                        $project: {
                            sender: { $arrayElemAt: ['$sender', 0] },
                            reviews: { $size: "$reviews" },
                            post: 1,
                            parent: 1,
                            text: 1,
                            likes: 1,
                            dislikes: 1,
                            
                            createdAt: 1,
                            updatedAt: 1,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "hkp-users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender",
                    pipeline: [{ $project: {
                        name: 1,
                        email: 1,
                        image: 1,
                        gender: 1,
                        age: 1,

                        category: 1,
                        role: 1,

                        createdAt: 1,
                        updatedAt: 1,
                    } }]
                }
            },
            {
                $project: {
                    categories: 1,
                    comments: 1,
                    createdAt: 1,
                    end_date: 1,
                    file_desc: 1,
                    files: 1,
                    intensity: 1,
                    sender: { $arrayElemAt: ['$sender', 0] },
                    start_date: 1, 
                    text: 1,
                    title: 1,
                    updatedAt: 1,
                    views: 1
                }
            }
        ])
        return res.status(200).json({ status: "ok", result: result[0] })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const viewpost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const post = await postModel.findById(req.params.id)
        if (!post) return res.json({ status: 'warning', message: "This Post not found" })
        const is_view = !post.views.includes(req.user?._id as any)
        if (is_view) {
            post.views.push(req.user?._id as any)
            await post.save()
        }
        return res.status(200).json({ status: "ok", is_view })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await postModel.create(req.body)
        return res.status(200).json({ status: "ok", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}