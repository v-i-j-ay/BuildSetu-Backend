const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "BuildSetu <onboarding@resend.dev>",
      to: [to],   
      subject,
      html,
    });

    console.log("RESEND SUCCESS:", response);

  } catch (error) {
    console.error("RESEND ERROR:", error);
  }
};

module.exports = sendEmail;