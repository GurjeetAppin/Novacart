const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

const getAdminStats = async (req, resp) => {
    try {
        const totalUsers = await User.countDocuments({ role : "user" });
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        resp.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue : totalRevenueData
        });
    } catch (error) {
        resp.status(500).json({
            message : error.message,
            error
        });
    }
};

module.exports = {getAdminStats};