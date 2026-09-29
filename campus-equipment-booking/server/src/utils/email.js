require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = {
  email: "no-reply@zorixs.shop",
  name: "CourtSide",
};

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendEmail({ to, subject, text, html }) {
  if (!isEmailConfigured()) {
    throw new Error("Resend API key is missing.");
  }

  const { data, error } = await resend.emails.send({
    from: `"${sender.name}" <${sender.email}>`,
    to: [to],
    subject,
    text,
    ...(html && { html }),
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message || "Failed to send email.");
  }

  return data;
}

module.exports = {
  isEmailConfigured,
  sendEmail,
  sender,
};