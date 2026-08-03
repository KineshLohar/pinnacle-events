import { relations } from "drizzle-orm";

import { works } from "./schema/work";
import { workGallery } from "./schema/work-gallery";

export const worksRelations = relations(
  works,
  ({ many }) => ({
    gallery: many(workGallery),
  }),
);

export const workGalleryRelations = relations(
  workGallery,
  ({ one }) => ({
    work: one(works, {
      fields: [workGallery.workId],
      references: [works.id],
    }),
  }),
);