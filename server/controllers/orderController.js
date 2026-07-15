const Order = require("../model/Order");

// Send Email
const sendEmail = require("../utils/sendEmail");

// Create new order
const createOrder = async (req, resp) => {
    try {
        const { item, totalAmount, address, paymentId } = req.body; // We add a payment Id for student purpose only. We can remove it later if need.
       
        if(!item || item.length === 0 || !totalAmount || !address){
            return resp.status(400).json({ message : "Invalid order data "});
        }else{
            
            const order = await Order.create({
                user : req.user._id,
                item,
                totalAmount,
                address,
                paymentId
            });  
            
            await order.save();
            const message = `Dear ${req.user.name},\n\nThanks you for your order! Your order has been successfully created with the following details:\n\nOrder ID: ${order._id}\nTotal Amount ${totalAmount}\nShipping Address ${address}\n\nWe will notify you once order is shipped.\n\nBest regards,\nNovecart Team`;
            await sendEmail(req.user.email, "Order Created", message);
            resp.status(201).json({ message : "Order created successfully", order});
        }

    } catch (error) {
        resp.status(500).json({
            message : error.message,
            error
        });
    }
}

// Get Order
const myOrders = async (req, resp) => {
    //console.log("User ID:", req.user._id); // Log the user ID to verify it's being passed correctly
    //debugger; // Add a debugger statement to pause execution and inspect variables
    try {
        const orders = await Order.find({ user : req.user._id }).populate("item.productId", "name price");
        resp.json(orders);
    } catch (error) {
        // resp.status(500).json({ message : "Error fetching orders", error });
        resp.status(500).json({
            message : error.message,
            error
        });
    }
}

// Get All Orders (This for admin panel)
const getOrders = async (res, resp) => {
    try {
        //const orders = await Order.find({}).populate('user', "id name").populate("item.productId", "name price");
        const orders = await Order.find({}).populate('user', "id name");
        resp.json(orders);
    } catch (error) {
        // resp.status(500).json({ message : "Error fetching orders", error});
        resp.status(500).json({
            message : error.message,
            error
        });
    }
};

//
const updateOrderStatus = async (req, resp) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = status,
            await order.save();
            resp.json({ message : "Order status updated", order});
        }else{
            resp.status(404).json({ message : "Order not found "});
        }        
    } catch (error) {
        //resp.status(500).json({ message : "Error updating order status", error });
        resp.status(500).json({
            message : error.message,
            error
        });
    }
};


module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};