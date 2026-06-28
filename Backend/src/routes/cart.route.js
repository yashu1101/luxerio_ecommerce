import { addCartItem, getDataFromCart, increaseCartQuantity, decreaseCartQuantity, deleteCartItem } from "../controllers/cart.controller.js";

import { Router } from "express";
import { Protect } from "../middleware/protect.middleware.js";

const route = Router()
route.post('/api/cart', Protect, addCartItem)

route.get('/api/cart', Protect, getDataFromCart)
route.put('/api/cart/increase/:productId', Protect, increaseCartQuantity)
route.put('/api/cart/decrease/:productId', Protect, decreaseCartQuantity)
route.delete('/api/cart/:productId', Protect, deleteCartItem)

export { route as cartRoute }