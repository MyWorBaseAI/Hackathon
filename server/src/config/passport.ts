import passport from 'passport'
import { Express } from 'express'
import jwt from 'jsonwebtoken'
import userModel, { IUser } from "../models/user.model"
import { jwtSecret, googleClinetId, googleClinetSecret, googleRedirect } from '../config/keys'

import { Strategy } from 'passport-google-oauth2'

export default (app: Express) => {
    passport.serializeUser((user, done) => done(null, user))
    
    passport.deserializeUser((user: IUser, dn) => dn(null, user))

    passport.use('google', new Strategy({
        clientID: googleClinetId,
        clientSecret: googleClinetSecret,
        callbackURL: googleRedirect
        } as any, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            const searchedUser = await userModel.findOne({ email: profile.email })

            let payloadUser: IUser | any = {}
            
            if(!searchedUser) {
                payloadUser = await userModel.create({
                    email: profile.email,
                    name: profile.displayName,
                    images: profile.picture,
                })
            }else{
                payloadUser = searchedUser
            }
            
            const { _id, name, role, email, age, image, registered } = payloadUser
            const token = jwt.sign({ _id, name, role, email, age, image }, jwtSecret!, { })
            done(null, { _id, name, role, email, age, image, token, registered })
        }
    ));

    app
        .use(passport.initialize())
        .get('/api/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }), (req, res) => {
            const userdata = new URLSearchParams(req.user as any)
            res.redirect('http://localhost:5173/api/oauth/google?'+userdata.toString())
        })
}