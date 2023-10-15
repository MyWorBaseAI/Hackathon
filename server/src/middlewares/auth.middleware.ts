import { NextFunction, Request, Response } from "express"
import { IUser } from "../models/user.model"
import { jwtSecret } from "../config/keys"
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization) return res.status(401).json({ status: "warning", message: "You can't make this request!" })

    const token = authorization.replace('Bearer ', '')
    
    jwt.verify(token, jwtSecret!, (err, payload) => {
        if(err) return res.status(401).json({ status: "warning", message: "You can't make this request!" })
        req.user = payload as any
        next()
    })
}