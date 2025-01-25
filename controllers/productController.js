const Product = require("../models/productsModel");

const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            stock: req.body.stock,
            image: req.body.image,
        });
        const result = await product.save();
        res.send("Product created successfully");
        console.log("Product created successfully");
    } catch (error) {
        res.status(400).send("Error creating product");
        console.log("Error creating product", error);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).send("No products found");
        }
        res.status(200).json(products);
        console.log("Fetched all products successfully");
    } catch (error) {
        res.status(500).send("Error fetching products");
        console.log("Error fetching products", error);
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from request parameters
        const product = await Product.findById(id); // Use Mongoose's `findById` method

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
        console.log("Fetched product successfully");
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};


module.exports = { createProduct,getAllProducts,getSingleProduct };