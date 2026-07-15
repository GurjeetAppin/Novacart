const cloudinary  = require("cloudinary"); // Import the Cloudinary library, which is a cloud-based image and video management service. It provides an API for uploading, transforming, and delivering media files. The cloudinary variable will be used to configure and interact with the Cloudinary service in the application.
require("dotenv").config(); // Import the dotenv library, which loads environment variables from a .env file into process.env. This allows for secure and flexible configuration of sensitive information (e.g., API keys, database connection strings) without hardcoding them in the source code. The config() method initializes the dotenv library and loads the environment variables.

cloudinary.config({ // Configure the Cloudinary library with the necessary credentials (cloud name, API key, and API secret) to authenticate and interact with the Cloudinary service. The configuration values are retrieved from environment variables (process.env) for security and flexibility.
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

// Goto the cloudinary account and select api key section and give a permission to api as a "admin". Then our api is working and upload a image into the cloudinary.