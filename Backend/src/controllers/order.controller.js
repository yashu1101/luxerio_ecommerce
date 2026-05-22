import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js"

// controller for create order 

export const addOrder = async (req, res) => {
    try {
        const { productId, address, paymentMethod, orderStatus } = req.body

        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: "Product not found" })
        const orderItem = {
            product: product._id,
            quantity: 1,
            price: product.price
        }
        const newOrder = {
            user: req.user._id,
            items: [orderItem],
            totalPrice: orderItem.price,
            address,
            paymentMethod,
            status: orderStatus

        }
        const order = await Order.create(newOrder)

        res.status(201).json({ message: "Order created", order })



    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// controller for create order from cart 
export const addOrderFromCart = async (req, res) => {
    try {
        const { address, paymentMethod, orderStatus } = req.body

        let totalPrice = 0
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product')
        console.log(cart)

        if (!cart || cart.products.length === 0) return res.status(404).json({ message: "Item not found" })

        // set order
        const orderItems = cart.products.map((item) => {
            // calculate total price
            totalPrice += item.quantity * item.product.price
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }
        })

        // create new order
        const newOrder = {
            user: req.user._id,
            items: orderItems,
            totalPrice,
            address,
            paymentMethod,
            status: orderStatus

        }

        // place order
        const order = await Order.create(newOrder)
        res.status(201).json({ message: "Order created", order })
        cart.products = []
        await cart.save()


    } catch (error) {

        res.status(500).json({ message: error.message })
    }
};


// get orders 
export const getOrder = async (req, res) => {
    try {

        const orders = await Order.find().populate("user", "username email");
        if (!orders) return res.status(404).json({ message: "order not found" })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get orders by user
export const getOrderByUser = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user._id }).populate("items.product", "title price thumbnail");
        if (!orders) return res.status(404).json({ message: "order not found" })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get order detail by id
export const getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findById(orderId).populate("user", "username email").populate("items.product", "title price thumbnail");
        if (!order) return res.status(404).json({ message: "order not found" })
        res.status(200).json({ order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// cancel order 


export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;


        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "delivered") {
            return res.status(400).json({
                message: "Cannot cancel delivered order"
            });
        }

        order.status = "cancelled";
        await order.save();

        res.status(200).json({
            message: "Order cancelled",
            order
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body
        console.log(orderId, orderStatus)
        const order = await Order.findByIdAndUpdate(orderId, { status: orderStatus }, { new: true, runValidators: true })
        if (!order) return res.status(404).json({ message: "Order not found!" })
        res.status(200).json({ message: "Status updated." })


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}