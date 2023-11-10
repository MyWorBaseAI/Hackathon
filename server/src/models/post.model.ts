import { model, Schema } from 'mongoose'
import { IUser } from './user.model'
import { IComment } from './comment.model'

export interface IPosts {
    _id?: Schema.Types.ObjectId,
    
    sender: IUser,
    title: string,
    start_date: Date,
    end_date: Date,
    text: string,
    intensity: number,
    categories: string[],
    files: string[],
    file_desc: string,
    views: IUser[] | Schema.Types.ObjectId[] | string[],

    createdAt?: Date,
    updatedAt?: Date,
}

export default model('hkp-potss', new Schema<IPosts>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    },
    title: String,
    start_date: Date,
    end_date: Date,
    text: String,
    intensity: Number,
    categories: [String],
    files: [String], 
    file_desc: String,
    views: [{
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    }],
}, {
    timestamps: true
}))