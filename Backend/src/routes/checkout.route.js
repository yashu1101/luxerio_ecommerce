import { Router } from "express";
import { userAddress, paymentMethod } from "../controllers/checkout.controller.js";
import { Protect } from "../middleware/protect.middleware.js";

const route = Router()

route.post('/api/:userId/checkout/address', Protect, userAddress)
route.post('/api/:userId/checkout/payment', Protect, paymentMethod)
route.post('/api/:userId/checkout/confirm', Protect, userAddress)