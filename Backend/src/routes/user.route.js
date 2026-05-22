import { Router } from "express";
import { getUser, getUserById, deleteUser, updateUser, updateRole } from "../controllers/user.controller.js";
import { Protect } from "../middleware/protect.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const route = Router()

route.get('/api/users', Protect, isAdmin, getUser)
route.get('/api/users/:userId', Protect, getUserById)
route.put('/api/users/:userId', Protect, updateUser)
route.patch('/api/users/role/update', Protect, isAdmin, updateRole)
route.delete('/api/users/:userId', Protect, deleteUser)

export { route as userRoute }