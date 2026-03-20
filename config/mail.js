const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"BuildSetu" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("MAIL SENT:", info.messageId);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

module.exports = sendEmail;