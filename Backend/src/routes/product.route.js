import { Router } from "express";
import { getProductData, addProductData, getProductDataById, updateProductData, deleteProductData, addReview,getFilterOption } from "../controllers/product.controller.js";
import { Protect } from "../middleware/protect.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/multer.middleware.js";



const route = Router()


route.post('/api/products', Protect, isAdmin, upload.single('thumbnail'), addProductData)
route.put('/api/products/:productId', Protect, isAdmin, upload.single('thumbnail'), updateProductData)
route.post('/api/products/review/:productId', Protect, addReview)
route.delete('/api/products/:productId', Protect, isAdmin, deleteProductData)
route.get('/api/products', getProductData)
route.get('/api/products/filter', getFilterOption)
route.get('/api/products/:productId', getProductDataById)



export { route as productRoute }