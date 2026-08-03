import { getTransporter } from "./transporter";
import { contactEmailTemplate } from "./templates/contact";

import type { ContactFormValues } from "@/lib/validations/contact";

export async function sendContactEmail(
  data: ContactFormValues,
) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Pinnacle Events Website" <${process.env.SMTP_USER}>`,

    to: process.env.CONTACT_EMAIL,

    replyTo: data.email,

    subject: `New Website Inquiry - ${data.name}`,

    html: contactEmailTemplate(data),
  });
}