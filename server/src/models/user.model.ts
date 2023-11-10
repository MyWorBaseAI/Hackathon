import { model, Schema, Types } from 'mongoose'

export interface IUser {
    _id?: Schema.Types.ObjectId,
    name: string,
    email: string,
    image: string,
    gender: string,
    age: number,

    category: string,
    role: "patient" | "doctor",
    experience: number,

    registered: boolean,
    followers: IUser[],
    verifycode: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export default model('hkp-users', new Schema<IUser>({
    name: String,
    email: String,
    image: String,
    gender: String,
    age: Number,
    experience: Number,
    verifycode: String,

    category: String,
    followers: [{
        type: Types.ObjectId,
        ref: 'hkp-users'
    }],
    registered: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ['patient', 'doctor'],
        default: 'patient',
    }
}, {
    timestamps: true
}))