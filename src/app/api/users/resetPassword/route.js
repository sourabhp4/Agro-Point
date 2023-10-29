
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"

import { NextResponse } from "next/server"

import bcryptjs from "bcryptjs"

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { token, newPassword } = reqBody

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid URL or Time Limit Expired" , status: 400 })
        }

        const salt = await bcryptjs.genSalt(5)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        const updatedUser = await user.save()

        if (updatedUser) {
            const response = NextResponse.json({
                message: "Password Reset successful",
                success: true,
                status: 200,
            })
            return response
        }
        else throw new Error('ResetPassword: Server Error')

    } catch (error) {
        console.log('ResetPassword: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}