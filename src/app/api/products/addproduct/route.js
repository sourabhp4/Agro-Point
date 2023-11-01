
import { connect } from "@/db/dbConfig"

import User from "@/models/userModel"
import Product from "@/models/productModel"

import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { userId, title, category, description, company, officialLink, image, tags, details } = reqBody

        if ( title === '' || category === '' || description === '' || company === '' || officialLink === '' || image === '' || details === '' || !tags || tags.length === 0 ) {
            return NextResponse.json({ error: 'Insufficient values received at Server', status: 400 })
        }

        const user = await User.findById(userId)

        if (!user || (user && (!user.isVerified || !user.isAdmin))) {
            return NextResponse.json({ error: "Unauthorised", status: 401 })
        }

        const newProduct = new Product({
            userId, title, category, description, company, officialLink, image, tags, details
        })

        await newProduct.save()

        return NextResponse.json({
            message: "Success",
            success: true,
            status: 200,
        })

    } catch (error) {
        console.log('Add Product: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}