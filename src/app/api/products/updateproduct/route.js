import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"
import Product from "@/models/productModel"
import { NextResponse } from "next/server"

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { userId, productId, title, category, description, company, officialLink, image, tags, details } = reqBody

        const user = await User.findById(userId)

        if (!user || (user && (!user.isVerified || !user.isAdmin))) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return NextResponse.json({ error: "Product not found", status: 404 })
        }

        if (!title || !category || !description || !company || !officialLink || !image || !details || !tags || tags.length === 0) {
            return NextResponse.json({ error: 'Insufficient values received at Server', status: 400 })
        }

        product.title = title
        product.category = category
        product.description = description
        product.company = company
        product.officialLink = officialLink
        product.image = image
        product.details = details
        product.tags = tags

        await product.save()

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
