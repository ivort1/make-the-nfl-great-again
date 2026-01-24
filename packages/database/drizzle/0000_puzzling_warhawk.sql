CREATE TYPE "public"."matchup_type" AS ENUM('regular', 'playoff', 'consolation');--> statement-breakpoint
CREATE TYPE "public"."platform_type" AS ENUM('sleeper', 'espn', 'yahoo', 'manual');--> statement-breakpoint
CREATE TABLE "matchup" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"week" integer NOT NULL,
	"matchup_group_id" integer NOT NULL,
	"points" numeric(5, 2) DEFAULT '0.00' NOT NULL,
	"type" "matchup_type" DEFAULT 'regular',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "owner" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sleeper_id" varchar(255),
	"display_name" varchar(255) NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "owner_sleeper_id_unique" UNIQUE("sleeper_id")
);
--> statement-breakpoint
CREATE TABLE "season" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"platform" "platform_type" DEFAULT 'sleeper',
	"playoff_slots" integer NOT NULL,
	"league_fee" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "season_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "synclog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season_year" integer NOT NULL,
	"season_week" integer NOT NULL,
	"synced_at" timestamp with time zone DEFAULT now(),
	"status" varchar(50) NOT NULL,
	"error_message" text,
	"matchups_added" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "team" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"season_id" uuid NOT NULL,
	"team_name" varchar NOT NULL,
	"team_photo_url" text,
	"regular_season_standing" integer,
	"final_standing" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "matchup" ADD CONSTRAINT "matchup_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matchup" ADD CONSTRAINT "matchup_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_owner_id_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owner"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_idx_matchup_team_id_week" ON "matchup" USING btree ("team_id","week");--> statement-breakpoint
CREATE INDEX "idx_matchup_team_id" ON "matchup" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "idx_matchup_season_week" ON "matchup" USING btree ("season_id","week");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_idx_sync_log_season_year_season_week" ON "synclog" USING btree ("season_year","season_week");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_idx_team_owner_id_season_id" ON "team" USING btree ("owner_id","season_id");--> statement-breakpoint
CREATE INDEX "idx_team_season_id" ON "team" USING btree ("season_id");