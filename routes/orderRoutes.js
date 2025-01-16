const express = require('express');
const {createOrder,getOrdersByUser,deleteOrder} = require('../controllers/orderController');

const router = express.Router();

router.post('/createorder', createOrder);
router.get('/getorders/:user_id', getOrdersByUser);
router.delete('/deleteorder/:id', deleteOrder);

module.exports = router;
