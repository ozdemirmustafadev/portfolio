import nodemailer from "nodemailer";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port,
    secure,
    servername: process.env.SMTP_TLS_SERVERNAME || undefined,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASSWORD"),
    },
  });
}

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const safeName = name.replace(/[\r\n"<>]/g, " ").trim();

  await createTransport().sendMail({
    from: { name: "ozdemirmustafa.com", address: requireEnv("MAIL_FROM") },
    to: requireEnv("MAIL_TO"),
    replyTo: { name: safeName, address: email },
    subject: `Contact form: ${safeName}`,
    text: `${message}\n\n${safeName} <${email}>`,
  });
}
