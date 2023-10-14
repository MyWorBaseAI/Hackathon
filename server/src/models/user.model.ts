import { model, Schema } from 'mongoose'

export default model('hkp-users', new Schema({
    name: String,
    phone: String,
    image: String,
    gender: String,
    age: Number,

    category: String,
    role: {
        type: String,
        enum: ['patient', 'doctor'],
        default: 'patient',
    }
}, {
    timestamps: true
}))