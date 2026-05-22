import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js"
import fs from "fs";

// controller for add category 
export const postCategory = async (req, res) => {
    try {
        const bodyData = req.body;



        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        //  upload to cloudinary
        const imageUrl = await uploadOnCloudinary(
            "ecommerce/categories",
            req.file.path
        );

        console.log("REQ.FILE:", req.file);
        console.log("REQ.BODY:", req.body);
        console.log("IMAGE URL:", imageUrl);
        console.log(bodyData);
        //  add image url
        bodyData.thumbnail = imageUrl;

        //  delete local file
        if (imageUrl) {

            fs.unlinkSync(req.file.path);
        }

        const category = await Category.create( bodyData )
        return res.status(201).json({ category, message: "Category added" })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }

}
// controller for get category 
export const getCategory = async (req, res) => {
    try {

        const categories = await Category.find()
        if (!categories) return res.status(404).json({ message: "Category Not Found" })
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }

}
// controller for delete category 
export const deleteCategory = async (req, res) => {
    try {

        const categoryData = await Category.findByIdAndDelete(req.params.categoryId)
        if (!categoryData) return res.status(404).json({ message: "Category Not Found" })
        res.status(200).json({ message: "Category deleted." })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }

}