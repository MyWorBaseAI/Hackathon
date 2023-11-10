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
        const verifycode = await bcrypt.hash(code, 10)

        if(searchedUser) await searchedUser.updateOne({ $set: { verifycode } })
        else await userModel.create({...req.body, verifycode })
        console.log(code);
        
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

        const matchCode = await bcrypt.compare(req.body.code, user.verifycode!)
        if(!matchCode) return res.status(402).json({ status: "warning", message: "Code is not matched" })

        await user.updateOne({ $set: { verifycode: "" } })
        const { _id, name, role, email, age, image, registered  } = user
        const token = jwt.sign({_id, name, role, email }, jwtSecret!, { expiresIn: "3h" })

        return res.status(200).json({ status: "ok", token, user: { _id, name, role, email, age, image, registered  } })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}