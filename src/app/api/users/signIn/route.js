
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"

import { NextResponse } from "next/server"

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody

        console.log('SignIn: ', reqBody)

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "Invalid Credentials" , status: 400 })
        }
        if(!user.isVerified){
            return NextResponse.json({ error: "Account verification pending. If emailed token have become invalid, Please Register again" , status: 400 })
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Credentials" , status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            status: 200,
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error) {
        console.log('SignIn: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time' , status: 500 })
    }
}