import { model, Schema } from 'mongoose'
import { IUser } from './user.model'

export interface IChat {
    _id?: Schema.Types.ObjectId,
    users: IUser[],
    open: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export default model('hkp-chats', new Schema<IChat>({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    }],
    open: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}))