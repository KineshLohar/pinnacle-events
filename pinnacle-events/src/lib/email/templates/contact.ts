import type { ContactFormValues } from "@/lib/validations/contact";

export function contactEmailTemplate(
  data: ContactFormValues,
) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:24px;">
      <h2 style="margin-bottom:24px;">
        New Contact Form Submission
      </h2>

      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr>
            <td style="padding:8px 0;font-weight:bold;width:140px;">
              Name
            </td>
            <td>${data.name}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;font-weight:bold;">
              Company
            </td>
            <td>${data.company}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;font-weight:bold;">
              Email
            </td>
            <td>${data.email}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;font-weight:bold;">
              Phone
            </td>
            <td>${data.phone}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;font-weight:bold;vertical-align:top;">
              Message
            </td>
            <td style="white-space:pre-wrap;">
              ${data.message}
            </td>
          </tr>
        </tbody>
      </table>

      <hr style="margin:32px 0;" />

      <p style="color:#777;font-size:14px;">
        Sent from the Pinnacle Events website contact form.
      </p>
    </div>
  `;
}