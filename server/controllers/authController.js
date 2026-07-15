const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"}); // JWT_SECRET this variable is get from .env file
};

// Register User function
const registerUser = async (req, resp) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return resp.status(400).json({message: "User already exists"});
        }
        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
              

        // Create a new user
        const user = await User.create({name, email, password: hashedPassword});
        // Generate OTP when new user is created and Welcome mail.
        //console.log(user);
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `
            Welcome to Novacart ${name}! Thankyou for registration with us. We are excited to have you as part of our community. To comlpete your registration, Please use the following One-Time Password (OTP):
            Your OTP for Novacart register is: ${otp}`;

            // Send a email
            await sendEmail(email, "Welcome to Novacart - Your OTP for registration", message);
            resp.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
                //message: "User registration successfull. Please check your email for the OTP."
            });
        }else{
            resp.status(400).json({message: "Server Error"});
        }
        // Old code.
        //await newUser.save();
        //res.status(201).json({message : "User register successfully."});
    } catch (error) {
        resp.status(500).json({message: "Server error"});
    }
}

// Login User

const loginUser = async (req, resp) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        //console.log(user);
        if(user && (await bcrypt.compare(password, user.password))){
            console.log(user);
            resp.json({
                _id: user._id,
                name: user.name,
                email: user.email, 
                role: user.role,
                token: generateToken(user._id)
            }) 
        }else{
            resp.status(400).json({message: "Invalid email and password"});
        }
    } catch (error) {
        resp.status(500).json({message: "Server error"});
    }
};

// Get User

const getUsers = async (req, resp) => {
    try {
        const users = await User.find({}).select('-password');
        resp.json(users);
    } catch (error) {
        resp.status(500).json({message: "Users are not avaliable"});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
}