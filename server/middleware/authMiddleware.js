const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library, which is a module for Node.js applications to work with JSON Web Tokens (JWT). It provides methods for creating, signing, verifying, and decoding JWTs. The jwt variable will be used to handle authentication and authorization in the application by generating and validating tokens.
const User = require("../model/User"); // Import the User model from the ../model/User file. The User model represents the user collection in the MongoDB database and provides methods for interacting with user documents (e.g., finding, creating, updating, deleting users). The User variable will be used to query the database for user information during authentication and authorization processes.

const protect = async (req, resp, next) => { // Define an asynchronous middleware function named protect that takes three parameters: req (the request object), resp (the response object), and next (the next middleware function in the chain). This function is responsible for protecting routes by verifying the user's authentication status using JWTs.
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ // Check if the request headers contain an authorization field and if it starts with the string "Bearer". This condition ensures that the request includes a valid JWT in the authorization header, which is typically formatted as "Bearer <token>". If the condition is met, the function proceeds to extract and verify the token.
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract the JWT from the authorization header by splitting the string at the space character and taking the second part (the actual token). The token variable will hold the extracted JWT for further processing.And [1] is used to access the second element of the array returned by the split() method, which contains the token itself.
            const decode = jwt.verify(token, process.env.JWT_SECRET); // Use the jwt.verify() method to verify the authenticity and integrity of the extracted JWT. The method takes two arguments: the token to be verified and the secret key (process.env.JWT_SECRET) used to sign the token. If the token is valid, the method returns the decoded payload (decode), which contains information about the user (e.g., user ID, role) that was encoded in the token when it was created. If the token is invalid or expired, an error will be thrown, and the catch block will handle it.
            req.user = await User.findById(decode.id).select("-password"); // Use the User model to find the user in the database by their ID, which is obtained from the decoded token payload (decode.id). The findById() method retrieves the user document with the specified ID from the user collection in the database. The select("-password") method is used to exclude the password field from the retrieved user document, ensuring that sensitive information is not exposed. The resulting user object is then assigned to req.user, making it available for subsequent middleware functions or route handlers that require user information.
            next();
        } catch (error) {
            resp.status(401).json({message: "Not authorized, token failed"});
        }
    }

    if(!token){
        resp.status(401).json({message: "Not authorized, no token"})
    }
};

module.exports = { protect };