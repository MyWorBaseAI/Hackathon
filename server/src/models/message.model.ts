import { model, Schema } from 'mongoose'

export default model('hkp-users', new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "hkp-users"
    },
    text: String,
    view: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}))