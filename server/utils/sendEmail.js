const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, text) => {
    try {
        await resend.emails.send({
            from: "Job Tracker <onboarding@resend.dev>",
            to: email,
            subject: subject,
            text: text
        });

        console.log("OTP Email sent successfully to:", email);

    } catch (error) {
        console.error("EMAIL SENDING ERROR 👉", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;