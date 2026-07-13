import {
    date,
    pgTable,
    text,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";
  
  export const awards = pgTable("awards", {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),
  
    name: text("name").notNull(),
  
    excerpt: text("excerpt").notNull(),
  
    imageUrl: text("image_url").notNull(),
  
    imagePublicId: text("image_public_id").notNull(),
  
    awardDate: date("award_date").notNull(),
  
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  });