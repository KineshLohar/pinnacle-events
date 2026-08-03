import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { awards } from "@/lib/db/schema";

interface CreateAwardInput {
  name: string;

  excerpt: string;

  awardDate: string;

  imageUrl: string;

  imagePublicId: string;
}

interface UpdateAwardInput {
  id: string;

  name: string;

  excerpt: string;

  awardDate: string;

  image: {
    url: string;
    publicId: string;
  };
}

export async function getAwards() {
  return db.query.awards.findMany({
    orderBy: [desc(awards.awardDate)],
  });
}

export async function getAwardById(id: string) {
  return db.query.awards.findFirst({
    where: (awards, { eq }) =>
      eq(awards.id, id),
  });
}

export async function createAward(
  input: CreateAwardInput,
) {
  const [award] = await db
    .insert(awards)
    .values({
      name: input.name,

      excerpt: input.excerpt,

      awardDate: input.awardDate,

      imageUrl: input.imageUrl,

      imagePublicId:
        input.imagePublicId,
    })
    .returning();

  return award;
}

export async function updateAward(
  input: UpdateAwardInput,
) {
  await db
    .update(awards)
    .set({
      name: input.name,

      excerpt: input.excerpt,

      awardDate: input.awardDate,

      imageUrl: input.image.url,

      imagePublicId:
        input.image.publicId,
    })
    .where(eq(awards.id, input.id));
}

export async function deleteAward(
  id: string,
) {
  await db
    .delete(awards)
    .where(eq(awards.id, id));
}

export async function getLatestAwardsRepository() {
  return db.query.awards.findMany({
    columns: {
      id: true,
      name: true,
      excerpt: true,
      imageUrl: true,
      awardDate: true,
    },

    orderBy: (awards, { desc }) => [
      desc(awards.awardDate),
    ],

    limit: 3,
  });
}

export async function getPublicAwardsRepository() {
  return db.query.awards.findMany({
    columns: {
      id: true,
      name: true,
      excerpt: true,
      imageUrl: true,
      awardDate: true,
    },

    orderBy: (awards, { desc }) => [
      desc(awards.awardDate),
    ],
  });
}