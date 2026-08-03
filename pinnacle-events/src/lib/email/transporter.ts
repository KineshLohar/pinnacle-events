import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null =
  null;

export function getTransporter() {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: Number(
      process.env.SMTP_PORT,
    ),

    secure:
      Number(process.env.SMTP_PORT) ===
      465,

    auth: {
      user: process.env.SMTP_USER,

      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}