import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model"
import { generate } from '../config/codegenerate'
import bcrypt from 'bcryptjs'
import { jwtSecret } from '../config/keys'

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const searchedUser = await userModel.findOne({ email: req.body.email })
        const code = generate()
        const verify_code = await bcrypt.hash(code, 10)
        
        if(searchedUser) searchedUser.updateOne({ $set: { verify_code } })
        else await userModel.create(req.body)

        return res.json({ status: "ok", message: "Code sended succesfully!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

export const verify = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if(!user) return res.status(404).json({ status: "warning", message: "This user not found!" })

        const matchCode = await bcrypt.compare(req.body.code, user.verify_code!)
        if(!matchCode) return res.status(402).json({ status: "warning", message: "Code is not matched" })

        await user.updateOne({ $set: { verify_code: "" } })
        const { _id, name, role, email, age, image  } = user

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}