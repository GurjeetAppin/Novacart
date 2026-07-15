const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // get the configartion form this package.
const connectDB = require('./config/db'); // import the database connection code.
dotenv.config(); // This is get all the configartion from the dotenv file and set inside a index.js file
connectDB(); // Run the mongoDb connection 
const app = express(); // Create an instance of the Express application. The app variable will be used to define routes, middleware, and other configurations for the server.
// Create an instance of the Express application
app.use(cors(
    {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
)); // This is used to allow the cross origin request from the frontend. Here we add a ReactJS project details
app.use(express.json()); // This is used to parse the json data from the request body.
app.use(express.urlencoded({ extended: true })); // This is used to parse the urlencoded data from the request body.

app.get("/", (req, res) => {
    res.send("Novacart backend is working properly!");
});

// User/Auth routes
app.use("/api/auth", require('./routes/authRoutes')); 

// Products Routes
app.use("/api/products", require("./routes/productRoutes"));
// Orders Routes
app.use("/api/orders", require("./routes/orderRoutes"));
// Payment Routes
app.use("/api/payment", require("./routes/paymentRoutes"));
// Analytics Routes (This is use for Admin)
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Cart Routes
//app.use("/api/cart", require("./routes/cartRoutes"));



// Define a port where the server is running.
const PORT = process.env.PORT || 5000; // Set the port number for the server to listen on. The value is retrieved from an environment variable (process.env.PORT) if available; otherwise, it defaults to 5000. This allows for flexibility in specifying the port number based on the deployment environment (e.g., development, production).
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



