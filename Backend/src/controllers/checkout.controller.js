import { Product } from '../models/product.model.js'
import { Cart } from '../models/cart.model.js'
import { Order } from '../models/order.model.js'

// step 1 (Order summary)

export const orderSummary = async (req, res) => {
    try {
        const { userId, productId } = req.body
        const cart = await Cart.find({ user: userId })

        if (cart) {
            return res.status(200).json({ customerId: userId, items: 'cart.products.product', totalPrice: cart.products.quantity * cart.products.product.price })
        } else {
            const item = await Product.find({ productId })
            res.status(200).json({ customerId: userId, items: item, totalPrice: item.price })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// step 2 (User address)
export const userAddress = async (req, res) => {
    try {

        const { userId, address } = req.body

        const order = await Order.findOneAndUpdate(
            { user: userId },
            { address },
            { new: true, upsert: true }
        )
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// step 3 (Payment method)
export const paymentMethod = async (req, res) => {
    try {
        const { userId, paymentMethod } = req.body
        const order = await Order.findOneAndUpdate(
            { user: userId },
            { paymentMethod },
            { new: true, upsert: true }
        )
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


// step 3 (ordern)