const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUsers} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");

router.get("/testurl", (req, resp) => {
    resp.send("This is test url for authRoutes.js file.");
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, admin, getUsers); 
/* protect, admin, this my middleware. Before goto getUsers function. We set a middleware for security respone. 
    protect :- Is check user is login or not.

*/

module.exports = router;