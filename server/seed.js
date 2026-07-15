require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
    ]);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        name: "Aarav Sharma",
        email: "aarav@novacart.com",
        password: hashedPassword,
        role: "admin",
        verified: true,
      },
      {
        name: "Priya Verma",
        email: "priya@novacart.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
      {
        name: "Rohan Mehta",
        email: "rohan@novacart.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
      {
        name: "Neha Kapoor",
        email: "neha@novacart.com",
        password: hashedPassword,
        role: "user",
        verified: false,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: "Sony WH-1000XM5 Headphones",
        description: "Premium noise-cancelling wireless headphones with crystal-clear sound and 30-hour battery life.",
        price: 34999,
        category: "Electronics",
        stock: 18,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        ratings: 4.8,
        numReviews: 126,
      },
      {
        name: "Philips Espresso Machine",
        description: "Compact espresso machine ideal for home coffee lovers with milk frother included.",
        price: 22999,
        category: "Home Appliances",
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        ratings: 4.6,
        numReviews: 94,
      },
      {
        name: "Nike Air Zoom Running Shoes",
        description: "Lightweight running shoes with responsive cushioning for daily workouts.",
        price: 7999,
        category: "Fashion",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        ratings: 4.7,
        numReviews: 158,
      },
      {
        name: "Apple iPad Air",
        description: "10.9-inch tablet with powerful performance for work, study, and entertainment.",
        price: 54999,
        category: "Electronics",
        stock: 9,
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        ratings: 4.9,
        numReviews: 203,
      },
      {
        name: "Havells Ceiling Fan",
        description: "Energy-efficient ceiling fan with silent operation and stylish design.",
        price: 3999,
        category: "Home Appliances",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        ratings: 4.3,
        numReviews: 67,
      },
      {
        name: "Levi's Slim Fit Jeans",
        description: "Classic denim jeans made for comfort and everyday style.",
        price: 2999,
        category: "Fashion",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
        ratings: 4.5,
        numReviews: 88,
      },
    ]);

    await Order.insertMany([
      {
        user: users[1]._id,
        item: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[0].price + products[2].price,
        address: {
          fullname: "Priya Verma",
          street: "45, Rosewood Apartments, MG Road",
          postalCode: "560001",
          country: "India",
        },
        paymentId: "pay_test_001",
        status: "delivered",
      },
      {
        user: users[2]._id,
        item: [
          {
            productId: products[1]._id,
            qty: 2,
            price: products[1].price,
          },
          {
            productId: products[4]._id,
            qty: 1,
            price: products[4].price,
          },
        ],
        totalAmount: products[1].price * 2 + products[4].price,
        address: {
          fullname: "Rohan Mehta",
          street: "12, Park View Colony",
          postalCode: "411001",
          country: "India",
        },
        paymentId: "pay_test_002",
        status: "shipped",
      },
    ]);

    console.log("Realistic seed data inserted successfully.");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
