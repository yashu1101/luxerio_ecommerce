import { Product } from "../models/product.model.js"
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import fs from "fs"
import path from "path"


// controller for add product data
export const addProductData = async (req, res) => {
  try {
    const bodyData = req.body;



    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    //  upload to cloudinary
    const imageUrl = await uploadOnCloudinary(
      "ecommerce/products",
      req.file.path
    );



    //  add image url
    bodyData.thumbnail = imageUrl;

    //  delete local file
    if (imageUrl) {

      fs.unlinkSync(req.file.path);
    }

    const { specifications } = req.body;
    if (specifications) {
      bodyData.specifications = JSON.parse(specifications);
    }

    //  save product
    const newProduct = await Product.create(bodyData);

    res.status(201).json({
      message: "Product added successfully",
      data: newProduct,
    });

  } catch (error) {
    console.log("Data not posted", error);
    res.status(500).json({ message: error.message });
  }
}
// controller for get product data 
export const getProductData = async (req, res) => {

  try {
    const { search, category, brand, price, color, sortBy } = req.query;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let query = {};



    //  search
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    // sorting
    let sortOptions = {}

    if (sortBy === 'new') {
      sortOptions = { createdAt: -1 }
    }
    if (sortBy === 'price_high') {
      sortOptions = { price: -1 }
    }
    if (sortBy === 'price_low') {
      sortOptions = { price: 1 }
    }

    // filter
    if (category) {
      query.category = category;
    }
    if (brand) {
      let selectedBrands = brand.split(",").map(b => b.trim());
      query.brand = { $in: selectedBrands };

    }

    if (color) {
      let selectedColors = color.split(",").map(c => c.trim());
      query.color = { $in: selectedColors };
    }


    if (price) {

      const [minPrice, maxPrice] = price
        .split("-")
        .map(Number);

      query.price = {
        $gte: minPrice,
        $lte: maxPrice
      };

    }

    let totalPage = Math.ceil(await Product.countDocuments(query) / limit);

    const products = await Product.find(query).sort(sortOptions)
      .limit(limit)
      .skip(skip);


    res.status(200).json({ products, totalPage });



  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controller for get product data by productId
export const getProductDataById = async (req, res) => {
  try {
    const productId = req.params.productId
    const products = await Product.findById(productId)
    if (!products) return res.status(404).json({ message: "Data Not Found." })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log(error)
  }

}
// controller for update product data by productId
export const updateProductData = async (req, res) => {
  try {
    const productId = req.params.productId;
    let updateData = { ...req.body };


    if (req.body.specifications && typeof req.body.specifications === "string") {
      try {
        updateData.specifications = JSON.parse(req.body.specifications);
      } catch (e) {
        console.log("Specs parse error:", e);
      }
    }


    const productData = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!productData) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Data Updated.", product: productData });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// controller for get brands

export const getFilterOption = async (req, res) => {

  try {
    const { category, type } = req.query
    const options = await Product.distinct(type, {
      category: category
    });
    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controller for add reviews 

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params
    const { comment, rating } = req.body

    const product = await Product.findById(productId)
    const reviewExist = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
    if (reviewExist) return res.status(400).json({ message: "Already reviewd." })


    const newReview = {
      user: req.user._id,
      username: req.user.username,
      comment: comment,
      rating: rating
    }

    product.reviews.push(newReview)

    await product.save()


    res.status(200).json({
      message: "Review added."
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}
// controller for delete product data by productId
export const deleteProductData = async (req, res) => {

  try {
    const productId = req.params.productId;
    const productData = await Product.findByIdAndDelete(productId)
    if (!productData) return res.status(404).json({ message: "Product Not Found" })
    res.status(200).json({ message: "Product deleted." })

  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log(error)
  }
}

