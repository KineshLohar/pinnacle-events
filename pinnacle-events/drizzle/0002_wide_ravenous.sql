CREATE TYPE "public"."work_event_type" AS ENUM('Corporate Event', 'Product Launch', 'Brand Activation', 'Conference', 'Exhibition', 'Award Ceremony', 'Roadshow', 'Employee Engagement', 'Other');--> statement-breakpoint
CREATE TABLE "works" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text NOT NULL,
	"client" text NOT NULL,
	"event_type" "work_event_type" NOT NULL,
	"location" text NOT NULL,
	"cover_image" text NOT NULL,
	"project_date" date NOT NULL,
	"objective" text NOT NULL,
	"challenge" text NOT NULL,
	"execution" text NOT NULL,
	"outcome" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "works_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "work_gallery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"work_id" uuid NOT NULL,
	"image" text NOT NULL,
	"alt" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "work_gallery" ADD CONSTRAINT "work_gallery_work_id_works_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE cascade ON UPDATE no action;