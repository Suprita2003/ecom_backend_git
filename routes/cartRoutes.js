const express = require("express");
const {createCart,addProductToCart,getCartById,deleteCart,updateCart} = require("../controllers/cartController");

const router = express.Router();

router.post("/createcart",createCart);
router.post("/addproducttocart/:id/:user_id",addProductToCart);
router.get("/getcart/:id/:user_id",getCartById);
router.delete("/deletecart/:id/:user_id/:product_id",deleteCart);
router.put("/updatecart/:id/:user_id",updateCart);

module.exports = router;