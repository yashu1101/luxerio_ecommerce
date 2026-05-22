import { Router } from "express";
import { addToWishlist, getDataFromWishlist, deleteFromWishlist } from "../controllers/wishlist.controller.js";
import { Protect } from "../middleware/protect.middleware.js";
const route = Router()
route.post('/api/wishlist', Protect, addToWishlist)
route.get('/api/wishlist', Protect, getDataFromWishlist)
route.delete('/api/wishlist/:productId', Protect, deleteFromWishlist)


export { route as wishlistRoute }