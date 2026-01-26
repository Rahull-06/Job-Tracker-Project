const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text
        });

        console.log("OTP Email sent successfully to:", email);

    } catch (error) {
        console.error("EMAIL SENDING ERROR 👉", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;