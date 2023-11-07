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

        if (!user || (user && (!user.isVerified || !user.isAdmin))) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return NextResponse.json({ error: "Product not found", status: 404 })
        }

        await Product.deleteOne({ _id: productId })

        return NextResponse.json({
            message: "Product deleted successfully",
            success: true,
            status: 200,
        })

    } catch (error) {
        console.log('Delete Product: ', error.message)
        return NextResponse.json({ error: 'Something went wrong... Try again after some time', status: 500 })
    }
}
