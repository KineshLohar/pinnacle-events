ALTER TABLE "works" RENAME COLUMN "cover_image" TO "cover_image_url";--> statement-breakpoint
ALTER TABLE "work_gallery" RENAME COLUMN "image" TO "image_url";--> statement-breakpoint
ALTER TABLE "works" ALTER COLUMN "objective" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "works" ALTER COLUMN "challenge" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "works" ALTER COLUMN "execution" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "works" ALTER COLUMN "outcome" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "works" ADD COLUMN "cover_image_public_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "work_gallery" ADD COLUMN "public_id" text NOT NULL;