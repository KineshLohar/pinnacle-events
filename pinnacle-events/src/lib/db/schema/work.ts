import {
    boolean,
    date,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";
  
  export const workEventTypeEnum = pgEnum("work_event_type", [
    "Corporate Event",
    "Product Launch",
    "Brand Activation",
    "Conference",
    "Exhibition",
    "Award Ceremony",
    "Roadshow",
    "Employee Engagement",
    "Other",
  ]);
  
  export const works = pgTable("works", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    title: text("title").notNull(),
  
    slug: text("slug").notNull().unique(),
  
    excerpt: text("excerpt").notNull(),
  
    client: text("client").notNull(),
  
    eventType: workEventTypeEnum("event_type").notNull(),
  
    location: text("location").notNull(),
  
    coverImage: text("cover_image").notNull(),
  
    projectDate: date("project_date").notNull(),
  
    objective: text("objective").notNull(),
  
    challenge: text("challenge").notNull(),
  
    execution: text("execution").notNull(),
  
    outcome: text("outcome").notNull(),
  
    featured: boolean("featured")
      .default(false)
      .notNull(),
  
    isPublished: boolean("is_published")
      .default(false)
      .notNull(),
  
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  });