const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            process.env.FRONTEND_URL,
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

if (process.env.NODE_ENV === "production") {

    const buildPath = path.join(__dirname, "../client/build");

    app.use(express.static(buildPath));

    // Express 5 catch-all
    app.use((req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });

} else {

    app.get("/", (req, res) => {
        res.send("Novacart backend is working properly!");
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});