import mongoose from 'mongoose'

import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import Review from "@/models/reviewModel"

import { NextResponse } from "next/server"
import Product from '@/models/productModel'

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { userId, productId, performanceRating, priceRating, maintenanceRating, comment } = reqBody

        try {
            new mongoose.Types.ObjectId(userId)
            new mongoose.Types.ObjectId(productId)
        } catch (err) {
            return NextResponse.json({
                error: "Invalid URL",
                status: 401,
            })
        }

        if (performanceRating === '' || priceRating === '' || maintenanceRating === '') {
            return NextResponse.json({ error: 'Insufficient values received at Server', status: 400 })
        }

        const user = await User.findById(userId)

        if (!user || (user && (!user.isVerified || user.isAdmin))) {
            return NextResponse.json({ error: "Unauthorised", status: 401 })
        }

        const oldReview = await Review.findOne({ userId, productId })
        if(oldReview){
            return NextResponse.json({ error: "Review already present", status: 401 })
        }

        const avgRating = ((performanceRating + priceRating + maintenanceRating) / 3).toFixed(1)

        const newReview = new Review({
            username: user.username,
            userId,
            productId,
            avgRating: parseFloat(avgRating),
            performanceRating,
            priceRating,
            maintenanceRating,
            comment: (comment || undefined),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        })

        await newReview.save()

        const product = await Product.findById(productId)
        product.avgRating += parseFloat(avgRating)
        product.avgPerformanceRating += performanceRating
        product.avgPriceRating += priceRating
        product.avgMaintenanceRating += maintenanceRating

        await product.save()

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
        })

    } catch (error) {
        console.log('Add Review: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}