const express = require("express");
const { createProduct, getAllProducts,getSingleProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getallProduct",getAllProducts); 
router.get("/getproduct/:id",getSingleProduct);

module.exports = router;