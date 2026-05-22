import { addOrderFromCart, addOrder, getOrder, getOrderByUser, getOrderDetail, updateOrder, cancelOrder } from "../controllers/order.controller.js";
import { Router } from 'express'
import { Protect } from "../middleware/protect.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const route = Router()

route.post('/api/orders', Protect, addOrder)
route.post('/api/cart/orders', Protect, addOrderFromCart)
route.patch('/api/orders/cancel/:orderId', Protect, cancelOrder)
route.patch('/api/orders/update', Protect, isAdmin, updateOrder)
route.get('/api/orders/all', Protect, isAdmin, getOrder)
route.get('/api/orders', Protect, getOrderByUser)
route.get('/api/orders/view/:orderId', Protect, getOrderDetail)

export { route as orderRoute }