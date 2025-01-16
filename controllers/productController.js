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



module.exports = { createProduct,getAllProducts };