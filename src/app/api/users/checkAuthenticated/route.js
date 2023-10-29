
import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

connect()

export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value

        if (!token)
            throw new Error('Unauthorized')

        const jwtSecretKey = process.env.TOKEN_SECRET
        const verified = jwt.verify(token, jwtSecretKey)
        if (verified) {
            const email = verified.email
            const user = await User.findOne({ email })
            if (!user || !user.isVerified) {
                throw new Error('Unauthorized')
            } else {
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                }

                //create token
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

                const response = NextResponse.json({
                    message: "Success",
                    success: true,
                    status: 200,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    }
                })
                response.cookies.set("token", token, {
                    httpOnly: true,
                    maxAge: 86400,
                })
                console.log('CheckAuthenticated Success: ', user.email)
                return response
            }
        }
        else throw new Error('Unauthorized')

    } catch (error) {
        console.log('CheckAuthenticated Error: ', error.message)
        const response = NextResponse.json({
            message: "Unauthorized",
            success: false,
            status: 401,
        })
        return response
    }
}