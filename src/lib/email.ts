// src/lib/email.ts
import nodemailer from "nodemailer"

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  RFQ_TO // comma-separated list of recipients
} = process.env

export async function sendRFQMail(subject: string, text: string, html?: string) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RFQ_TO) {
    console.log("[RFQ] Email disabled. Message:\n", text)
    return { ok: true, skipped: true }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })

  const info = await transporter.sendMail({
    from: `"ISM RFQ" <${SMTP_USER}>`,
    to: RFQ_TO,
    subject,
    text,
    html
  })

  return { ok: true, messageId: info.messageId }
}
