CREATE TYPE "public"."status_type" AS ENUM('pre_season', 'in_season', 'complete', 'cancelled');--> statement-breakpoint
ALTER TABLE "season" ALTER COLUMN "status" SET DEFAULT 'in_season'::"public"."status_type";--> statement-breakpoint
ALTER TABLE "season" ALTER COLUMN "status" SET DATA TYPE "public"."status_type" USING "status"::"public"."status_type";