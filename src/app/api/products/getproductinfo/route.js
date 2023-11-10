import mongoose from 'mongoose'

import { connect } from "@/db/dbConfig"

import Product from "@/models/productModel"

import { NextResponse } from "next/server"
import Review from '@/models/reviewModel'

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { productId } = reqBody

        try{
            new mongoose.Types.ObjectId(productId)
        }catch(err){
            return NextResponse.json({
                error: "Invalid URL",
                status: 401,
            })
        }

        const product = await Product.findById(productId, { _id: 0, __v: 0, userId: 0 })

        if (product) {

            const countRows = await Review.countDocuments({ productId })

            const productInfo = await product.toObject()
            productInfo.reviewCount = countRows

            productInfo.avgRating = (productInfo.avgRating / countRows).toFixed(1)
            productInfo.avgPerformanceRating = (productInfo.avgPerformanceRating / countRows).toFixed(1)
            productInfo.avgPriceRating = (productInfo.avgPriceRating / countRows).toFixed(1)
            productInfo.avgMaintenanceRating = (productInfo.avgMaintenanceRating / countRows).toFixed(1)

            return NextResponse.json({
                message: "Success",
                success: true,
                status: 200,
                product: productInfo,
            })
        }
        return NextResponse.json({
            error: "Invalid URL",
            status: 401,
        })

    } catch (error) {
        console.log('Get Product: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}