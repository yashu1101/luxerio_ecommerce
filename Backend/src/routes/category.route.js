import { Router } from "express";
import { getCategory, postCategory, deleteCategory } from "../controllers/category.controller.js";
import { Protect } from "../middleware/protect.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const route = Router()
route.post('/api/categories', Protect, isAdmin, upload.single('thumbnail'), postCategory)
route.get('/api/categories', getCategory)
route.delete('/api/categories/:categoryId', Protect, isAdmin,  deleteCategory)

export { route as categoryRoute }

