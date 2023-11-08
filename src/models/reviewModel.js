import mongoose from "mongoose"
import User from "./userModel"
import Product from "./productModel"

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide the username'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "Please provide a crt userId"],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: [true, "Please provide a crt productId"],
    },
    avgRating: {
        type: Number,
        default: 0,
    },
    performanceRating: {
        type: Number,
        required: [true, "Please provide a Performance Rating"],
    },
    priceRating: {
        type: Number,
        required: [true, "Please provide a Price Rating"],
    },
    maintenanceRating: {
        type: Number,
        required: [true, "Please provide a Maintenance Rating"],
    },
    comment: {
        type: String,
    },
    date: {
        type: String,
        required: [true, "Please provide the Date"],
    },
    isModified: {
        type: Boolean,
        default: false
    },
})

const Review = mongoose.models.reviews || mongoose.model("reviews", reviewSchema)

export default Review
