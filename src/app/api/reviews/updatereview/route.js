import mongoose from 'mongoose'
import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"
import Product from "@/models/productModel"
import { NextResponse } from "next/server"
import Review from '@/models/reviewModel'

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
        
        const avgRating = ((performanceRating + priceRating + maintenanceRating) / 3).toFixed(1)

        const product = await Product.findById(productId)
        product.avgRating += (parseFloat(avgRating) - oldReview.avgRating)
        product.avgPerformanceRating += (performanceRating - oldReview.performanceRating)
        product.avgPriceRating += (priceRating - oldReview.priceRating)
        product.avgMaintenanceRating += (maintenanceRating - oldReview.maintenanceRating)

        await product.save()

        oldReview.avgRating = parseFloat(avgRating)
        oldReview.performanceRating = performanceRating
        oldReview.priceRating = priceRating
        oldReview.maintenanceRating = maintenanceRating
        oldReview.isUpdated = true
        oldReview.comment = comment

        await oldReview.save()

        return NextResponse.json({
            message: "Product updated successfully",
            success: true,
            status: 200,
        })

    } catch (error) {
        console.log('Update Product: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}
