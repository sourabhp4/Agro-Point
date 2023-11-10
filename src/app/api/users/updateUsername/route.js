
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"

import { NextResponse } from "next/server"

import bcryptjs from "bcryptjs"

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { id, username, password } = reqBody

        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json({ error: "Invalid Credentials", status: 400 })
        }
        if (!user.isVerified) {
            return NextResponse.json({ error: "Account verification pending. If emailed token have become invalid, Please Register again", status: 400 })
        }
        if (!user.password) {
            return NextResponse.json({ error: "Password not set for account, Please click forgot password to set it... :)", status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password", status: 400 })
        }

        user.username = username
        const updatedUser = await user.save()
        if (updatedUser) {
            const response = NextResponse.json({
                message: "Update successful",
                success: true,
                status: 200,
            })
            return response
        }
        else throw new Error('UpdateUsername: Server error')

    } catch (error) {
        console.log('UpdateUsername: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}