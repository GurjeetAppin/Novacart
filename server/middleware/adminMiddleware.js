const admin = async (req, resp, next) => { // Define an asynchronous middleware function named admin that takes three parameters: req (the request object), resp (the response object), and next (the next middleware function in the chain).
    if(req.user && req.user.role === "admin"){ // Check if the user is authenticated (i.e., req.user exists) and if the user's role is "admin". This condition ensures that only users with the "admin" role can access certain routes or perform specific actions.
        next(); // If the user is authenticated and has the "admin" role, call the next() function to pass control to the next middleware function or route handler in the chain. This allows the request to proceed to the intended route or action.
    }else{
        resp.status(403).json({message: "Access denied, admin only"});
    }
};
module.exports = { admin };