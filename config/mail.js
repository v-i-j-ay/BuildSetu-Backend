const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "BuildSetu <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = sendEmail;