import { Cart } from "../models/cart.model.js";


// controller for add to cart
export const addCartItem = async (req, res) => {
    try {
        const { productId } = req.body;

        //  find cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            const item = cart.products.find(
                p => p.product.toString() === productId
            );

            if (item) {
                //  stop if max reached
                if (item.quantity >= 10) {
                    return res.status(400).json({
                        message: "Max limit reached ❌"
                    });
                }

                //  increase
                await Cart.updateOne(
                    { user: req.user._id, "products.product": productId },
                    { $inc: { "products.$.quantity": 1 } }
                );

                return res.status(200).json({
                    message: "Quantity increased "
                });
            }
        }

        //  add new product
        const updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                $push: {
                    products: { product: productId, quantity: 1 }
                }
            },
            { upsert: true, new: true }
        );

        res.status(201).json({
            message: "Product added to cart ",
            cart: updatedCart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller for get data from cart
export const getDataFromCart = async (req, res) => {
    try {

        const cartData = await Cart
            .findOne({ user: req.user._id })
            .populate("products.product");

        if (!cartData || cartData?.products?.length === 0) {
            return res.status(404).json({
                message: "No items in cart."
            });
        }

        res.status(200).json({
            products: cartData?.products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller for increase quantity

export const increaseCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;

        const updated = await Cart.findOneAndUpdate(
            {
                user: req.user._id,
                products: {
                    $elemMatch: {
                        product: productId,
                        quantity: { $lt: 10 }
                    }
                }
            },
            {
                $inc: { "products.$.quantity": 1 }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(400).json({
                message: "Max limit reached or product not found"
            });
        }

        res.status(200).json({
            message: "Quantity increased",
            cart: updated
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller for decrease quantity

export const decreaseCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;

        const updated = await Cart.findOneAndUpdate(
            {
                user: req.user._id,
                products: {
                    $elemMatch: {
                        product: productId,
                        quantity: { $gt: 1 }
                    }
                }
            },
            {
                $inc: { "products.$.quantity": -1 }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(400).json({
                message: "Min limit reached"
            });
        }

        res.status(200).json({
            message: "Quantity decreased",
            cart: updated
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// controller for delete cart item

export const deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.params;

        const updated = await Cart.findOneAndUpdate(
            {
                user: req.user._id
            },
            {
                $pull: { products: { product: productId } }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Item not found "
            });
        }

        res.status(200).json({
            message: "Cart item deleted"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
