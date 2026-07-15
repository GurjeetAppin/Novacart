const mongoose = require("mongoose"); // Import the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to model application data, including built-in type casting, validation, query building, and business logic hooks.
// async run continousely don't stop the process. And await wait for the time for connect to the database.
const connectDB = async () => { // Define an asynchronous function named connectDB that will be responsible for establishing a connection to the MongoDB database. The async keyword indicates that this function will contain asynchronous operations, allowing the use of await within it.
    try { // Use a try-catch block to handle any errors that may occur during the database connection process. The try block contains the code that attempts to connect to the database, while the catch block handles any errors that may arise.
        const conn = await mongoose.connect(process.env.MONGO_URI); // Use the mongoose.connect() method to establish a connection to the MongoDB database. The connection string is retrieved from an environment variable (process.env.MONGO_URL), which allows for secure and flexible configuration of the database connection. The await keyword is used to pause the execution of the function until the connection is established, ensuring that subsequent code is executed only after a successful connection.
        console.log("MongoDB connected successfully."); // If the connection is successful, log a message to the console indicating that the MongoDB connection was established successfully. This provides feedback to the developer or system administrator that the database connection is working as expected.
    } catch (error) { // If an error occurs during the connection process, the catch block is executed. The error object contains information about the error that occurred, allowing for debugging and troubleshooting.
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);        // 
    }
};
  
// export the function
module.exports = connectDB;
