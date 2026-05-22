import { Router } from "express";
import { Protect } from "../middleware/protect.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const route = Router()

route.get('/api/dashboard/data', Protect, isAdmin, getDashboardData)

export {route as dashboardRoute}