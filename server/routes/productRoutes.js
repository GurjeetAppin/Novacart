const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/productController");
// Multer is use for upload a file to cloudanry in chunks. And create a current path location automatically.
const multer = require("multer");
const upload = multer({dest : "uploads/"}); // Upload image in uploads folder. It's create automatically when we hit a api.

const router = express.Router();
// Get all products 
// upload.single("image") :- use for upload a image using multer.And add functionality to upload inside a createProduct function.
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct); // We defined a single route with multiple method like get,post to showing a product and create a product.
// Spacific product
router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
