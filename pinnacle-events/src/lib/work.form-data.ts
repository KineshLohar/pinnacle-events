interface WorkFormData {
    title: string;
    slug: string;
    excerpt: string;
  
    client: string;
    eventType: string;
    location: string;
  
    projectDate: string;
  
    featured: boolean;
    isPublished: boolean;
  
    objective: string;
    challenge: string;
    execution: string;
    outcome: string;
  
    coverImage: File;
  
    gallery: {
      image: File;
      alt: string;
    }[];
  }
  
  export function formDataToWork(
    formData: FormData,
  ): WorkFormData {
    const galleryFiles = formData.getAll(
      "gallery",
    ) as File[];
  
    const galleryAlt = formData.getAll(
      "galleryAlt",
    ) as string[];
  
    return {
      title: formData.get("title") as string,
  
      slug: formData.get("slug") as string,
  
      excerpt: formData.get("excerpt") as string,
  
      client: formData.get("client") as string,
  
      eventType: formData.get(
        "eventType",
      ) as string,
  
      location: formData.get(
        "location",
      ) as string,
  
      projectDate: formData.get(
        "projectDate",
      ) as string,
  
      featured:
        formData.get("featured") === "true",
  
      isPublished:
        formData.get("isPublished") === "true",
  
      objective:
        (formData.get(
          "objective",
        ) as string) ?? "",
  
      challenge:
        (formData.get(
          "challenge",
        ) as string) ?? "",
  
      execution:
        (formData.get(
          "execution",
        ) as string) ?? "",
  
      outcome:
        (formData.get(
          "outcome",
        ) as string) ?? "",
  
      coverImage: formData.get(
        "coverImage",
      ) as File,
  
      gallery: galleryFiles.map(
        (image, index) => ({
          image,
          alt: galleryAlt[index] ?? "",
        }),
      ),
    };
  }