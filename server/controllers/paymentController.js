const Razorpay = require("razorpay");
const crypto = require("crypto");
dotenv = require("dotenv").config();

const createOrder = async (req, resp) => {
    try {
        const instance = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        });
        const options = {
            amount : req.body.amount * 100, // amount in the smallest currency unit
            currency : "INR",
            receipt : crypto.randmBytes(10).toString("hex")
        };
        const order = await instance.orders.create(options);
        resp.status(200).json(order);
    } catch (error) {
        resp.status(500).json({
            message : error.message,
            error
        });
    }
};

const verifyPayment = async (req, resp) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
        if(generated_signature === razorpay_signature){
            resp.status(200).json({message : "Payment verified successfully"});
        }else{
            res.status(400).json({message : "Payment verified failed"});
        }
    } catch (error) {
        //resp.status(500).json({ message : "Server error"});
        resp.status(500).json({
            message : error.message,
            error
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment
};