CREATE TYPE "platform_type" AS ENUM (
  'sleeper',
  'espn',
  'yahoo',
  'manual'
);

CREATE TYPE "matchup_type" AS ENUM (
  'regular',
  'playoff',
  'consolation'
);

CREATE TABLE "owner" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "sleeper_id" varchar UNIQUE,
  "display_name" varchar NOT NULL,
  "avatar_url" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "season" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "year" integer UNIQUE NOT NULL,
  "platform" platform_type DEFAULT 'sleeper',
  "playoff_slots" integer NOT NULL,
  "league_fee" decimal(10,2) DEFAULT 0,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "team" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "owner_id" uuid NOT NULL,
  "season_id" uuid NOT NULL,
  "team_name" varchar NOT NULL,
  "team_photo_url" text,
  "regular_season_standing" integer,
  "final_standing" integer,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "matchup" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "season_id" uuid NOT NULL,
  "team_id" uuid NOT NULL,
  "week" integer NOT NULL,
  "matchup_group_id" integer NOT NULL,
  "points" decimal(5,2) NOT NULL DEFAULT 0,
  "type" matchup_type DEFAULT 'regular',
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "synclog" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "season_year" integer NOT NULL,
  "season_week" integer NOT NULL,
  "synced_at" timestamptz DEFAULT (now()),
  "status" varchar(50) NOT NULL,
  "error_message" text,
  "matchups_added" integer DEFAULT 0
);

CREATE UNIQUE INDEX ON "team" ("owner_id", "season_id");

CREATE INDEX "idx_team_season_id" ON "team" ("season_id");

CREATE UNIQUE INDEX ON "matchup" ("team_id", "week");

CREATE INDEX "idx_matchup_team_id" ON "matchup" ("team_id");

CREATE INDEX "idx_matchup_season_week" ON "matchup" ("season_id", "week");

CREATE UNIQUE INDEX ON "synclog" ("season_year", "season_week");

ALTER TABLE "team" ADD FOREIGN KEY ("owner_id") REFERENCES "owner" ("id") ON DELETE CASCADE;

ALTER TABLE "team" ADD FOREIGN KEY ("season_id") REFERENCES "season" ("id") ON DELETE CASCADE;

ALTER TABLE "matchup" ADD FOREIGN KEY ("season_id") REFERENCES "season" ("id");

ALTER TABLE "matchup" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("id");
