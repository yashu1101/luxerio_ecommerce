import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";

export const getDashboardData = async (req, res) => {

    try {

        // count data

        const totalProduct =
            await Product.countDocuments();

        const totalCategory =
            await Category.countDocuments();

        const totalUser =
            await User.countDocuments();

        const totalOrder =
            await Order.countDocuments();

        // calculate revenue

        const orders = await Order.find({
            status: "delivered"
        });

        const totalRevenue = orders.reduce(
            (acc, order) => {

                return acc + order.totalPrice;

            },
            0
        );

        res.status(200).json({

            totalProduct,
            totalCategory,
            totalOrder,
            totalUser,
            totalRevenue

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};