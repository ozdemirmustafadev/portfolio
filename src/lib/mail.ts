import nodemailer from "nodemailer";
import { profile } from "@/content/profile";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP is not configured.");
  }

  const port = Number(SMTP_PORT ?? 587);

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!recipient) throw new Error("CONTACT_TO_EMAIL is not configured.");

  const safeName = name.replace(/[\r\n"<>]/g, " ").trim();

  await getTransport().sendMail({
    from: { name: profile.name, address: process.env.SMTP_USER! },
    to: recipient,
    replyTo: { name: safeName, address: email },
    subject: `New message from ${safeName}`,
    text: `${message}\n\n${safeName} <${email}>`,
  });
}
