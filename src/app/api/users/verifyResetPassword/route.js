import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid URL or Time Limit Expired" , status: 400 })
        }

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200
        })

    } catch (error) {
        console.log('Verify Reset Password Token: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time' , status: 500 })
    }
}