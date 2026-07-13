import { AwardFormValues } from "./validations/award.validation";


export function formDataToAward(
  formData: FormData,
): AwardFormValues {
  const image = formData.get("image");

  return {
    name: formData.get("name") as string,

    excerpt: formData.get(
      "excerpt",
    ) as string,

    awardDate: formData.get(
      "awardDate",
    ) as string,

    image:
      image instanceof File &&
      image.size > 0
        ? image
        : null,
  };
}