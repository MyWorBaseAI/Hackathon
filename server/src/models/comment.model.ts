import { model, Schema } from 'mongoose'
import { IUser } from './user.model'
import { IPosts } from './post.model'

export interface IComment {
    _id?: Schema.Types.ObjectId,

    sender: IUser,
    post: IPosts,
    parent: IComment,
    text: string,
    likes: IUser[],
    dislikes: IUser[],
    
    createdAt?: Date,
    updatedAt?: Date,
}


export default model('hkp-comments', new Schema<IComment>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "hkp-posts"
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "hkp-comments"
    },
    text: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    }],
}, {
    timestamps: true
}))