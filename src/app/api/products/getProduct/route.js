
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import Product from "@/models/productModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { userId, productId } = reqBody

        const user = await User.findById(userId)

        if (!user || (user && !user.isVerified)) {
            return NextResponse.json({ error: "Unauthorised", status: 401 })
        }

        const product = await Product.findById(productId, { _id: 0, __v: 0, userId: 0 })

        if (product) {
            return NextResponse.json({
                message: "Success",
                success: true,
                status: 200,
                product: product,
            })
        }
        return NextResponse.json({
            error: "Invalid product Id",
            status: 401,
        })

    } catch (error) {
        console.log('Get Product: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}