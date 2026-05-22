import { timeStamp } from 'console';
import mongoose from 'mongoose';
import { type } from 'os';



const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true

    },
    thumbnail: {
        type: String,

    },

    specifications: [
        {
            key: { type: String },
            value: { type: String },
        }
    ],
    description: {
        type: String,
        required: true,
        trim: true

    },
    brand: {
        type: String,
        required: true,
        trim: true

    },
    category: {
        type: String,
        required: true,
        trim: true

    },
    color: {
        type: String,
        required: true,
        trim: true

    },
    price: {
        type: Number,
        required: true,
        trim: true

    },
    rating: {
        type: Number,
        required: true,
        trim: true

    },
    stock: {
        type: Number,
        required: true,
        trim: true

    },
    reviews:
        [
            {
                user: {
                    type: String,
                    required: true,
                    trim: true

                },
                username: {
                    type: String,
                    required: true,
                    trim: true

                },
                comment: {
                    type: String,
                    required: true,
                    trim: true

                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                    trim: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                }

            }
        ]


}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)
export { Product }