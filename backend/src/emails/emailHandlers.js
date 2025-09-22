import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import { resendClient, sender } from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chatty!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.log("Error sending welcome email:", error);
    throw new Error("Error sending welcome email");
  }

  console.log("Welcome email sent:", data);
};