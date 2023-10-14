import { model, Schema } from 'mongoose'

export default model('hkp-chats', new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    }]
}, {
    timestamps: true
}))