
import { connect } from "@/db/dbConfig"

import Product from "@/models/productModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { searchString } = reqBody

        const pageLimit = 4

        const totalCount = await Product.countDocuments({ title: { $regex: searchString, $options: "i" } })

        const products = await Product.find({ title: { $regex: searchString, $options: "i" } })
            .select({
                'title': 1,
                'description': 1,
            })
            .limit(pageLimit)

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
            products: { list: products, totalCount }
        })

    } catch (error) {
        console.log('Get Search Description: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}