
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import Product from "@/models/productModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {
        
        const reqBody = await request.json()
        const { userId, category, currentPageNo } = reqBody

        const user = await User.findById(userId)

        if (!user || (user && !user.isVerified)) {
            return NextResponse.json({ error: "Unauthorised", status: 401 })
        }
        if (!['fertilizers', 'pesticides', 'tools', 'seeds', 'vehicles', 'others'].includes(category)) {
            return NextResponse.json({ error: "Category Not Found", status: 400 })
        }

        const pageLimit = 4
        const skip = (currentPageNo - 1) * pageLimit

        const totalCount = await Product.countDocuments({ category })
        const totalPages = Math.ceil(totalCount / pageLimit)

        if (currentPageNo <= 0 || (currentPageNo > totalPages && totalPages != 0) ) {
            return NextResponse.json({ error: "Invalid Page No.", status: 400 })
        }

        const products = await Product.find({ category })
            .select({
                'title': 1,
                'image': 1,
                'tags': 1,
                'description': 1,
            })
            .skip(skip)
            .limit(pageLimit)

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
            products: { list: products, totalPages: totalPages }
        })

    } catch (error) {
        console.log('Get Product List: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}