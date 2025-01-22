const Cart = require('../models/cartModel'); 
const Product = require('../models/productsModel'); 

const createCart = async (req, res) => {
    try {
        console.log(req.body);
        const { user_id, products, subtotal, discount, total, status } = req.body;
        const cart = new Cart({ user_id, products, subtotal, discount, total, status });
        await cart.save();
        res.status(201).json({ success: true, message: 'Cart created successfully', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating cart', error: error.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
      const { id, user_id } = req.params;
      const { product_id, quantity } = req.body;
      
      // Find the cart by its ID
      const cart = await Cart.findById(id);
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      
      // Check if the user ID matches the cart's user ID
      if (cart.user_id.toString() !== user_id) {
        return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
      }
      
      // Find the product by its ID
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Check if the product is already in the cart
      const productIndex = cart.products.findIndex(p => p.product_id.toString() === product_id);
      if (productIndex !== -1) {
        // If the product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If it's a new product, push the product with quantity and price
        cart.products.push({
          product_id,
          quantity,
          price: product.price // Include the price field here
        });
      }
  
      // Save the updated cart
      await cart.save();
  
      return res.status(200).json({ success: true, message: 'Product added to cart successfully', cart });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ success: false, message: 'Error adding product to cart', error: error.message });
    }
  };
  
const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id).populate('user_id').populate('products.product_id');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving cart', error: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id, user_id, product_id } = req.params;

        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        if (cart.user_id.toString() !== user_id) {
            return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
        }

        const productIndex = cart.products.findIndex(product => product.product_id.toString() === product_id);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not found in the cart' });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();

        res.status(200).json({ success: true, message: 'Product deleted from cart successfully', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting product from cart', error: error.message });
    }
};


const updateCart = async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const { products, subtotal, discount, total, status } = req.body;

        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        if (cart.user_id.toString() !== user_id) {
            return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
        }
        
        if (products) {
            cart.products = products;

            let newSubtotal = 0;
            cart.products.forEach(product => {
                newSubtotal += product.price * product.quantity;  
            });
            cart.subtotal = newSubtotal;
        }
        
        if (discount !== undefined) cart.discount = discount;

        cart.total = cart.subtotal - cart.discount;

        if (status) cart.status = status;
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cart',
            error: error.message
        });
    }
};




module.exports = {createCart,addProductToCart,getCartById,deleteCart,updateCart};
