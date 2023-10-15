import { model, Schema } from 'mongoose'

export interface IUser {
    _id?: Schema.Types.ObjectId,
    name: string,
    email: string,
    image: string,
    gender: string,
    age: number,

    category: string,
    role: "patient" | "doctor"

    createdAt?: Date,
    updatedAt?: Date,
}

export default model('hkp-users', new Schema<IUser>({
    name: String,
    email: String,
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