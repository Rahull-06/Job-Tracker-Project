const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        });

        console.log("OTP Email sent successfully to:", to);
    } catch (error) {
        console.error("EMAIL SENDING ERROR 👉", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;