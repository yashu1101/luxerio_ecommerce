import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express, { urlencoded } from 'express'

import cookieParser from 'cookie-parser'
import { connectDB } from './db/db.js'
import { productRoute } from './routes/product.route.js'
import { userRoute } from './routes/user.route.js'
import { authRoute } from './routes/auth.route.js'
import { categoryRoute } from './routes/category.route.js'
import { wishlistRoute } from './routes/wishlist.route.js'
import { cartRoute } from './routes/cart.route.js'
import { orderRoute } from './routes/order.route.js'
import { chatRoute } from './routes/chat.route.js'
import { dashboardRoute } from './routes/dashboard.route.js'


const app = express()


// middleware
app.use(cors({
    origin: 'https://luxerio.vercel.app',

    credentials: true,
}))
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use(express.json())



// routes
app.use(productRoute)
app.use(userRoute)
app.use(authRoute)
app.use(categoryRoute)
app.use(wishlistRoute)
app.use(cartRoute)
app.use(orderRoute)
app.use(chatRoute)
app.use(dashboardRoute)





// env variables
const PORT = process.env.PORT || 1101
const DB_URL = process.env.DB_URL

// start server

connectDB(DB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
    })
}).catch((err) => {
    console.log('Server not start!' + err)
})


