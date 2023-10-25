
import { connect } from "@/db/dbConfig"

import { NextResponse } from "next/server"

import User from "@/models/userModel"

connect()

export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" , status: 400 })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200
        })

    } catch (error) {
        console.log('Verify Email: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time' , status: 500 })
    }
}