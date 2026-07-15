const Product = require("../model/Product"); // Import Product model
const cloudinary = require("../config/cloudinary"); // Import Cloudinary configuration ""

// Get Product
const getProducts = async (req, resp) => { // Function to get all products from the database
    try {
        const products = await Product.find(); // Fetch all products from the database using the Product model. find() method retrieves all documents in the Product collection.
        resp.json(products); // Send the retrieved products as a JSON response to the client. The resp.json() method automatically sets the Content-Type header to application/json and sends the data in JSON format.
    } catch (error) { // Catch any errors that occur during the database query and send a 500 Internal Server Error response with a message indicating a server error.
        resp.status(500).json({ message: "Server error" }); // Set the HTTP status code to 500 (Internal Server Error) and send a JSON response with an error message.
    }
}

// Get Product by ID
const getProductById = async (req, resp) => { // Function to get a specific product by its ID from the database
    try {
        const product = await Product.findById(req.params.id); // Fetch the product with the specified ID from the database using the Product model. findById() method retrieves a single document by its unique identifier (ID) from the Product collection.
        if (product) { // Check if the product exists (i.e., if a product with the specified ID was found in the database)
            resp.json(product); // Send the retrieved product as a JSON response to the client. The resp.json() method automatically sets the Content-Type header to application/json and sends the data in JSON format.
        } else {
            resp.status(400).json({ message: "Product not found" }); // If the product does not exist (i.e., if no product with the specified ID was found in the database), send a 400 Bad Request response with a message indicating that the product was not found.
        }
    } catch (error) {
        resp.status(500).json({ message: "Server error" });
    }
}

// Create product
const createProduct = async (req, resp) => {
    try {
        /* console.log(req.body);
        console.log(req.file); */
        const { name, description, price, category, stock } = req.body; // Destructure the product details (name, description, price, category, stock) from the request body (req.body). This allows us to easily access these values when creating a new product.
        let imageUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path); // Upload the image file to Cloudinary using the Cloudinary uploader. The req.file.path contains the path to the uploaded image file on the server. The upload() method uploads the image to Cloudinary and returns a result object containing information about the uploaded image, including its secure URL (result.secure_url).
            //console.log(result);
            imageUrl = result.secure_url; // 
        }
        const product = new Product({ // Create a new instance of the Product model with the provided product details and the Cloudinary image URL. This creates a new product document that can be saved to the database.
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        const saveProduct = await product.save(); // Save the new product document to the database using the save() method. This method inserts the new product into the Product collection in the database and returns the saved product document.
        resp.status(201).json(saveProduct); // 
    } catch (error) {
        //resp.status(500).json({ message: "Server error" });
        console.error(error);
        resp.status(500).json({ // Set the HTTP status code to 500 (Internal Server Error) and send a JSON response with an error message.
            message: error.message, // Include the error message in the response
            error // Include the error object in the response for debugging purposes
        });
    }
};

// Update product
const updateProduct = async (req, resp) => {  // 
    try {
        const { name, description, price, category, stock } = req.body; // Destructure the product details from the request body
        const product = await Product.findById(req.params.id); // Find the product by its ID. findbyId() method retrieves a single document by its unique identifier (ID) from the Product collection.       
        if (product) { // Check if the product exists (i.e., if a product with the specified ID was found in the database)
            product.name = name || product.name; // Update the product's name if a new name is provided in the request body; otherwise, keep the existing name. The || operator is used to provide a fallback value (the existing name) if the new name is not provided.
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock
            if (req.file) { // Check if a new image file is provided in the request (req.file). If a new image is provided, upload it to Cloudinary and update the product's imageUrl with the new secure URL.
                const result = await cloudinary.uploader.upload(req.file.path); // Upload the new image file to Cloudinary using the Cloudinary uploader. The req.file.path contains the path to the uploaded image file on the server. The upload() method uploads the image to Cloudinary and returns a result object containing information about the uploaded image, including its secure URL (result.secure_url).
                console.log(result);
                product.imageUrl = result.secure_url; // Update the product's imageUrl with the new secure URL returned from Cloudinary. This ensures that the product's image is updated with the new image uploaded to Cloudinary.
            }
            const updateProduct = await product.save(); // Save the updated product document to the database using the save() method. This method updates the existing product document in the Product collection in the database and returns the updated product document.
            //resp.json(updateProduct);
            resp.json({ message: "Product updated successfully", product: updateProduct });
        } else {
            //res.status(500).json("Product not found"); // My code
            resp.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        resp.status(500).json({ message: "Server error" });
       /*  console.error(error);
        resp.status(500).json({
            message: error.message,
            error
        }); */
    }
};

// Delete Product
const deleteProduct = async (req, resp) => { // Function to delete a specific product by its ID from the database
    try {
        const product = await Product.findById(req.params.id);  // Find the product by its ID. findById() method retrieves a single document by its unique identifier (ID) from the Product collection.
        if (!product) {
            return resp.status(404).json({ message: "Product not found" });
        }    
        const deletedProduct = await product.deleteOne(); // Delete the product document from the database using the deleteOne() method. This method removes the product document from the Product collection in the database and returns information about the deleted document.
        resp.json({ message: "Product deleted successfully", product: deletedProduct }); // Send a JSON response to the client indicating that the product was deleted successfully, along with information about the deleted product document.
    } catch (error) {
        resp.status(500).json({ message: "Server error" });
        /* resp.status(500).json({
            message: error.message,
            error
        }); */
    }
};

module.exports = { // Export the controller functions to be used in other parts of the application (e.g., in routes)
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}


