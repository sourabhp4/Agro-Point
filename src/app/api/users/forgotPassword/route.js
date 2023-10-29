
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        //check if user already exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "Invalid Email-ID", status: 400 })
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
        })

    } catch (error) {
        console.log('Register: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}