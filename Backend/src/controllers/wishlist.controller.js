
import { Wishlist } from "../models/wishlist.model.js";

// controller for add to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        const exist = await Wishlist.findOne({ user: req.user._id, products: productId })
        if (exist) return res.status(200).json({ message: "Product already added." })

        const wishlist = await Wishlist.findOneAndUpdate({ user: req.user._id }, { $addToSet: { products: productId } }, { upsert: true, new: true })

        res.status(201).json({ message: "Product added wishlist.", wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
// controller for get product from wishlist
export const getDataFromWishlist = async (req, res) => {
    try {
        const wishlistData = await Wishlist.findOne({ user: req.user._id }).populate('products')
        if (!wishlistData || wishlistData.products.length <= 0) return res.status(404).json({ message: "Product not found" })
        res.status(200).json({ products: wishlistData.products })
        console.log(wishlistData.products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// controller for remove product from wishlist
export const deleteFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlistData = await Wishlist.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { products: productId } },
            { new: true }
        );

        if (!wishlistData)
            return res.status(404).json({ message: "Wishlist not found" });

        res.status(200).json({
            message: "Removed from wishlist.",
            products: wishlistData.products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}