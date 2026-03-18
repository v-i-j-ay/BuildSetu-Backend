const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4 // 🔥 THIS LINE FIXES YOUR ISSUE
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"BuildSetu" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;