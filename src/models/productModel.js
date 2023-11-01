import mongoose from "mongoose"
import User from "./userModel"

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "Please provide a crt userId"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    releaseDate: {
        type: String,
        required: [true, "Please provide a releaseDate"],
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
    },
    details: {
        type: String,
    },
    avgRating: {
        type: Number,
        default: 0.0
    }
})

const Product = mongoose.models.products || mongoose.model("products", productSchema)

export default Product
