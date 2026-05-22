import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
                max: 10
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    address: {
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
        pincode: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }
    },

    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'CARD'],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },

    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

    deliveryDate: {
        type: Date,
        default: function () {
            const date = new Date();
            date.setDate(date.getDate() + 5);
            return date;
        }
    }

}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)