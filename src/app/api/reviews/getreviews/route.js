import mongoose from 'mongoose'
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import Review from "@/models/reviewModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { userId, productId } = reqBody

        try {
            new mongoose.Types.ObjectId(userId)
            new mongoose.Types.ObjectId(productId)
        } catch (err) {
            return NextResponse.json({
                error: "Invalid URL",
                status: 401,
            })
        }

        const user = await User.findById(userId)

        if (!user || (user && !user.isVerified)) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }
        
        const reviews = await Review.find({ userId: { $ne: userId }, productId }, { _id: 1, __v: 0, userId: 0, productId: 0 })
        const userReview = await Review.findOne({ userId, productId }, { _id: 0, __v: 0, userId: 0, productId: 0 })

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
            data: { userReview, reviews }
        })

    } catch (error) {
        console.log('Get Reviews: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}
