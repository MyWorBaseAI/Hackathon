import { model, Schema } from 'mongoose'
import { IChat } from './chat.model'
import { IUser } from './user.model'

export interface IMessage {
    _id?: Schema.Types.ObjectId,
    
    sender: IUser,
    chat: IChat,
    text: string,
    view: boolean,

    createdAt?: Date,
    updatedAt?: Date,
}

export default model('hkp-messages', new Schema<IMessage>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "hkp-chats"
    },
    text: String,
    view: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}))