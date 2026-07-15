const nodemailer = require("nodemailer"); // Import the Nodemailer library, which is a module for Node.js applications to send emails. It provides a simple and efficient way to send emails using various transport methods (e.g., SMTP, sendmail, etc.). The nodemailer variable will be used to create a transporter object that handles the email sending process.

const sendEmail = async (to, subject, text) => { // Define an asynchronous function named sendEmail that takes three parameters: to (the recipient's email address), subject (the subject of the email), and text (the body content of the email). The async keyword indicates that this function will contain asynchronous operations, allowing the use of await within it.
    try {
        const transporter = nodemailer.createTransport({ // Create a transporter object using the nodemailer.createTransport() method. This transporter object is responsible for handling the email sending process. The configuration options for the transporter are provided as an object, specifying the email service and authentication details.
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
    } catch (error) {
       console.error("Error sending email:", error);        
    }
};

module.exports = sendEmail;