const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { user_id, products, cart_id, status } = req.body;

        if (!user_id || !products || !cart_id || !status) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const order = new Order({
            user_id,
            products,
            cart_id,
            status
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const orders = await Order.find({ user_id })
            .populate('user_id', 'name email') 
            .populate('products.product_id', 'name price')
            .populate('cart_id');

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

 
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting order',
            error: error.message
        });
    }
};

module.exports = {createOrder,getOrdersByUser,deleteOrder};
