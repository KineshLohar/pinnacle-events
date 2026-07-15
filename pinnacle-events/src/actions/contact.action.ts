"use server";

import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email/send-contact-email";

interface ActionResult {
  success: boolean;
  message: string;
}

export async function contactAction(
  values: unknown,
): Promise<ActionResult> {
  const parsed =
    contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Please correct the form errors.",
    };
  }

  try {
    await sendContactEmail(
      parsed.data,
    );

    return {
      success: true,
      message:
        "Your inquiry has been sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Unable to send your inquiry. Please try again later.",
    };
  }
}