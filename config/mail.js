const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "BuildSetu <onboarding@resend.dev>",  // testing sender
      to: [process.env.ADMIN_EMAIL],              // ALWAYS your email
      subject,
      html,
    });

    console.log("MAIL SENT:", response);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};

module.exports = sendEmail;