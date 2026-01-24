ALTER TABLE "owner" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "season" ADD COLUMN "league_id" varchar;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "roster_id" integer;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_idx_team_season_id_roster_id" ON "team" USING btree ("season_id","roster_id");--> statement-breakpoint
ALTER TABLE "season" ADD CONSTRAINT "season_league_id_unique" UNIQUE("league_id");