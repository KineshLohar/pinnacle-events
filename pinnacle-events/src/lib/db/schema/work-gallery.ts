import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { works } from "./work";

export const workGallery = pgTable("work_gallery", {
  id: uuid("id").defaultRandom().primaryKey(),

  workId: uuid("work_id")
    .references(() => works.id, {
      onDelete: "cascade",
    })
    .notNull(),

  imageUrl: text("image_url").notNull(),

  publicId: text("public_id").notNull(),

  alt: text("alt"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});