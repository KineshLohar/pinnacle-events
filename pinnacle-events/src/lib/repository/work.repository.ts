import { db } from "@/lib/db";
import { workGallery, works } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { WorkFormValues } from "../validations/work";
import { cacheLife, cacheTag } from "next/cache";


interface CreateWorkInput {
  title: string;
  slug: string;
  excerpt: string;

  client: string;
  eventType: typeof works.$inferInsert.eventType;
  location: string;

  coverImageUrl: string;
  coverImagePublicId: string;

  projectDate: string;

  objective: string;
  challenge: string;
  execution: string;
  outcome: string;

  featured: boolean;
  isPublished: boolean;

  gallery: {
    imageUrl: string;
    publicId: string;
    alt?: string;
  }[];
}

export interface CreateWorkGalleryInput {
  workId: string;

  gallery: {
    imageUrl: string;
    publicId: string;
    alt?: string;
  }[];
}

interface UpdateWorkInput {
  id: string;

  data: Omit<
    WorkFormValues,
    "gallery" | "coverImage"
  >;

  cover: {
    url: string;
    publicId: string;
  };

  existingGallery: {
    id: string;
    alt?: string;
  }[];

  removedGallery: string[];

  uploadedGallery: {
    url: string;
    publicId: string;
    alt?: string
  }[];
}

export async function getWorkBySlug(
  slug: string,
) {
  "use cache";

  cacheLife("max");
  cacheTag(`portfolio-${slug}`);
  return db.query.works.findFirst({
    where: (works, { eq }) =>
      eq(works.slug, slug),

    with: {
      gallery: {
        columns: {
          id: true,
          imageUrl: true,
          alt: true,
        },
      },
    },
  });
}

export async function getPortfolioSlugsMetadata(
  slug: string,
) {
  return db.query.works.findFirst({
    where: (works, { eq }) =>
      eq(works.slug, slug),
    columns: {
      id: true,
      title: true,
      excerpt: true,
    },
  });
}

export async function getPortfolioSlugs() {
  return db.query.works.findMany({
    where: (works, { eq }) =>
      eq(works.isPublished, true),

    columns: {
      slug: true,
    },
  });
}

export async function getWorkById(id: string) {
  return db.query.works.findFirst({
    where: (works, { eq }) => eq(works.id, id),

    with: {
      gallery: {
        columns: {
          id: true,
          imageUrl: true,
          publicId: true,
          alt: true,
        },
      },
    },
  });
}

// export async function createWork(
//   input: CreateWorkInput,
// ) {
//   return db.transaction(async (tx) => {
//     const [work] = await tx
//       .insert(works)
//       .values({
//         title: input.title,
//         slug: input.slug,
//         excerpt: input.excerpt,

//         client: input.client,
//         eventType: input.eventType,
//         location: input.location,

//         coverImageUrl: input.coverImageUrl,
//         coverImagePublicId:
//           input.coverImagePublicId,

//         projectDate: input.projectDate,

//         objective: input.objective,
//         challenge: input.challenge,
//         execution: input.execution,
//         outcome: input.outcome,

//         featured: input.featured,
//         isPublished: input.isPublished,
//       })
//       .returning({
//         id: works.id,
//       });

//     await tx.insert(workGallery).values(
//       input.gallery.map((image) => ({
//         workId: work.id,

//         imageUrl: image.imageUrl,

//         publicId: image.publicId,

//         alt: image.alt,
//       })),
//     );

//     return work;
//   });
// }

export async function createWork(
  input: Omit<CreateWorkInput, "gallery">,
) {
  const [work] = await db
    .insert(works)
    .values({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,

      client: input.client,
      eventType: input.eventType,
      location: input.location,

      coverImageUrl: input.coverImageUrl,
      coverImagePublicId:
        input.coverImagePublicId,

      projectDate: input.projectDate,

      objective: input.objective,
      challenge: input.challenge,
      execution: input.execution,
      outcome: input.outcome,

      featured: input.featured,
      isPublished: input.isPublished,
    })
    .returning({
      id: works.id,
    });

  return work;
}

export async function createWorkGallery(
  input: CreateWorkGalleryInput,
) {
  if (!input.gallery.length) return;

  await db.insert(workGallery).values(
    input.gallery.map((image) => ({
      workId: input.workId,

      imageUrl: image.imageUrl,

      publicId: image.publicId,

      alt: image.alt ?? "",
    })),
  );
}

export async function getFeaturedWorks() {
  return db.query.works.findMany({
    where: (works, { and, eq }) =>
      and(
        eq(works.featured, true),
        eq(works.isPublished, true),
      ),

    columns: {
      title: true,
      slug: true,
      client: true,
      location: true,
      eventType: true,
      coverImageUrl: true,
    },

    orderBy: (works, { desc }) => [
      desc(works.projectDate),
    ],

    limit: 4,
  });
}

export async function updateWork(
  input: UpdateWorkInput,
) {
  await db
    .update(works)
    .set({
      title: input.data.title,
      slug: input.data.slug,
      excerpt: input.data.excerpt,

      client: input.data.client,
      eventType: input.data.eventType,
      location: input.data.location,

      coverImageUrl: input.cover.url,
      coverImagePublicId: input.cover.publicId,

      projectDate: input.data.projectDate,

      objective: input.data.objective ?? "",
      challenge: input.data.challenge ?? "",
      execution: input.data.execution ?? "",
      outcome: input.data.outcome ?? "",

      featured: input.data.featured,
      isPublished: input.data.isPublished,
    })
    .where(eq(works.id, input.id));

  if (input.removedGallery.length) {
    await db
      .delete(workGallery)
      .where(
        and(
          eq(workGallery.workId, input.id),
          inArray(
            workGallery.id,
            input.removedGallery,
          ),
        ),
      );
  }

  for (const image of input.existingGallery) {
    await db
      .update(workGallery)
      .set({
        alt: image.alt ?? "",
      })
      .where(eq(workGallery.id, image.id));
  }

  if (input.uploadedGallery.length) {
    await db.insert(workGallery).values(
      input.uploadedGallery.map(
        (image, index) => ({
          workId: input.id,

          imageUrl: image.url,

          publicId: image.publicId,

          alt:
            image.alt ??
            "",
        }),
      ),
    );
  }
}

export async function deleteWork(
  id: string,
) {
  await db
    .delete(works)
    .where(eq(works.id, id));
}

export async function getPortfolioPage(
  offset: number,
  limit: number,
) {
  const items = await db.query.works.findMany({
    where: (works, { eq }) =>
      eq(works.isPublished, true),

    columns: {
      title: true,
      slug: true,
      client: true,
      location: true,
      eventType: true,
      coverImageUrl: true,
    },

    orderBy: (works, { desc }) => [
      desc(works.projectDate),
    ],

    offset,
    limit,
  });

  return items;
}