
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer"

import { NextResponse } from "next/server"

import bcryptjs from "bcryptjs"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        console.log(reqBody)

        //check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            if (user.isVerified)
                return NextResponse.json({ error: "Email Already Registered", status: 400 })
        }

        //hash password
        const salt = await bcryptjs.genSalt(5)
        const hashedPassword = await bcryptjs.hash(password, salt)

        if (user) {
            user.password = hashedPassword
            const updatedUser = await user.save()
            await sendEmail({ email, emailType: "VERIFY", userId: updatedUser._id })
        } else {
            const newUser = new User({
                username: email.split('@')[0],
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        }

        //send verification email

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