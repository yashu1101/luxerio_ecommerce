import mongoose from 'mongoose'

export const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url)
        if (conn) {
            console.log('Database Connected.')
        } else {
            console.log('Database Not Connected!')
        }
    } catch (err) {
        console.log(err.message)
        console.log("Database not connected! Check your internet connection")

    }
}